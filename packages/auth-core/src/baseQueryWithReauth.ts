import { Mutex } from "async-mutex";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query";

/** Response from refresh endpoint */
export interface RefreshResponse {
  access_token: string;
  user?: unknown;
}

const mutex = new Mutex();

/**
 * Base query wrapper with automatic token refresh for web.
 * - Uses HttpOnly cookies for refresh token.
 * - Stores access token in Redux (in-memory).
 * - Automatically retries the original request after refresh.
 */
export const createBaseQueryWithReauth = ({
  baseUrl,
  onRefreshSuccess,
  onRefreshFail,
}: {
  baseUrl: string;
  onRefreshSuccess?: (data: RefreshResponse) => void;
  onRefreshFail?: () => void;
}): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Optionally attach access token from Redux
      const token = (getState() as any)?.auth?.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          // Attempt token refresh using HttpOnly cookie
          const refreshResult = (await rawBaseQuery(
            "/auth/refresh",
            api,
            extraOptions
          )) as QueryReturnValue<RefreshResponse, FetchBaseQueryError, FetchBaseQueryMeta>;

          const { data, error } = refreshResult;

          if (error) {
            onRefreshFail?.();
            return refreshResult;
          }

          if (data?.access_token) {
            // Update Redux state or call callback
            onRefreshSuccess?.(data);

            // Retry original request
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            onRefreshFail?.();
          }
        } finally {
          release();
        }
      } else {
        // Wait for any ongoing refresh to complete
        await mutex.waitForUnlock();
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }

    return result;
  };
};
