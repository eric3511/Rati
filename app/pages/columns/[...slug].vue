<script setup lang="ts">
const route = useRoute()
const slug = computed(() => (route.params.slug as string[])?.join('/') || '')

const { data: column, error } = await useAsyncData(`column-${slug.value}`, () =>
  queryCollection('columns').path(`/columns/${slug.value}`).first()
)

if (error.value || !column.value) {
  throw createError({ statusCode: 404, message: '专栏未找到' })
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <ContentRenderer v-if="column" :value="column" class="prose max-w-none" />
  </div>
</template>
