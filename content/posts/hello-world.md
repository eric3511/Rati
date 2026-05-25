---
title: 我的第一篇博客
date: 2026-05-15
description: 这是一篇示例博客文章，用于验证 Nuxt Content 配置是否正常。
tags:
  - Nuxt
  - 前端
published: true
links:
  - label: 官方文档
    to: https://nuxt.com
    icon: i-lucide-external-link
---

# 我的第一篇博客

欢迎来到我的技术博客！这里将分享我在软件开发过程中的经验与思考。

::tip{title="提示"}
这是一个 MDC 提示框组件！可以在 Markdown 中直接使用 Vue 组件。
::

## 技术栈

本站使用以下技术构建：

- **Nuxt 4** — Vue 3 全栈框架
- **Tailwind CSS 4** — 实用优先的 CSS 框架
- **@nuxt/content** — 基于 Markdown 的内容引擎

::card{title="推荐学习路径" description="按照以下顺序学习可以事半功倍"}
1. 掌握 Nuxt 基础概念
2. 学习组件开发
3. 深入数据管理和状态
4. 部署与优化
::

## 代码示例

```typescript
// Nuxt 4 组合式 API
const { data } = await useAsyncData('hello', () =>
  queryCollection('posts').order('date', 'DESC').all()
)
```

::warning{title="注意"}
代码块中的 `queryCollection` 是 Nuxt Content v3 的新 API，用于查询内容集合。
::

> 持续学习，持续分享。

# 测试标题

something?

## 二级标题

二级标题内容 ...

### 三级标题

三级标题内容

## 常用标签

<ContentBadge type="primary">Nuxt</ContentBadge>
<ContentBadge type="success">Vue 3</ContentBadge>
<ContentBadge type="warning">Tailwind</ContentBadge>
<ContentBadge type="danger">TypeScript</ContentBadge>