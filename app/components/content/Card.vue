<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  to?: string
  horizontal?: boolean
}>()
</script>

<template>
  <div class="border border-border rounded-lg p-4 my-4 bg-card hover:border-primary/50 transition-colors">
    <NuxtLink v-if="to" :to="to" class="block">
      <div class="flex" :class="horizontal ? 'flex-row gap-4' : 'flex-col'">
        <div v-if="title || $slots.header" class="flex-1">
          <slot name="header">
            <h3 class="font-semibold text-lg mb-1">{{ title }}</h3>
          </slot>
        </div>
        <div v-if="description || $slots.default" class="flex-1">
          <slot>
            <p class="text-sm text-foreground-secondary">{{ description }}</p>
          </slot>
        </div>
      </div>
    </NuxtLink>
    <div v-else>
      <slot name="header">
        <h3 v-if="title" class="font-semibold text-lg mb-1">{{ title }}</h3>
      </slot>
      <slot />
    </div>
  </div>
</template>