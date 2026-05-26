<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = computed(() => (route.params.slug as string[])?.join('/') || '')

const { data: post, error } = await useAsyncData(`post-${slug.value}`, () =>
  queryCollection('posts').path(`/posts/${slug.value}`).first()
)

if (error.value || !post.value) {
  throw createError({ statusCode: 404, message: '文章未找到' })
}

useSeoMeta({
  title: () => post.value?.title || '文章',
  description: () => post.value?.description,
})
</script>

<template>
  <div class="flex flex-1">
    <div class="flex-1 max-w-3xl mx-auto px-4 py-12">
      <article v-if="post">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-foreground mb-4">{{ post.title }}</h1>
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <time v-if="post.date">{{ post.date }}</time>
            <span v-if="post.tags?.length" class="flex gap-2">
              <ContentBadge v-for="tag in post.tags" :key="tag">{{ tag }}</ContentBadge>
            </span>
          </div>
        </header>
        <div class="text-foreground/90 leading-relaxed space-y-4">
          <ContentRenderer :value="post" />
        </div>
      </article>
    </div>

    <aside v-if="post" class="w-64 flex-shrink-0 hidden xl:block p-6">
      <div class="sticky top-24">
        <ContentToc :page="post" />
      </div>
    </aside>
  </div>
</template>
