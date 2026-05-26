<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = computed(() => (route.params.slug as string[])?.join('/') || '')
const segments = computed(() => slug.value.split('/'))
const columnName = computed(() => segments.value[0]!)

const { data: column, error } = await useAsyncData(`column-${slug.value}`, () =>
  queryCollection('columns').path(`/columns/${slug.value}`).first()
)

if (error.value || !column.value) {
  throw createError({ statusCode: 404, message: '专栏未找到' })
}

const { overview, chapters } = await useColumnNavigation(columnName.value)

useSeoMeta({
  title: () => column.value?.title || '专栏',
  description: () => column.value?.description,
})
</script>

<template>
  <div class="flex flex-1">
    <ColumnSidebar
      mode="detail"
      :overview="overview"
      :chapters="chapters"
    />

    <div class="flex-1 max-w-3xl mx-auto px-4 py-12">
      <article v-if="column">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-foreground mb-4">{{ column.title }}</h1>
          <p v-if="column.description" class="text-muted-foreground">{{ column.description }}</p>
        </header>
        <div class="text-foreground/90 leading-relaxed space-y-4">
          <ContentRenderer :value="column" />
        </div>
      </article>
    </div>

    <aside v-if="column" class="w-56 flex-shrink-0 hidden xl:block p-6">
      <div class="sticky top-24">
        <ContentToc :page="column" />
      </div>
    </aside>
  </div>
</template>
