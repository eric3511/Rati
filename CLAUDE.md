# Rati (我的网站 + 内容博客)

## 架构
- 前端框架：Nuxt 4 + Vue 3 (Composition API)
- 语言：TypeScript
- 样式：Tailwind CSS 4
- 内容引擎：@nuxt/content (用于解析 Markdown 专栏和文章)
- 后台接口：二开 GVA (https://github.com/ZhengGuozhen/gva)，提供动态数据交互

## 开发命令
- 启动开发服务器: `npm run dev` (或 `pnpm dev` / `yarn dev`)
- 构建生产版本: `npm run build`
- 静态生成 (SSG): `npm run generate`
- 类型检查: `npx nuxi typecheck`

## 代码⻛格
- **组件规范**：必须使用 `<script setup lang="ts">` 语法糖，完全使用函数式编程，绝对不要使用 Class API 或 Options API。
- **样式规范**：全面使用 Tailwind CSS 4 实用类名。不要写独立的 `.css` 文件，不要在 `<style>` 中写自定义 CSS，除非是无法用 Tailwind 实现的极特殊动画。
- **自动导入**：充分利用 Nuxt 的自动导入特性。不要手动 `import { ref, computed } from 'vue'`，也不要手动导入 `components/` 目录下的组件。
- **数据请求**：必须使用 Nuxt 原生的 `useFetch` 或 `useAsyncData` 进行接口请求，不要直接使用 `axios` 或原生 `fetch`，以保证 SSR 数据水合正常。

## 常⻅陷阱
- **SSR (服务端渲染) 报错**：在 `<script setup>` 的顶层作用域中，绝对不能直接访问 `window`、`document` 或 `localStorage`。如果必须访问浏览器 API，请将其包裹在 `onMounted` 中，或者使用 `import.meta.client` 进行环境判断。
- **Tailwind 4 差异**：Tailwind v4 使用了全新的 CSS 变量驱动机制，不再依赖传统的 `tailwind.config.js`。配置和主题扩展请直接在全局 CSS 文件中使用 `@theme` 指令。
- **Nuxt Content 路由**：使用 `<ContentDoc>` 或 `<ContentQuery>` 渲染 Markdown 时，注意捕获 404 错误（当找不到对应的 .md 文件时），并提供友好的 fallback 页面。
- **类型丢失**：如果发现 Vue 宏（如 `defineProps`）或 Nuxt 组合式 API 报 TS 错误，请先运行 `npm run postinstall` 或 `npx nuxi prepare` 重新生成 `.nuxt` 目录。

## 不要做
- **不要安装新依赖**：除非我明确同意，否则严禁使用 `npm install` 等命令添加任何新包。
- **不要修改核心架构**：不要试图引入其他状态管理库（如 Pinia），除非我要求。对于简单的全局状态，优先使用 Nuxt 自带的 `useState`。
- **不要破坏现有的 GVA 接口结构**：在对接后台 API 时，严格遵循后端返回的 JSON 结构，不要在前端做过度的数据重组，保持数据流清晰。
- **不要写冗长的组件**：如果一个 Vue 文件超过 300 行，必须将其拆分为更小的子组件（放入 `components/` 目录）。