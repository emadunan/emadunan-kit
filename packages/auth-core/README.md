# @emadunan/auth-core

A lightweight **authentication helper for Web** built on top of [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview).  
This package provides a single factory `createBaseQueryWithReauth()` that wraps your `baseQuery` with **automatic token refresh** logic — using secure HttpOnly cookies for refresh tokens and in-memory access tokens.

---

## 🚀 Features

- ✅ Automatic token refresh on `401 Unauthorized`
- 🌐 Web-focused implementation with HttpOnly cookies
- 🧱 Lightweight and framework-agnostic (React, Vite, Next.js)
- ⚡ Easy integration with Redux store
- 🪝 Customizable success and failure hooks for refresh logic

---

## 🧠 Core Concept

You use the factory:

```ts
import { createBaseQueryWithReauth } from "@emadunan/auth-core";
```

and provide:
- `baseUrl` — your API root
- `onRefreshSuccess` — what to do when token refresh succeeds (e.g. update Redux state)
- `onRefreshFail` — what to do when refresh fails (e.g. logout user)

The helper handles calling your refresh endpoint (`/auth/refresh`) automatically when a request fails with 401.

---

## 🧩 API Reference

### `createBaseQueryWithReauth(options)`

| Name | Type | Description |
|------|------|-------------|
| `baseUrl` | `string` | Base URL for all API requests |
| `onRefreshSuccess?` | `(data: RefreshResponse) => void` | Called after successful refresh |
| `onRefreshFail?` | `() => void` | Called when refresh fails (e.g. logout) |

#### `RefreshResponse`

```ts
interface RefreshResponse {
  access_token: string;
  user?: unknown;
}
```

---

## 🧭 Usage Example (React + Redux Toolkit Query)

```ts
// src/api/baseQuery.ts
import { createBaseQueryWithReauth } from "@emadunan/auth-core";
import { store } from "../store";
import { setCredentials, logout } from "../slices/authSlice";

export const baseQuery = createBaseQueryWithReauth({
  baseUrl: import.meta.env.VITE_API_URL!,
  onRefreshSuccess: (data) => store.dispatch(setCredentials(data)),
  onRefreshFail: () => store.dispatch(logout()),
});
```

Then use `baseQuery` in your RTK Query API slice:

```ts
// src/api/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;
```

---

## ⚙️ How It Works

1. Every request uses your `access_token` from Redux.
2. If the request fails with a `401 Unauthorized`:
   - It calls `POST /auth/refresh` with HttpOnly cookie.
   - If refresh succeeds → dispatches `onRefreshSuccess` → retries original request.
   - If refresh fails → calls `onRefreshFail` (e.g. logout).
3. All concurrent requests are locked until refresh finishes (mutex).

---

## 📦 Installation

```bash
npm install @emadunan/auth-core
# or
yarn add @emadunan/auth-core
```

Ensure you also have the required peer dependencies installed:

```bash
npm install @reduxjs/toolkit react react-dom react-redux
```

---

## 🧰 Folder Structure Recommendation

```
src/
  api/
    baseQuery.ts
    apiSlice.ts
  slices/
    authSlice.ts
  store.ts
```

---

## 🪪 License

MIT © Emad Younan
