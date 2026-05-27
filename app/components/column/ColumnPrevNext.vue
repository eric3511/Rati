<script setup lang="ts">
import type { ColumnMeta } from '~/types/column'

defineProps<{
  prev: ColumnMeta | null
  next: ColumnMeta | null
}>()
</script>

<template>
  <nav
    v-if="prev || next"
    class="flex items-center justify-between mt-12 pt-8 border-t border-border"
  >
    <div>
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <span class="text-lg shrink-0" aria-hidden="true">←</span>
        <div>
          <div class="text-xs text-muted-foreground/50">上一篇</div>
          <div class="group-hover:text-primary transition-colors">{{ prev.title }}</div>
        </div>
      </NuxtLink>
    </div>
    <div class="ml-auto">
      <NuxtLink
        v-if="next"
        :to="next.path"
        class="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
      >
        <div>
          <div class="text-xs text-muted-foreground/50">下一篇</div>
          <div class="group-hover:text-primary transition-colors">{{ next.title }}</div>
        </div>
        <span class="text-lg shrink-0" aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </nav>
</template>
