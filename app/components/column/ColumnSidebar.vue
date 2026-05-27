<script setup lang="ts">
import type { ColumnMeta } from '~/types/column'

const route = useRoute()

defineProps<{
  seriesName: string
  overview: ColumnMeta | null
  chapters: ColumnMeta[]
}>()

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <aside class="hidden lg:block w-64 flex-shrink-0 border-r border-border bg-card/50">
    <div class="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
      <div class="px-4 py-3 border-b border-border">
        <NuxtLink
          :to="`/columns/${seriesName}`"
          class="text-sm font-semibold hover:text-primary transition-colors"
        >
          {{ overview?.title ?? seriesName }}
        </NuxtLink>
      </div>

      <nav class="flex-1 overflow-y-auto p-3 space-y-0.5">
        <template v-if="overview">
          <NuxtLink
            :to="overview.path"
            :class="[
              'block px-3 py-1.5 rounded-md text-sm transition-colors',
              isActive(overview.path)
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-foreground-secondary hover:bg-muted hover:text-foreground',
            ]"
          >
            概述
          </NuxtLink>
        </template>

        <NuxtLink
          v-for="ch in chapters"
          :key="ch.path"
          :to="ch.path"
          :class="[
            'block px-3 py-1.5 rounded-md text-sm transition-colors',
            isActive(ch.path)
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-foreground-secondary/80 hover:bg-muted hover:text-foreground',
          ]"
        >
          {{ ch.title }}
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>
