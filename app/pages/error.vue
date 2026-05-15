<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } }>()
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-24 text-center">
    <h1 class="text-6xl font-bold text-text-secondary mb-4">{{ props.error?.statusCode || 500 }}</h1>
    <p class="text-xl text-text-secondary mb-8">{{ props.error?.message || '页面未找到' }}</p>
    <NuxtLink to="/" class="text-primary hover:underline">返回首页</NuxtLink>
  </div>
</template>
