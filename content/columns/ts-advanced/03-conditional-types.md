---
title: 第三章：条件类型与 infer
description: 掌握 infer 关键字在条件类型中的用法，实现递归类型、模板字面量推断等高级技巧。
order: 3
date: '2026-05-20'
published: true
---

# 第三章：条件类型与 infer

`infer` 是 TypeScript 类型编程中最强大的工具之一。它允许你在条件类型中**捕获和推断**类型变量。

## infer 基础

`infer` 只能在条件类型的 `extends` 子句中使用：

```ts
// 提取数组元素类型
type ArrayItem<T> = T extends (infer U)[] ? U : T

type A = ArrayItem<string[]>   // string
type B = ArrayItem<number>     // number
type C = ArrayItem<Promise<string>> // Promise<string> — 不匹配
```

## 常用的 infer 模式

### 提取函数返回值

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Fn = (x: number) => string
type R = ReturnType<Fn> // string
```

### 提取 Promise 内部类型

```ts
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T

type P = Awaited<Promise<Promise<number>>> // number
```

注意这里用了**递归**——`Awaited<U>` 再次调用自身解开嵌套 Promise。

### 提取函数参数类型

```ts
type Parameters<T> = T extends (...args: infer P) => any ? P : never

type Params = Parameters<(a: number, b: string) => void>
// [a: number, b: string]
```

## 模板字面量 + infer

```ts
type ExtractId<T> = T extends `${string}/users/${infer Id}` ? Id : never

type UserId = ExtractId<'/api/v1/users/42'> // '42'
```

更复杂的场景——解析路由参数：

```ts
type ParseRoute<T> =
  T extends `${infer Prefix}/:${infer Param}/${infer Rest}`
    ? { params: Record<Param, string> } & ParseRoute<`${Prefix}/${Rest}`>
    : T extends `${infer Prefix}/:${infer Param}`
      ? { params: Record<Param, string> }
      : {}

type Route = ParseRoute<'/users/:userId/posts/:postId'>
// { params: { userId: string; postId: string } }
```

## 递归类型

递归类型可以处理深层嵌套结构：

```ts
// 深度 Required
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]
}

// 深度 Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

interface Config {
  database: {
    host: string
    credentials: {
      user: string
      pass: string
    }
  }
}

type Frozen = DeepReadonly<Config>
// 所有层级均为 readonly
```

::warning{title="递归深度限制"}
TypeScript 对递归类型的深度有限制（默认约 50 层），过深的递归会导致类型计算超时或报错。
::

## 协变位置的 infer

在协变位置（如联合类型成员）使用 `infer` 会产生**联合类型**：

```ts
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type Result = UnionToIntersection<{ a: 1 } | { b: 2 }>
// { a: 1 } & { b: 2 }
```

## 实战案例：类型安全的 EventEmitter

```ts
type EventMap = {
  click: { x: number; y: number }
  keydown: { key: string }
  ready: void
}

type EventCallback<T> = T extends void
  ? () => void
  : (payload: T) => void

declare function on<E extends keyof EventMap>(
  event: E,
  callback: EventCallback<EventMap[E]>
): void

on('click', (payload) => {
  console.log(payload.x, payload.y) // 自动推断 payload 类型
})
on('ready', () => {}) // void 事件，回调无参数
on('keydown', (payload) => {
  payload.key // string
})
```

## 小结

- `infer` 在条件类型中捕获类型变量
- 结合递归可以处理深层嵌套结构
- 模板字面量 + `infer` 实现字符串解析
- `ReturnType`、`Parameters`、`Awaited` 是内置的 infer 典型案例
- 注意递归深度限制，避免无限递归

下一章我们将综合运用这些知识，学习 **TypeScript 高级设计模式**。
