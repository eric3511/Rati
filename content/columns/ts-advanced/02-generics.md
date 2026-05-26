---
title: 第二章：泛型实战
description: 掌握泛型约束、默认值、类型推断与工厂模式，编写可复用且类型安全的工具函数。
order: 2
date: '2026-05-18'
published: true
---

# 第二章：泛型实战

泛型是 TypeScript 最强大的特性之一。本章通过实战案例，教你编写优雅的泛型代码。

## 泛型约束

使用 `extends` 关键字限制泛型参数的类型范围：

```ts
interface HasLength {
  length: number
}

function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

longest([1, 2], [1, 2, 3])     // [1, 2, 3]
longest('hello', 'world!')     // 'world!'
longest(10, 20)                // ❌ number 没有 length
```

### keyof 约束

确保泛型参数是对象的某个键：

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Alice', age: 30 }
getProperty(user, 'name')  // string
getProperty(user, 'email') // ❌ 'email' 不在 user 的键中
```

## 泛型默认值

```ts
interface ApiResponse<T = unknown> {
  data: T
  status: number
  message: string
}

const response: ApiResponse<User[]> = {
  data: [{ id: 1, name: 'Alice' }],
  status: 200,
  message: 'OK',
}

const empty: ApiResponse = {
  data: undefined, // T 默认为 unknown
  status: 404,
  message: 'Not Found',
}
```

## 条件类型 + 泛型

利用条件类型编写响应式类型工具：

```ts
type Nullable<T> = T | null

type DeepNullable<T> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> | null : Nullable<T[K]>
}

interface Config {
  database: {
    host: string
    port: number
  }
  cache: {
    ttl: number
  }
}

type PartialConfig = DeepNullable<Config>
// { database: { host: string | null; port: number | null } | null; ... }
```

## 工厂函数模式

### 泛型工厂

```ts
function createArray<T>(length: number, fill: T): T[] {
  return Array(length).fill(fill)
}

const numbers = createArray(5, 0)       // number[]
const strings = createArray(3, 'hi')    // string[]
```

### 有约束的工厂

```ts
interface Entity {
  id: string
  createdAt: Date
}

function createEntity<T extends Partial<Entity>>(input: T) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    ...input,
  }
}

const post = createEntity({ title: 'Hello' })
// { id: string; createdAt: Date; title: string }
```

## 泛型组件模式（Vue）

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  keyField: keyof T
}>()
</script>

<template>
  <ul>
    <li v-for="item in items" :key="String(item[keyField])">
      {{ item }}
    </li>
  </ul>
</template>
```

::tip{title="Vue 3.3+ 泛型组件"}
Vue 3.3 开始支持在 `<script setup>` 中使用 `generic` 属性定义泛型组件，让模板拥有类型安全。
::

## 实战案例：类型安全的 API 客户端

```ts
interface Endpoints {
  '/users': { data: User[] }
  '/users/:id': { data: User; params: { id: string } }
  '/posts': { data: Post[]; query: { page: number } }
}

async function apiClient<Path extends keyof Endpoints>(
  path: Path,
  options?: (Endpoints[Path] extends { params: infer P } ? { params: P } : {})
    & (Endpoints[Path] extends { query: infer Q } ? { query: Q } : {})
): Promise<Endpoints[Path]['data']> {
  // 实现省略
  return fetch(path) as any
}

const users = await apiClient('/users')
// 类型自动推断为 User[]
const user = await apiClient('/users/:id', { params: { id: '1' } })
```

## 小结

- `extends` 约束泛型参数的类型范围
- `keyof` 确保参数是对象的有效键
- 条件类型结合泛型可以构建灵活的类型工具
- 泛型工厂模式让创建对象的函数类型更精确
- Vue 3.3+ 支持泛型组件

下一章深入 **条件类型与 `infer` 关键字**，解锁类型编程的最强武器。
