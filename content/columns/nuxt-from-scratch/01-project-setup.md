---
title: 第一章：项目初始化与配置
description: 从零搭建 Nuxt 4 项目，详解 nuxt.config.ts 配置、模块系统与目录结构。
order: 1
date: '2026-05-02'
published: true
---

# 第一章：项目初始化与配置

本章将带你从零搭建一个 Nuxt 4 项目，深入理解项目配置和目录结构。

## 创建项目

```bash
npx nuxi@latest init my-app

# 进入项目目录
cd my-app

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## nuxt.config.ts 详解

Nuxt 4 的配置入口是 `nuxt.config.ts`，这是整个应用的"大脑"：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // 兼容模式设置
  compatibilityDate: '2026-01-01',
  future: {
    compatibilityVersion: 4,
  },

  // 启用开发工具
  devtools: { enabled: true },

  // 模块注册
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],

  // Tailwind CSS 配置（Tailwind 4）
  css: ['~/assets/css/main.css'],

  // 应用级配置
  app: {
    head: {
      title: 'My Nuxt App',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})
```

## 核心目录结构

```
my-app/
├── app/                # 应用主目录
│   ├── components/     # 组件（自动导入）
│   ├── pages/          # 路由页面
│   ├── composables/    # 组合式函数
│   ├── layouts/        # 布局
│   ├── middleware/     # 中间件
│   └── assets/        # 静态资源
├── content/           # 内容目录（需 @nuxt/content）
├── public/            # 公共资源（直接映射到根路径）
├── server/            # 服务端（Nitro）
│   └── api/           # API 路由
└── nuxt.config.ts     # 核心配置
```

::tip{title="Nuxt 4 目录变化"}
Nuxt 4 将 `pages/`、`components/` 等目录迁移到 `app/` 目录下，这是最大的变化之一。
::

## 模块系统

Nuxt 的模块系统是其扩展能力的核心：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    // 安装并注册 @nuxt/content 模块
    '@nuxt/content',
    // 自定义模块
    './modules/my-module',
  ],

  // 模块配置
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },
})
```

::card{title="常用模块" description="Nuxt 生态中的高频模块"}
- `@nuxt/content` — 基于文件的内容管理
- `@nuxt/icon` — 图标解决方案
- `@nuxt/image` — 图片优化
- `@nuxt/fonts` — 字体加载优化
- `@nuxtjs/i18n` — 国际化
::

## 环境变量

Nuxt 内置 `runtimeConfig` 管理环境变量：

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // 仅服务端可访问
    apiSecret: '',
    // 客户端和服务端均可访问
    public: {
      apiBase: 'https://api.example.com',
    },
  },
})
```

在组件中使用：

```vue
<script setup lang="ts">
const config = useRuntimeConfig()
console.log(config.public.apiBase) // 客户端可见
</script>
```

## 小结

本章你学会了：

1. 使用 `nuxi` 脚手架创建项目
2. `nuxt.config.ts` 的核心配置项
3. Nuxt 4 的目录结构变化
4. 模块系统的使用方式
5. `runtimeConfig` 环境变量管理

下一章我们将深入 Nuxt 的**文件路由系统**，了解如何构建灵活的页面导航。
