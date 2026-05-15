import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    // 专栏 (series/columns) — 每个专栏含一系列教学文章
    columns: defineCollection({
      type: 'page',
      source: 'columns/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number().optional(),
        date: z.string().optional(),
        published: z.boolean().default(true),
      }),
    }),
    // 博客文章
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([]),
        description: z.string().optional(),
        published: z.boolean().default(true),
      }),
    }),
    // 通用页面 (如首页、关于页)
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    }),
  },
})
