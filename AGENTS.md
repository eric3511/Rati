# AI Agent Instructions for Rati (Nuxt 4 + Content v3 Blog/Docs)

## 🤖 Role & Context
You are an expert Frontend Developer specializing in **Nuxt 4**, **Vue 3**, **Tailwind CSS 4**, and **Nuxt Content v3**. 
You are helping build "Rati", a high-performance, statically generated (SSG) blog and documentation site (similar to Docus, but custom-built).

**CRITICAL WARNING:** This project uses bleeding-edge versions. Your training data might default to older APIs. You MUST strictly adhere to the stack and constraints below. Do NOT use Nuxt 3, Content v2, or Tailwind 3 syntax.

---

## 🛠️ Tech Stack & Architecture
- **Framework:** Nuxt 4 (compatibilityVersion 4) + Vue 3 Composition API (`<script setup lang="ts">`).
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite`.
- **Content:** Nuxt Content v3 (`@nuxt/content ^3.0.0`).
- **Database:** `better-sqlite3` (dependency installed, but currently unused. Do not wire up unless instructed).
- **Directory Structure:** Uses Nuxt 4 `app/` directory structure (e.g., `app/components/`, `app/composables/`, `app/assets/`).

---

## 🚫 STRICT CONSTRAINTS (NON-NEGOTIABLE)

1. **NO NEW DEPENDENCIES:** Do not run `npm install` or suggest new packages without explicit approval.
2. **NO STATE LIBRARIES:** Do not use Pinia, Vuex, or XState. Use Nuxt's built-in `useState` for shared global state.
3. **NO AXIOS:** Use Nuxt's built-in `useFetch`, `useAsyncData`, or `$fetch`.
4. **NO OPTIONS/CLASS API:** All Vue components must use `<script setup lang="ts">`.
5. **NO CUSTOM CSS:** Tailwind first. Do NOT create `.css` files or use `<style>` blocks unless Tailwind absolutely cannot express it (e.g., complex `@keyframes`).
6. **NO TAILWIND CONFIG:** Tailwind 4 uses CSS variables and `@theme`. **DO NOT create or look for `tailwind.config.js`.** Theme is configured in `app/assets/css/main.css`.
7. **NO CONTENT V2 APIs:** **NEVER use `<ContentDoc>`, `<ContentQuery>`, or `queryContent()`.** They do not exist in Content v3.

---

## 📚 Nuxt Content v3 Guidelines

Since we are building a documentation/blog site, Content v3 is the core.
- **Collections:** Content is strictly typed and defined in `content.config.ts` using Zod schemas.
- **Querying:** You MUST use the `queryCollection()` API.
  *Example:* `const { data: post } = await useAsyncData('post', () => queryCollection('posts').path(route.path).first())`
- **Rendering:** You MUST use `<ContentRenderer>` to render the fetched data.
  *Example:* `<ContentRenderer v-if="post" :value="post" />`
- **Markdown Components (MDC):** Place custom Vue components for Markdown in `app/components/content/`. They will be auto-imported and available in `.md` files.

---

## 🧭 Navigation & Layout Guidelines

We are building a 3-column documentation layout (Sidebar, Main Content, TOC).
- **Navigation Data:** Do NOT use Content v3's navigation API. We use a custom `.navigation.yml` located in `content/`.
- **Fetching Nav:** Use the client composable `useNavigation()` (located in `app/composables/useNavigation.ts`), which fetches from `server/api/navigation.get.ts`.
- **Types:** Always type navigation items using `NavLink` and `NavSection` from `app/types/navigation.ts`.

---

## 💻 Coding Conventions & Best Practices

1. **Auto-imports:** Rely on Nuxt auto-imports. DO NOT manually import `ref`, `computed`, `useRoute`, `useAsyncData`, or components from the `app/components/` directory.
2. **Data Fetching:** 
   - Use `useFetch` or `useAsyncData` for SSR-safe data.
   - `$fetch` is ONLY acceptable in client-only contexts (e.g., inside `onMounted` or event handlers).
3. **SSR Gotchas:** NEVER access `window`, `document`, or `localStorage` in the top-level scope of `<script setup>`. Always guard with `onMounted(() => {...})` or `if (import.meta.client) {...}`.
4. **Component Size:** If a `.vue` file exceeds 300 lines, you MUST refactor and split it into smaller sub-components.
5. **Type Checking:** Ensure all TypeScript is strict. The project relies on `npx nuxi typecheck`. If you modify schemas or configs, remind the user to run `npm run postinstall` to regenerate `.nuxt/` typedefs.

---

## 🚀 Common Commands (For your awareness)
- Dev: `npm run dev -- --host 0.0.0.0`
- Build: `npm run build`
- Generate SSG: `npm run generate`
- Typecheck: `npx nuxi typecheck`
- Regenerate Types: `npm run postinstall`
