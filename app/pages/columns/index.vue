<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { data: columns } = await useAsyncData('all-columns-list', () =>
  queryCollection('columns')
    .where('published', '=', true)
    .order('order', 'ASC')
    .all()
    .then(items => items.filter(item => {
      const afterPrefix = item.path.replace(/^\/columns\//, '')
      return !afterPrefix.includes('/')
    }))
)

useSeoMeta({
  title: '专栏列表',
  description: '所有专栏',
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-foreground mb-8">专栏</h1>
    <div v-if="columns?.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="col in columns"
        :key="col.path"
        :to="col.path"
        class="group block border border-border rounded-xl p-6 bg-card hover:border-primary/50 hover:shadow-md transition-all"
      >
        <h2 class="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {{ col.title }}
        </h2>
        <p v-if="col.description" class="text-sm text-muted-foreground line-clamp-2">
          {{ col.description }}
        </p>
        <time v-if="col.date" class="block mt-3 text-xs text-muted-foreground/60">
          {{ new Date(col.date).toLocaleDateString('zh-CN') }}
        </time>
      </NuxtLink>
    </div>
    <p v-else class="text-muted-foreground text-center py-12">暂无专栏</p>
  </div>
</template>
