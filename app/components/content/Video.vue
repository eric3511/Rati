<script setup lang="ts">
const props = defineProps<{
  src: string
  controls?: boolean
  loop?: boolean
  autoplay?: boolean
  muted?: boolean
}>()
</script>

<template>
  <div class="my-4 rounded-lg overflow-hidden">
    <video
      :src="props.src"
      :controls="props.controls !== false"
      :loop="props.loop"
      :autoplay="props.autoplay"
      :muted="props.muted"
      class="w-full max-h-[500px]"
      preload="metadata"
    />
  </div>
</template>