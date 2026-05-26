<script setup lang="ts">
const route = useRoute()
const slug = computed(() => (route.params.slug as string[])?.join('/') || '')

const { data: page, error } = await useAsyncData(`content-${slug.value}`, () =>
  queryCollection('pages').path(`/${slug.value}`).first()
)

if (error.value || !page.value) {
  throw createError({ statusCode: 404, message: '页面未找到' })
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12 text-foreground/90 leading-relaxed space-y-4">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
