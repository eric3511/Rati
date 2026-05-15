---
title: 我的第一篇博客
date: 2026-05-15
description: 这是一篇示例博客文章，用于验证 Nuxt Content 配置是否正常。
tags:
  - Nuxt
  - 前端
published: true
---

# 我的第一篇博客

欢迎来到我的技术博客！这里将分享我在软件开发过程中的经验与思考。

## 技术栈

本站使用以下技术构建：

- **Nuxt 4** — Vue 3 全栈框架
- **Tailwind CSS 4** — 实用优先的 CSS 框架
- **@nuxt/content** — 基于 Markdown 的内容引擎

## 代码示例

```typescript
// Nuxt 4 组合式 API
const { data } = await useAsyncData('hello', () =>
  queryCollection('posts').order('date', 'DESC').all()
)
```

> 持续学习，持续分享。
