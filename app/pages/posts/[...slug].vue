<script setup lang="ts">
const route = useRoute()
const slug = computed(() => (route.params.slug as string[])?.join('/') || '')

const { data: post, error } = await useAsyncData(`post-${slug.value}`, () =>
  queryCollection('posts').path(`/posts/${slug.value}`).first()
)

if (error.value || !post.value) {
  throw createError({ statusCode: 404, message: '文章未找到' })
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <article v-if="post">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-text mb-4">{{ post.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-text-secondary">
          <time v-if="post.date">{{ post.date }}</time>
          <span v-if="post.tags?.length" class="flex gap-2">
            <span v-for="tag in post.tags" :key="tag" class="bg-bg-secondary px-2 py-0.5 rounded">
              #{{ tag }}
            </span>
          </span>
        </div>
      </header>
      <ContentRenderer :value="post" class="prose max-w-none" />
    </article>
  </div>
</template>
