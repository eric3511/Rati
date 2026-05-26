---
title: 第一章：类型系统深入
description: 理解 TypeScript 的结构化类型系统、联合类型分发、协变与逆变，为高级类型编程打基础。
order: 1
date: '2026-05-16'
published: true
---

# 第一章：类型系统深入

TypeScript 采用**结构化类型**（Structural Typing），而非名义类型。理解和掌握这一核心概念，是通往高阶类型编程的必经之路。

## 结构化类型 vs 名义类型

### 名义类型（Nominal Typing）

Java、C# 等语言中，只有当两个类型的名称相同时才视为兼容：

```ts
// 即使结构相同，名称不同则不兼容（TS 中不存在此行为）
```

### 结构化类型（Structural Typing）

TypeScript 只关心类型的"形状"，不关心名称：

```ts
interface User {
  name: string
  age: number
}

interface Person {
  name: string
  age: number
}

const user: User = { name: 'Alice', age: 30 }
const person: Person = user // OK — 结构相同即兼容
```

::tip{title="Duck Typing"}
> "If it walks like a duck and quacks like a duck, then it's a duck."

这就是结构化类型的哲学。
::

## 联合类型的自动分发

条件类型在遇到联合类型时会自动**分发**（Distribute）：

```ts
type Exclude<T, U> = T extends U ? never : T

// 分发过程：
// Exclude<'a' | 'b' | 'c', 'a'>
// → ('a' extends 'a' ? never : 'a') | ('b' extends 'a' ? never : 'b') | ...
// → never | 'b' | 'c'
// → 'b' | 'c'

type Result = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

这是理解内置工具类型（`Exclude`、`Extract` 等）的核心。

## 协变与逆变

函数参数类型是**逆变的**，返回值是**协变的**：

```ts
class Animal {
  name = 'animal'
}
class Dog extends Animal {
  breed = 'labrador'
}

// 协变（返回值）：子类型可以赋值给父类型
let animalGetter: () => Animal
let dogGetter: () => Dog
animalGetter = dogGetter // OK — Dog 是 Animal 的子类

// 逆变（参数）：父类型函数可以赋值给子类型函数
let animalHandler: (a: Animal) => void
let dogHandler: (d: Dog) => void
dogHandler = animalHandler // OK — 能处理 Animal 就能处理 Dog
```

## 类型窄化

### typeof 窄化

```ts
function format(value: string | number) {
  if (typeof value === 'string') {
    return value.trim() // 这里 value 已被窄化为 string
  }
  return value.toFixed(2) // 这里 value 就是 number
}
```

### in 窄化

```ts
interface Circle {
  kind: 'circle'
  radius: number
}
interface Square {
  kind: 'square'
  side: number
}

function getArea(shape: Circle | Square) {
  if ('radius' in shape) {
    return Math.PI * shape.radius ** 2 // shape 窄化为 Circle
  }
  return shape.side ** 2 // shape 窄化为 Square
}
```

### 断言函数

:::warning{title="谨慎使用"}
类型断言绕过了类型检查，仅在确定类型比编译器更精确时使用。
::

```ts
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Not a string')
  }
}

function process(input: unknown) {
  assertIsString(input)
  input.toUpperCase() // 断言后 input 被窄化为 string
}
```

## 分布式条件类型陷阱

当你不想让联合类型分发时，用元组包裹：

```ts
type IsString<T> = T extends string ? 'yes' : 'no'

// 分发（各元素独立判断）
type A = IsString<'a' | 1> // 'yes' | 'no'

// 不分发（整体判断）
type B = IsString<['a' | 1]> // 这是一个元组
// 元组 ['a' | 1] extends string → 'no'

// 更常见的做法：用 [] 包裹
type IsStringNoDistribute<T> = [T] extends [string] ? 'yes' : 'no'
type C = IsStringNoDistribute<'a' | 1> // 'no' — 不分发
```

## 小结

- TypeScript 使用**结构化类型**，形状相同即兼容
- 条件类型遇到联合类型会**自动分发**
- 函数参数是**逆变**的，返回值是**协变**的
- 善用 `typeof`、`in`、断言函数进行类型窄化
- 用 `[T]` 包裹可以防止条件类型分发

下一章将深入 **泛型实战**，学习约束、推断与工厂模式。
