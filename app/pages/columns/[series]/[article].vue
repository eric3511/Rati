<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const seriesName = computed(() => route.params.series as string)
const articleSlug = computed(() => route.params.article as string)
const articlePath = computed(() => `/columns/${seriesName.value}/${articleSlug.value}`)

const { data: series } = await useColumnChapters(seriesName.value)

const { data: article, error } = await useAsyncData(
  () => `article-${articlePath.value}`,
  () => queryCollection('columns').path(articlePath.value).first(),
  { watch: [seriesName, articleSlug] }
)

if (error.value || !article.value) {
  throw createError({ statusCode: 404, message: '文章未找到' })
}

const chapters = computed(() => series.value?.chapters ?? [])
const currentIndex = computed(() =>
  chapters.value.findIndex((ch) => ch.path === articlePath.value)
)
const prev = computed(() =>
  currentIndex.value > 0 ? (chapters.value[currentIndex.value - 1] ?? null) : null
)
const next = computed(() =>
  currentIndex.value < chapters.value.length - 1
    ? (chapters.value[currentIndex.value + 1] ?? null)
    : null
)

const { headings } = useColumnToc(() => article.value?.body)

useSeoMeta({
  title: () => article.value?.title || '文章',
  description: () => article.value?.description,
})
</script>

<template>
  <ColumnDocLayout
    :sidebar="series ? { seriesName, overview: series.overview, chapters: series.chapters } : null"
    :toc="headings"
  >
    <article v-if="article">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-4">
          {{ article.title }}
        </h1>
        <p v-if="article.description" class="text-muted-foreground leading-relaxed">
          {{ article.description }}
        </p>
      </header>
      <div class="text-foreground/90 leading-relaxed space-y-4">
        <ContentRenderer :value="article" />
      </div>
      <ColumnPrevNext :prev="prev" :next="next" />
    </article>
  </ColumnDocLayout>
</template>
