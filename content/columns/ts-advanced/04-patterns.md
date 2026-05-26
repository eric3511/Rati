---
title: 第四章：高级设计模式
description: 综合运用映射类型、模板字面量、Branded Type 等技巧，实现生产级的类型安全设计模式。
order: 4
date: '2026-05-22'
published: true
---

# 第四章：高级设计模式

本章将前面学到的类型技巧融会贯通，构建生产级别的类型安全工具。

## 映射类型进阶

### 重映射键

TypeScript 4.1+ 支持在映射类型中使用 `as` 重映射键：

```ts
type Options = {
  darkMode: boolean
  fontSize: number
}

type Getters<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K]
}

type UIGetters = Getters<Options>
// {
//   getDarkMode: () => boolean
//   getFontSize: () => number
// }
```

### 移除修饰符

```ts
// 构造函数选项：所有属性可选且可写
type ConstructorOptions<T> = {
  -readonly [K in keyof T]-?: T[K]
}

interface Immutable {
  readonly id: string
  readonly name: string
  readonly age?: number
}

type Mutable = ConstructorOptions<Immutable>
// { id: string; name: string; age: number }
```

## Branded Type（品牌类型）

Structurally typing 可能导致语义上不同的类型被混用，Branded Type 解决这个问题：

```ts
type Brand<T, B> = T & { readonly __brand: B }

type UserId = Brand<string, 'UserId'>
type PostId = Brand<string, 'PostId'>

function getUser(id: UserId): User { /* ... */ }
function getPost(id: PostId): Post { /* ... */ }

const userId = 'user-1' as UserId
const postId = 'post-1' as PostId

getUser(userId)  // OK
getUser(postId)  // 类型错误 — 语义不兼容
//       ^^^^^^ 不能将 PostId 分配给 UserId
```

::tip{title="何时使用 Branded Type"}
当你的系统中有多个语义不同的标识符（如 UserId、OrderId、ProductId）时，Branded Type 可以防止它们在函数参数中被错误调换。
::

## Builder 模式

```ts
class QueryBuilder<T extends Record<string, unknown> = {}> {
  private conditions: Partial<T> = {}

  where<K extends keyof T>(key: K, value: T[K]) {
    this.conditions[key] = value
    return this
  }

  build(): Partial<T> {
    return { ...this.conditions }
  }
}

interface UserFilter {
  name: string
  age: number
  active: boolean
}

const query = new QueryBuilder<UserFilter>()
  .where('name', 'Alice')  // 自动补全 + 类型检查
  .where('active', true)
  .build()
```

## 条件类型分发 + 联合类型组合

```ts
type Role = 'admin' | 'editor' | 'viewer'

type Permissions = {
  admin: ['create', 'read', 'update', 'delete']
  editor: ['read', 'update']
  viewer: ['read']
}

type UserPermissions<R extends Role> = R extends R
  ? { role: R; permissions: Permissions[R] }
  : never

type AllUsers = UserPermissions<Role>
// { role: 'admin'; permissions: ['create', 'read', 'update', 'delete'] }
// | { role: 'editor'; permissions: ['read', 'update'] }
// | { role: 'viewer'; permissions: ['read'] }
```

注意 `R extends R` 的技巧——触发分发，同时保证每个分支中 `R` 被窄化为具体的 role。

## 模板字面量类型实战

### 路径推导

```ts
type Path<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? Path<T[K], `${Prefix}${Prefix extends '' ? '' : '.'}${K & string}`>
    : `${Prefix}${Prefix extends '' ? '' : '.'}${K & string}`
}[keyof T]

interface Deep {
  user: {
    profile: {
      name: string
      avatar: string
    }
    settings: {
      theme: string
    }
  }
}

type DeepPath = Path<Deep>
// 'user.profile.name' | 'user.profile.avatar' | 'user.settings.theme'
```

### CSS 属性类型

```ts
type CssProperty = 'margin' | 'padding'
type Direction = 'top' | 'right' | 'bottom' | 'left'
type CssShorthand = `${CssProperty}-${Direction}`

// 'margin-top' | 'margin-right' | ... | 'padding-left'
```

## 综合案例：类型安全的表单验证

```ts
interface FormValues {
  email: string
  password: string
  age: number
}

type ValidationRule<T> =
  T extends string ? 'required' | 'email' | 'minLength'
  : T extends number ? 'required' | 'min' | 'max'
  : never

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

const rules: ValidationRules<FormValues> = {
  email: ['required', 'email'],
  password: ['required', 'minLength'],
  age: ['required', 'min'], // 数值字段只能用数值验证规则
}
```

## 专栏总结

本专栏我们系统学习了 TypeScript 进阶主题：

| 章节 | 核心技能 |
|------|---------|
| 类型系统深入 | 结构化类型、协变逆变、类型窄化 |
| 泛型实战 | 泛型约束、工厂模式、泛型组件 |
| 条件类型与 infer | infer 推断、递归类型、模板字面量 |
| 高级设计模式 | 映射类型、Branded Type、Builder |

> 类型编程是一门手艺，多多练习 Type Challenges 中的题目是最好的进阶方式。

::tip{title="下一步"}
推荐阅读:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [type-challenges](https://github.com/type-challenges/type-challenges)
::
