<script setup lang="ts">
import type { TocItem } from '~/types/column'

defineProps<{
  headings: TocItem[]
}>()
</script>

<template>
  <aside class="hidden xl:block w-56 flex-shrink-0">
    <div class="sticky top-24 overflow-y-auto" style="max-height: calc(100vh - 8rem)">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        目录
      </h3>
      <nav class="space-y-1">
        <a
          v-for="h in headings"
          :key="h.id"
          :href="`#${h.id}`"
          :class="[
            'block text-sm transition-colors hover:text-foreground',
            h.depth === 2
              ? 'text-foreground/70'
              : 'pl-4 text-foreground/50',
          ]"
        >
          {{ h.text }}
        </a>
        <p v-if="headings.length === 0" class="text-xs text-muted-foreground">
          无目录
        </p>
      </nav>
    </div>
  </aside>
</template>
