---
title: 第六章：生产部署与优化
description: 将 Nuxt 应用部署到 Vercel、Node.js 服务器或 Docker 容器，掌握构建优化与性能监控。
order: 6
date: '2026-05-12'
published: true
---

# 第六章：生产部署与优化

最后一章我们将把应用部署到生产环境，并学习优化技巧。

## 构建前置检查

```bash
# TypeScript 类型检查
npx nuxi typecheck

# 生产构建
pnpm build

# 本地预览生产构建
pnpm preview
```

## 部署方式对比

| 平台 | 优势 | 适配方式 |
|------|------|---------|
| **Vercel** | 零配置、自动 HTTPS | 推送 Git 即可 |
| **Node.js 服务器** | 完全控制 | `node .output/server/index.mjs` |
| **Docker** | 环境一致性 | 编写 Dockerfile |
| **Cloudflare** | 边缘网络 | Nitro 预设 `cloudflare_pages` |

## 部署到 Vercel

Vercel 自动检测 Nuxt 项目，无需额外配置：

```bash
# 安装 Vercel CLI
pnpm add -g vercel

# 部署
vercel --prod
```

## Docker 部署

```dockerfile [Dockerfile]
FROM node:22-alpine
WORKDIR /app
COPY .output .output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

```bash
docker build -t my-nuxt-app .
docker run -p 3000:3000 my-nuxt-app
```

## Node.js 服务器

```bash
# 构建
pnpm build

# 使用 PM2 启动
pm2 start .output/server/index.mjs --name my-app

# 或直接启动
node .output/server/index.mjs
```

## 性能优化

### 图片优化

```vue
<template>
  <NuxtImg
    src="/hero.jpg"
    width="1200"
    format="webp"
    loading="lazy"
  />
</template>
```

### 代码分割

Nuxt 自动按路由拆分代码，无需手动配置。但你可以在 `nuxt.config.ts` 中控制分包策略：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: true, // 提取 payload 到独立文件
  },
})
```

### 缓存策略

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
    },
  },
})
```

## 环境变量管理

```bash
# .env (本地开发)
NUXT_PUBLIC_API_BASE=https://api.example.com
NUXT_API_SECRET=dev-secret

# .env.production (生产)
NUXT_PUBLIC_API_BASE=https://api.prod.example.com
NUXT_API_SECRET=prod-secret
```

Nuxt 在构建时自动加载对应 `.env` 文件，并内联 `NUXT_PUBLIC_*` 变量。

## 监控与日志

使用 `@nuxtjs/plausible` 或 `@nuxtjs/partytown` 集成第三方分析：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/plausible'],
  plausible: {
    domain: 'mysite.com',
  },
})
```

## 专栏总结

恭喜你完成了整个专栏！回顾一下我们学到的内容：

1. **项目初始化** — nuxt.config.ts 与模块系统
2. **文件路由** — 动态参数、嵌套路由、中间件
3. **数据获取** — useFetch、useAsyncData、水合
4. **中间件与插件** — 路由守卫、全局注入
5. **渲染模式** — SSR / SSG / SWR 与 SEO
6. **生产部署** — Vercel、Docker、Node.js

::tip{title="继续学习"}
Nuxt 的官方文档是深入学习的最佳资源：[https://nuxt.com/docs](https://nuxt.com/docs)
::

> 感谢阅读，祝你用 Nuxt 构建出优秀的产品。
