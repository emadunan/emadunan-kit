# Emadunan

Personal website, React UI components, and shared TypeScript packages in one npm/Turborepo monorepo.

## Apps

- `apps/website`: public website for emadunan.com.
- `apps/playground`: local playground for testing React UI components.

## Packages

- `@emadunan/react-ui`: reusable React component library.
- `@emadunan/auth-core`: shared auth helpers.
- `@emadunan/shared-utils`: shared utility functions.
- `@emadunan/web-utils`: browser/web utilities.

## Commands

```bash
npm install
npm run build
npm run dev
npm run check-types
npm run lint
```

Run a specific workspace with a filter:

```bash
npm run dev --workspace=website
npm run build --workspace=@emadunan/react-ui
npm run dev --workspace=@emadunan/playground
```
