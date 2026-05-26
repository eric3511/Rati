---
title: 第三章：数据获取与水合
description: 深入理解 useFetch、useAsyncData、$fetch 的区别，掌握 SSR 水合原理与缓存策略。
order: 3
date: '2026-05-06'
published: true
---

# 第三章：数据获取与水合

Nuxt 提供了多种数据获取方式，理解它们的差异对于构建高性能 SSR 应用至关重要。

## useFetch — 最常用的数据获取

`useFetch` 是 `useAsyncData` + `$fetch` 的语法糖：

```vue
<script setup lang="ts">
const { data: posts, pending, error } = await useFetch('/api/posts')
</script>
```

特点：**自动在服务端和客户端都可用，返回的数据在 SSR 时被序列化到客户端**。

## useAsyncData — 更灵活的数据获取

当需要在数据获取前后做额外处理时使用：

```vue
<script setup lang="ts">
const { data: column } = await useAsyncData(
  // 唯一 key，用于缓存去重
  `column-${slug}`,
  () => queryCollection('columns').path(`/columns/${slug}`).first()
)

if (!column.value) {
  throw createError({ statusCode: 404 })
}
</script>
```

## 三者对比

| 方法 | 使用场景 | SSR 支持 |
|------|---------|----------|
| `useFetch` | 通用 API 请求 | 支持 |
| `useAsyncData` | 复杂数据获取逻辑 | 支持 |
| `$fetch` | 客户端交互、事件处理 | 不支持 |

::tip{title="什么情况下用 $fetch"}
`$fetch` 适合在 `onMounted` 或事件处理函数中发起请求，此时不需要 SSR。
::

## 水合原理

Nuxt 的 SSR 水合流程：

```
1. 服务端执行 useFetch/useAsyncData
2. 获取的数据序列化到 HTML 中的 <script>payload</script>
3. 客户端水合时直接读取 payload，避免重复请求
4. 渲染出 HTML 并绑定事件

```

::warning{title="水合注意事项"}
水合要求服务端和客户端的初始状态一致，否则会触发水合不匹配警告。避免在组件顶层访问 `window` 或 `document`。
::

## 缓存与重复数据消除

Nuxt 通过 `key` 实现缓存和去重：

```vue
<script setup lang="ts">
const route = useRoute()

// 相同 key 的请求被去重，只发一次
const { data: page } = await useAsyncData(
  `page-${route.path}`,
  () => queryCollection('pages').path(route.path).first()
)
</script>
```

## 刷新与重新获取

```vue
<script setup lang="ts">
const { data, refresh, pending } = await useFetch('/api/posts')

function reload() {
  // 重新请求数据
  refresh()
}

watch(() => route.params.slug, () => {
  // 路由变化时自动刷新
  refresh()
})
</script>
```

## 客户端专属请求

某些情况下你只想在客户端请求：

```vue
<script setup lang="ts">
const { data } = useFetch('/api/analytics', {
  server: false, // 跳过服务端执行
})
</script>
```

## 小结

- `useFetch` 是 SSR 数据获取的首选
- `useAsyncData` 提供更灵活的控制
- `$fetch` 仅用于客户端场景
- 水合依赖 payload 序列化，注意状态一致性
- `key` 机制确保数据去重和缓存

下一章将学习 **中间件与插件**，了解如何扩展 Nuxt 应用的行为。
