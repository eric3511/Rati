<script setup lang="ts">
import type { ColumnChapters } from '~/types/column'
import type { TocItem } from '~/types/column'

defineProps<{
  sidebar: ({ seriesName: string } & ColumnChapters) | null
  toc?: TocItem[]
}>()
</script>

<template>
  <div class="flex flex-1 min-h-0">
    <ColumnSidebar
      v-if="sidebar"
      :series-name="sidebar.seriesName"
      :overview="sidebar.overview"
      :chapters="sidebar.chapters"
    />

    <main class="flex-1 min-w-0 max-w-3xl mx-auto px-4 py-12">
      <slot />
    </main>

    <ColumnToc
      v-if="toc?.length"
      :headings="toc"
    />
  </div>
</template>
