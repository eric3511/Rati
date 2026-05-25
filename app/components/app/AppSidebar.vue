<script setup lang="ts">
const { navigation, isActive } = useNavigation()

const isCollapsed = ref(false)

defineProps<{
  showToggle?: boolean
}>()
</script>

<template>
  <aside
    :class="[
      'w-64 flex-shrink-0 border-r border-border bg-card/50 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <div class="h-full flex flex-col">
      <div class="p-4 border-b border-border">
        <h3 v-if="!isCollapsed" class="font-semibold text-sm">Navigation</h3>
        <button
          v-if="showToggle"
          @click="isCollapsed = !isCollapsed"
          class="mt-2 p-1.5 rounded hover:bg-muted transition-colors"
        >
          <span :class="isCollapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'" class="w-4 h-4" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto p-4">
        <div v-for="section in navigation" :key="section.title" class="mb-6">
          <div v-if="section.icon && !isCollapsed" class="flex items-center gap-2 mb-2">
            <span :class="section.icon" class="w-4 h-4 text-foreground-secondary" />
            <span class="text-xs font-medium text-foreground-secondary uppercase tracking-wider">
              {{ section.title }}
            </span>
          </div>
          <div v-else-if="!isCollapsed" class="text-xs font-medium text-foreground-secondary uppercase tracking-wider mb-2">
            {{ section.title }}
          </div>

          <ul class="space-y-1">
            <li v-for="link in section.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive(link.to)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground-secondary hover:bg-muted hover:text-foreground'
                ]"
              >
                <span v-if="link.icon" :class="link.icon" class="w-4 h-4 flex-shrink-0" />
                <span v-if="!isCollapsed" class="truncate">{{ link.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </aside>
</template>