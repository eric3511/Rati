<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const seriesName = computed(() => route.params.series as string)

const { data: series, error } = await useColumnChapters(seriesName.value, {
  watch: [seriesName],
})

const overview = computed(() => series.value?.overview ?? null)

if (error.value || !overview.value) {
  throw createError({ statusCode: 404, message: '专栏未找到' })
}

useSeoMeta({
  title: () => overview.value?.title || '专栏',
  description: () => overview.value?.description,
})
</script>

<template>
  <ColumnDocLayout
    :sidebar="series ? { seriesName, overview: series.overview, chapters: series.chapters } : null"
  >
    <article v-if="overview">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-4">
          {{ overview.title }}
        </h1>
        <p v-if="overview.description" class="text-muted-foreground leading-relaxed">
          {{ overview.description }}
        </p>
      </header>
      <div class="text-foreground/90 leading-relaxed space-y-4">
        <ContentRenderer :value="overview" />
      </div>
    </article>
  </ColumnDocLayout>
</template>
