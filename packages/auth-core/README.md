# 🧩 @emadunan/auth-core

A lightweight, **cross-platform authentication helper** built on top of Redux Toolkit Query.  
It exports a unified factory `createBaseQueryWithReauth()` that handles automatic token refresh for **Web**, **Mobile**, and **Node.js** environments — all with customizable storage and refresh behavior.

---

## 🚀 Features

- ✅ Shared refresh-token logic across all platforms  
- 🔄 Automatic token refresh on `401 Unauthorized`  
- 🧱 Pluggable storage adapters (`localStorage`, `SecureStore`, memory, etc.)  
- 🔐 Framework-agnostic — works with React, React Native, Next.js, and Node  
- ⚙️ Customizable `baseUrl`, refresh endpoint, and hooks for success/failure  

---

## 🧠 Core Concept

You implement your platform-specific “driver” using the factory:

```ts
import { createBaseQueryWithReauth } from "@emadunan/auth-core";
```

Each app provides its own:
- `storage` adapter (where to store tokens)
- `onRefreshSuccess` and `onRefreshFail` handlers (e.g., Redux dispatch)
- `baseUrl` (your API root)

---

## 🧩 API Reference

### `createBaseQueryWithReauth(options)`

#### Parameters
| Name | Type | Description |
|------|------|--------------|
| `baseUrl` | `string` | Base URL for all API requests. |
| `storage` | `StorageAdapter` | Custom storage interface for token persistence. |
| `onRefreshSuccess?` | `(data: any) => void` | Called when refresh succeeds (e.g., to update Redux credentials). |
| `onRefreshFail?` | `() => void` | Called when refresh fails (e.g., logout user). |
| `refreshPath?` | `string` | Optional custom refresh endpoint. Default: `/auth/refresh`. |

---

### 🧱 `StorageAdapter` Interface

To ensure platform independence, the library defines this minimal interface:

```ts
export interface StorageAdapter {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}
```

The adapter supports both synchronous (Web) and asynchronous (Mobile/Server) storage implementations.

---

## 🧭 Platform Implementations

### 🌐 Web

```ts
import { createBaseQueryWithReauth } from "@emadunan/auth-core";
import { setCredentials, logout } from "../slices/authSlice";
import { store } from "../store";

export const webBaseQuery = createBaseQueryWithReauth({
  // For Vite apps
  baseUrl: import.meta.env.VITE_API_URL!,
  // For Nextjs apps 
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  storage: {
    getItem: (k) => localStorage.getItem(k),
    setItem: (k, v) => localStorage.setItem(k, v),
    removeItem: (k) => localStorage.removeItem(k),
  },
  onRefreshSuccess: (data) => store.dispatch(setCredentials(data)),
  onRefreshFail: () => store.dispatch(logout()),
});
```

---

### 📱 Mobile (React Native / Expo)

```ts
import * as SecureStore from "expo-secure-store";
import { createBaseQueryWithReauth } from "@emadunan/auth-core";
import { setCredentials, logout } from "../slices/authSlice";
import { store } from "../store";

export const nativeBaseQuery = createBaseQueryWithReauth({
  baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  storage: {
    getItem: (k) => SecureStore.getItemAsync(k),
    setItem: (k, v) => SecureStore.setItemAsync(k, v),
    removeItem: (k) => SecureStore.deleteItemAsync(k),
  },
  onRefreshSuccess: (data) => store.dispatch(setCredentials(data)),
  onRefreshFail: () => store.dispatch(logout()),
});
```

---

### 🧠 Node.js (Server / CLI)

```ts
import { createBaseQueryWithReauth } from "@emadunan/auth-core";

const memoryStore: Record<string, string> = {};

export const serverBaseQuery = createBaseQueryWithReauth({
  baseUrl: process.env.API_URL!,
  storage: {
    getItem: (k) => memoryStore[k],
    setItem: (k, v) => { memoryStore[k] = v; },
    removeItem: (k) => { delete memoryStore[k]; },
  },
});
```

---

## ⚙️ Advanced Usage

### 🧾 Custom Refresh Endpoint

```ts
const baseQuery = createBaseQueryWithReauth({
  baseUrl: "https://api.example.com",
  refreshPath: "/session/renew",
  storage: localStorageAdapter,
});
```

---

### 🔑 Access Token Key

By default, the token is stored under the key `"access_token"`.  
You can change this in your driver implementation if needed.

---

## 🧩 Folder Structure Recommendation

```
apps/
  web/
    src/
      slices/
        authSlice.ts
      api/
        webBaseQuery.ts
  mobile/
    src/
      slices/
        authSlice.ts
      api/
        nativeBaseQuery.ts
  server/
    src/
      api/
        serverBaseQuery.ts

packages/
  auth-core/
    src/
      createBaseQueryWithReauth.ts
      types.ts
    README.md
```

---

## 🧰 Installation

```bash
# Inside your monorepo root or project
pnpm add @emadunan/auth-core
# or
npm install @emadunan/auth-core
# or
yarn add @emadunan/auth-core
```

---

## 🧩 License

MIT © Emad Younan  
Clean, composable, and cross-platform authentication layer.
