<script setup lang="ts">
const route = useRoute()

defineProps<{
  mode: 'list' | 'detail'
  overviews?: Array<{ title: string; path: string; description?: string }>
  overview?: { title: string; path: string } | null
  chapters?: Array<{ title: string; path: string }>
}>()

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <aside class="w-64 flex-shrink-0 border-r border-border bg-card/50">
    <div class="h-full flex flex-col">
      <div class="p-4 border-b border-border">
        <h3 class="font-semibold text-sm">
          {{ mode === 'list' ? '专栏' : (overview?.title ?? 'Navigation') }}
        </h3>
      </div>

      <nav class="flex-1 overflow-y-auto p-4">
        <ul v-if="mode === 'list' && overviews" class="space-y-1">
          <li v-for="col in overviews" :key="col.path">
            <NuxtLink
              :to="col.path"
              :class="[
                'block px-3 py-2 rounded-md text-sm transition-colors',
                isActive(col.path)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground-secondary hover:bg-muted hover:text-foreground',
              ]"
            >
              {{ col.title }}
            </NuxtLink>
          </li>
        </ul>

        <ul v-if="mode === 'detail'" class="space-y-1">
          <li v-if="overview">
            <NuxtLink
              :to="overview.path"
              :class="[
                'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(overview.path)
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground-secondary hover:bg-muted hover:text-foreground',
              ]"
            >
              概述
            </NuxtLink>
          </li>
          <li v-for="chapter in chapters" :key="chapter.path">
            <NuxtLink
              :to="chapter.path"
              :class="[
                'block px-3 py-2 rounded-md text-sm transition-colors',
                isActive(chapter.path)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground-secondary/80 hover:bg-muted hover:text-foreground pl-5',
              ]"
            >
              {{ chapter.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
