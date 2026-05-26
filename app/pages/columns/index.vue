<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { data: columns } = await useAsyncData('all-columns', () =>
  queryCollection('columns')
    .where('published', '=', true)
    .order('order', 'ASC')
    .all()
)

const { overviews } = await useColumnNavigation()

useSeoMeta({
  title: '专栏列表',
  description: '所有专栏',
})
</script>

<template>
  <div class="flex flex-1">
    <ColumnSidebar mode="list" :overviews="overviews" />

    <div class="flex-1 max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold text-foreground mb-8">专栏</h1>
      <div class="grid gap-6 md:grid-cols-2">
        <NuxtLink
          v-for="col in columns"
          :key="col.path"
          :to="col.path"
          class="block border border-border rounded-lg p-6 hover:border-primary transition-colors"
        >
          <h2 class="text-lg font-semibold text-foreground mb-2">{{ col.title }}</h2>
          <p v-if="col.description" class="text-muted-foreground">{{ col.description }}</p>
        </NuxtLink>
      </div>
      <p v-if="!columns?.length" class="text-muted-foreground">暂无专栏</p>
    </div>
  </div>
</template>
