<script setup lang="ts">
definePageMeta({
  layout: 'default',
  layoutProps: {
    showSidebar: true,
  },
})

const { data: posts } = await useAsyncData('all-posts', () =>
  queryCollection('posts')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all()
)

useSeoMeta({
  title: '文章列表',
  description: '所有博客文章',
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-text mb-8">文章</h1>
    <div class="space-y-6">
      <article
        v-for="post in posts"
        :key="post.path"
        class="border border-border rounded-lg p-6 hover:border-primary transition-colors"
      >
        <h2 class="text-lg font-semibold text-text mb-2">{{ post.title }}</h2>
        <p v-if="post.description" class="text-text-secondary mb-3">{{ post.description }}</p>
        <div class="flex items-center gap-4 text-sm text-text-secondary">
          <time v-if="post.date">{{ post.date }}</time>
          <span v-if="post.tags?.length" class="flex gap-2">
            <span v-for="tag in post.tags" :key="tag" class="bg-bg-secondary px-2 py-0.5 rounded">
              #{{ tag }}
            </span>
          </span>
        </div>
      </article>
    </div>
    <p v-if="!posts?.length" class="text-text-secondary">暂无文章</p>
  </div>
</template>
