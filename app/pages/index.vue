<script setup lang="ts">
const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('posts')
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(5)
    .all()
)

const { data: columns } = await useAsyncData('home-columns', () =>
  queryCollection('columns')
    .where('published', '=', true)
    .order('order', 'ASC')
    .all()
)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <header class="mb-16">
      <h1 class="text-4xl font-bold text-text mb-4">Rati</h1>
      <p class="text-xl text-text-secondary">软件作品 & 技术博客</p>
    </header>

    <section v-if="columns?.length" class="mb-16">
      <h2 class="text-2xl font-semibold text-text mb-6">专栏</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="col in columns"
          :key="col.path"
          class="border border-border rounded-lg p-6 hover:border-primary transition-colors"
        >
          <h3 class="text-lg font-semibold text-text mb-2">{{ col.title }}</h3>
          <p v-if="col.description" class="text-text-secondary">{{ col.description }}</p>
        </article>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold text-text mb-6">最新文章</h2>
      <div class="space-y-6">
        <article
          v-for="post in posts"
          :key="post.path"
          class="border border-border rounded-lg p-6 hover:border-primary transition-colors"
        >
          <h3 class="text-lg font-semibold text-text mb-2">{{ post.title }}</h3>
          <p v-if="post.description" class="text-text-secondary mb-3">{{ post.description }}</p>
          <div class="flex items-center gap-4 text-sm text-text-secondary">
            <time v-if="post.date">{{ post.date }}</time>
            <span v-if="post.tags?.length" class="flex gap-2">
              <span v-for="tag in post.tags" :key="tag" class="bg-bg-secondary px-2 py-0.5 rounded">
                #{{ tag }}
              </span>
            </span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
