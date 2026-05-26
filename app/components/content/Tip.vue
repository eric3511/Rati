<script setup lang="ts">
const props = defineProps<{
  type?: 'tip' | 'warning' | 'danger' | 'info' | 'note'
  icon?: string
  title?: string
}>()

const typeStyles = {
  tip: 'border-primary bg-primary/5',
  warning: 'border-yellow-500 bg-yellow-500/5',
  danger: 'border-red-500 bg-red-500/5',
  info: 'border-blue-500 bg-blue-500/5',
  note: 'border-muted bg-muted/5',
}

const typeIcons = {
  tip: 'i-lucide-lightbulb',
  warning: 'i-lucide-alert-triangle',
  danger: 'i-lucide-alert-circle',
  info: 'i-lucide-info',
  note: 'i-lucide-sticky-note',
}

const currentType = computed(() => props.type || 'info')
const styleClass = computed(() => typeStyles[currentType.value] || typeStyles.info)
const iconClass = computed(() => props.icon || typeIcons[currentType.value] || typeIcons.info)
</script>

<template>
  <div :class="['border-l-4 p-4 my-4 rounded-r-lg', styleClass]">
    <div class="flex items-center gap-2 mb-2" v-if="title || icon">
      <span v-if="iconClass" :class="[iconClass, 'w-5 h-5']" />
      <span v-if="title" class="font-semibold">{{ title }}</span>
      <span v-else class="font-semibold capitalize">{{ currentType }}</span>
    </div>
    <div class="text-sm text-foreground/80 leading-relaxed">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </div>
  </div>
</template>