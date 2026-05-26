---
title: 第五章：渲染模式与 SEO
description: 理解 SSR、SSG、SWR（ISR）三种渲染模式的区别，配置 SEO 元数据与动态 Sitemap。
order: 5
date: '2026-05-10'
published: true
---

# 第五章：渲染模式与 SEO

Nuxt 支持多种渲染模式，在不同场景下各有优势。本章帮你做出最佳选择。

## 三种渲染模式

Nuxt 的渲染由 **Nitro 服务器引擎** 统一管理，通过 `routeRules` 精确控制每页的渲染策略。

### SSR — 服务端渲染（默认）

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/**': { ssr: true }, // 默认行为
  },
})
```

**适用场景**：内容动态变化、需要实时数据的页面。

### SSG — 静态站点生成

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/blog/**': { prerender: true },
  },
})
```

**适用场景**：内容相对固定、追求极致加载速度的页面。

```bash
npx nuxi generate  # 生成静态文件到 .output/public/
```

### SWR / ISR — 增量静态再生

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/blog/**': {
      swr: 3600, // 缓存 1 小时，过期后后台重新生成
    },
  },
})
```

**适用场景**：内容更新不频繁但需要动态能力的页面。

::tip{title="SWR 的优势"}
SWR 兼顾了 SSG 的性能和 SSR 的实时性。首次访问后缓存，过期后的下一次请求触发后台重新渲染。
::

## 混合渲染

你可以对不同路径使用不同策略：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    // 首页 — SSG（构建时预渲染）
    '/': { prerender: true },
    // 专栏 — SWR（1 小时过期后后台重建）
    '/columns/**': { swr: 3600 },
    // 仪表盘 — CSR 客户端渲染（无服务端渲染）
    '/dashboard/**': { ssr: false },
    // API 路由 — 服务端运行时（默认）
    '/api/**': { cors: true },
  },
})
```

## SEO 最佳实践

### 使用 useSeoMeta

```vue
<script setup lang="ts">
useSeoMeta({
  title: '专栏 · My Blog',
  description: '系统的技术专栏合集',
  ogTitle: '专栏 · My Blog',
  ogDescription: '系统的技术专栏合集',
  ogImage: 'https://example.com/og.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>
```

### 动态 SEO

```vue
<script setup lang="ts">
const route = useRoute()
const { data: article } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryCollection('columns').path(route.path).first()
)

useSeoMeta({
  title: () => article.value?.title || '文章',
  description: () => article.value?.description,
})
</script>
```

### HTML Head 配置

```vue
<template>
  <Head>
    <Title>{{ article?.title }}</Title>
    <Meta name="description" :content="article?.description" />
    <Link rel="canonical" :href="`https://mysite.com${route.path}`" />
  </Head>
</template>
```

## Sitemap 和 Robots

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  site: {
    url: 'https://mysite.com',
    name: 'My Tech Blog',
  },
})
```

:::warning{title="生产环境注意"}
Meta 标签在开发环境不可见，使用 `pnpm build && pnpm preview` 验证 SEO 效果。
::

## 小结

| 模式 | 构建时 | 首次请求 | 后续请求 | 适用场景 |
|------|--------|---------|---------|----------|
| SSR | — | 服务端渲染 | 服务端渲染 | 动态内容 |
| SSG | 预渲染 | 返回静态 | 返回静态 | 纯静态页 |
| SWR | — | 服务端渲染 | 缓存返回 | 平衡选择 |

- `routeRules` 提供细粒度的渲染策略控制
- `useSeoMeta` 是声明 SEO 元数据的推荐方式
- 混合模式让你在不同页面间自由选择渲染策略
- 生产环境使用 `pnpm preview` 验证最终效果

下一章将讲解 **生产部署**的完整流程。
