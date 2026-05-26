# Rati — Nuxt 4 + Content v3 blog

## Stack
- **Nuxt 4** (compatibilityVersion 4) + Vue 3 Composition API, TypeScript strict mode
- **Tailwind CSS 4** via `@tailwindcss/vite` — theme configured in `app/assets/css/main.css` using `@theme`
- **Nuxt Content v3** (`@nuxt/content ^3.0.0`) — collections defined in `content.config.ts` with Zod schemas
- **better-sqlite3** is a dependency (native module for planned GVA backend; not yet wired up)

## Commands
- `npm run dev -- --host 0.0.0.0` — dev server
- `npm run build` — production build
- `npm run generate` — static generation (SSG)
- `npx nuxi typecheck` — type-check (non-negotiable: `tsconfig.json` inherits `.nuxt/tsconfig.json`)
- `npm run postinstall` / `npx nuxi prepare` — regenerate `.nuxt/` typedefs after schema/config changes

## Code conventions
- **All components use `<script setup lang="ts">`** — no Options API, no Class API
- **Tailwind first** — no `.css` files, no `<style>` blocks unless Tailwind can't express it (e.g., complex `@keyframes`)
- **Nuxt auto-imports** — don't manually import `ref`, `computed`, `useRoute`, `useAsyncData`, etc. Components in `components/` are auto-imported.
- **Data fetching** — use `useFetch` or `useAsyncData` for SSR-safe data. `$fetch` is acceptable in client-only contexts (e.g., inside `onMounted`).
- **Content v3 API** — use `queryCollection('posts').path(...)` and `<ContentRenderer>` to render page content. The v2 `ContentDoc`/`ContentQuery` APIs are NOT available.
- **Component size** — split any `.vue` file over 300 lines into sub-components.

## SSR gotchas
- Never access `window`, `document`, or `localStorage` in `<script setup>` top-level scope. Guard with `onMounted` or `import.meta.client`.
- Tailwind 4 uses CSS variables and `@theme`; there is no `tailwind.config.js`.

## Key project structure
- `content/` — Markdown content split into collections: `columns/`, `posts/`, and root `*.md` pages (e.g., `index.md`)
- `content/.navigation.yml` — sidebar nav structure, parsed by `server/api/navigation.get.ts` with a custom YAML parser (not a library)
- `server/api/navigation.get.ts` — the sole server route; reads `.navigation.yml` from disk at request time
- `app/composables/useNavigation.ts` — client composable that fetches nav data; used in `TheHeader`/sidebar components
- `app/types/navigation.ts` — shared types for `NavLink` and `NavSection`

## Constraints
- **Do not install new dependencies** without explicit approval
- **Do not add state management libraries** (e.g., Pinia) — use Nuxt's `useState` for shared state
- **No axios** — use Nuxt's built-in `useFetch`/`useAsyncData`/`$fetch`
