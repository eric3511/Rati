<script setup lang="ts">
defineProps<{
  showSidebar?: boolean
}>()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground relative">
    <div class="relative z-10">
      <TheHeader />
      <div class="flex flex-1">
        <AppSidebar v-if="showSidebar" />
        <main class="flex-1">
          <slot />
        </main>
      </div>
      <TheFooter />
    </div>
  </div>
</template>
