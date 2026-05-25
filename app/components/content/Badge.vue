<script setup lang="ts">
const props = defineProps<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}>()

const typeStyles = {
  default: 'bg-muted text-foreground',
  primary: 'bg-primary text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-black',
  danger: 'bg-red-500 text-white',
}

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
}

const currentType = computed(() => props.type || 'default')
const currentSize = computed(() => props.size || 'md')
</script>

<template>
  <span :class="[
    'inline-flex items-center gap-1 font-medium rounded-full',
    typeStyles[currentType],
    sizeStyles[currentSize]
  ]">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </span>
</template>