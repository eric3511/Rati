<script setup lang="ts">
definePageMeta({
  layout: 'default',
  layoutProps: {
    showSidebar: true,
  },
})

const route = useRoute()
const slug = computed(() => (route.params.slug as string[])?.join('/') || '')

const { data: column, error } = await useAsyncData(`column-${slug.value}`, () =>
  queryCollection('columns').path(`/columns/${slug.value}`).first()
)

if (error.value || !column.value) {
  throw createError({ statusCode: 404, message: '专栏未找到' })
}

useSeoMeta({
  title: () => column.value?.title || '专栏',
  description: () => column.value?.description,
})
</script>

<template>
  <div class="flex flex-1">
    <div class="flex-1 max-w-3xl mx-auto px-4 py-12">
      <article v-if="column">
        <header class="mb-8">
          <h1 class="text-3xl font-bold mb-4">{{ column.title }}</h1>
          <p v-if="column.description" class="text-foreground-secondary">{{ column.description }}</p>
        </header>
        <ContentRenderer :value="column" class="prose max-w-none" />
      </article>
    </div>

    <aside v-if="column" class="w-64 flex-shrink-0 hidden xl:block p-6">
      <div class="sticky top-24">
        <ContentToc :page="column" />
      </div>
    </aside>
  </div>
</template>