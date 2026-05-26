---
title: 第四章：中间件与插件
description: 编写可复用的路由中间件和 Nuxt 插件，掌握认证守卫、全局注入与第三方库集成。
order: 4
date: '2026-05-08'
published: true
---

# 第四章：中间件与插件

中间件和插件是扩展 Nuxt 行为的两个核心机制。本章将详细讲解它们的使用场景与最佳实践。

## 路由中间件

路由中间件在导航发生前执行，可用于权限控制、重定向等场景。

### 创建中间件

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')

  if (!token.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
```

### 使用中间件

**全局中间件** — 在文件名后添加 `.global`：

```text
app/middleware/
└── auth.global.ts        # 对所有路由生效
```

**页面级中间件** — 在 `definePageMeta` 中指定：

```vue
<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'analytics'],
})
</script>
```

### 中间件链

多个中间件按数组顺序执行：

```vue
<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',      // 1. 先检查认证
    'analytics', // 2. 再记录访问
  ],
})
</script>
```

::tip{title="中间件 vs 路由守卫"}
中间件还可以通过返回值控制导航：
- 返回 `navigateTo('/path')` — 重定向
- 返回 `abortNavigation()` — 中止导航
- 返回 `true` / `void` — 继续导航
::

## Nuxt 插件

插件用于注册全局功能、注入辅助函数、初始化第三方库。

### 创建插件

```ts [app/plugins/analytics.ts]
export default defineNuxtPlugin(() => {
  return {
    provide: {
      track: (event: string) => {
        console.log(`[Analytics] ${event}`)
      },
    },
  }
})
```

### 使用插件中的注入

```vue
<script setup lang="ts">
const { $track } = useNuxtApp()
$track('page_view')
</script>
```

### 普通插件（不提供注入）

```ts [app/plugins/gsap.ts]
import { gsap } from 'gsap'

export default defineNuxtPlugin(() => {
  // 无需返回 provide，只做副作用
  gsap.config({
    autoSleep: 60,
  })
})
```

## 插件类型标记

为注入方法提供 TypeScript 类型：

```ts [app/types/nuxt.d.ts]
declare module '#app' {
  interface NuxtApp {
    $track: (event: string) => void
    $user: () => { id: string; name: string }
  }
}

export {}
```

## 常见实战场景

### 认证守卫

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUser()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  if (to.path.startsWith('/admin') && !user.value?.isAdmin) {
    throw createError({ statusCode: 403 })
  }
})
```

### 国际化检测

```ts [app/plugins/i18n.ts]
export default defineNuxtPlugin(() => {
  const locale = useCookie('locale', { default: () => 'zh-CN' })

  return {
    provide: {
      locale,
      t: (key: string) => translations[locale.value]?.[key] ?? key,
    },
  }
})
```

## 小结

- 路由中间件在导航前执行，适合权限控制
- `.global.ts` 后缀实现全局中间件
- 插件通过 `provide` 注入全局功能
- 插件也适合初始化第三方库或注册全局指令
- 记得在 `app/types/` 中声明注入的类型

下一章将探讨 **Nuxt 渲染模式**，帮助你在 SSR / SSG / SWR 之间做出最佳选择。
