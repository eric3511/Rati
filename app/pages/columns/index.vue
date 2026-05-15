<script setup lang="ts">
const { data: columns } = await useAsyncData('all-columns', () =>
  queryCollection('columns')
    .where('published', '=', true)
    .order('order', 'ASC')
    .all()
)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-text mb-8">专栏</h1>
    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="col in columns"
        :key="col.path"
        class="border border-border rounded-lg p-6 hover:border-primary transition-colors"
      >
        <h2 class="text-lg font-semibold text-text mb-2">{{ col.title }}</h2>
        <p v-if="col.description" class="text-text-secondary">{{ col.description }}</p>
      </article>
    </div>
    <p v-if="!columns?.length" class="text-text-secondary">暂无专栏</p>
  </div>
</template>
