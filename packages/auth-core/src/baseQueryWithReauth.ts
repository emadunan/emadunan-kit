import { Mutex } from "async-mutex";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface RefreshResponse {
  access_token: string;
  user?: unknown;
}

export interface StorageDriver {
  getItem(key: string): Promise<string | null> | string | null;
  setItem(key: string, value: string): Promise<void> | void;
  removeItem(key: string): Promise<void> | void;
}

const mutex = new Mutex();

/**
 * Cross-platform base query with token refresh.
 * Apps can inject platform-specific storage + dispatch handlers.
 */
export const createBaseQueryWithReauth = ({
  baseUrl,
  storage,
  onRefreshSuccess,
  onRefreshFail,
}: {
  baseUrl: string;
  storage?: StorageDriver;
  onRefreshSuccess?: (data: RefreshResponse) => void;
  onRefreshFail?: () => void;
}): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
  });

  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await rawBaseQuery("/auth/refresh", api, extraOptions);
          const data = refreshResult.data as RefreshResponse | undefined;

          if (data?.access_token) {
            // persist new token (if desired)
            await storage?.setItem?.("access_token", data.access_token);
            onRefreshSuccess?.(data);

            // retry
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            await storage?.removeItem?.("access_token");
            onRefreshFail?.();
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }

    return result;
  };
};
