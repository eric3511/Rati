---
title: 第二章：基于文件系统的路由
description: 深入 Nuxt 文件路由系统，掌握动态参数、嵌套路由、路由守卫与页面元数据。
order: 2
date: '2026-05-04'
published: true
---

# 第二章：基于文件系统的路由

Nuxt 的路由基于文件系统自动生成，无需手动配置路由表。本章全面解析路由的各种用法。

## 基本路由

在 `app/pages/` 下创建文件，Nuxt 自动生成对应路由：

```text
app/pages/
├── index.vue              → /
├── about.vue              → /about
└── columns/
    └── index.vue          → /columns
```

## 动态路由

使用方括号定义动态参数：

```text
app/pages/
└── columns/
    └── [...slug].vue      → /columns/nuxt-from-scratch/01
                            → /columns/ts-advanced
```

在组件中获取路由参数：

```vue
<script setup lang="ts">
const route = useRoute()
const slug = computed(() =>
  (route.params.slug as string[])?.join('/')
)
</script>
```

## 路由参数约束

使用 `validate` 函数校验路由参数：

```vue
<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    const slug = route.params.slug as string
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  },
})
</script>
```

## 嵌套路由

通过目录嵌套实现页面层级：

```text
app/pages/
└── dashboard/
    ├── index.vue          # 仪表盘首页
    ├── settings.vue       # 设置页
    └── users/
        ├── index.vue      # 用户列表
        └── [id].vue       # 用户详情
```

## 页面元数据

`definePageMeta` 可以为页面设置丰富的元数据：

```vue
<script setup lang="ts">
definePageMeta({
  // 指定使用的布局
  layout: 'default',
  // 传递给布局的 props
  layoutProps: {
    showSidebar: true,
  },
  // 路由中间件
  middleware: ['auth'],
  // 页面标题（自动注入 SEO）
  title: '专栏列表',
})
</script>
```

## 路由导航

Nuxt 推荐使用 `<NuxtLink>` 进行客户端导航：

```vue
<template>
  <NuxtLink
    :to="`/columns/${col.slug}`"
    class="hover:text-primary transition-colors"
  >
    {{ col.title }}
  </NuxtLink>
</template>
```

编程式导航：

```ts
const router = useRouter()

function goToPost(id: string) {
  router.push(`/posts/${id}`)
}
```

## 路由守卫

### 全局中间件

在 `app/middleware/auth.ts` 中定义：

```ts
export default defineNuxtRouteMiddleware((to) => {
  const user = useUser()
  if (!user.value && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }
})
```

### 页面级中间件

```vue
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>
```

## 小结

本章覆盖了 Nuxt 路由系统的核心能力：

- 文件系统自动路由生成
- 动态参数与通配符路由
- `definePageMeta` 配置页面元数据
- `<NuxtLink>` 和编程式导航
- 路由中间件守卫

下一章将深入 **数据获取机制**，学习如何在 Nuxt 中进行 SSR 安全的数据请求。
