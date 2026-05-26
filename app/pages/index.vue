<script setup lang="ts">
const { data: latestColumns } = await useAsyncData('latest-columns', () =>
  queryCollection('columns')
    .select('title', 'description', 'path', 'date')
    .order('date', 'DESC')
    .limit(5)
    .all()
)

const columns = [
  { title: 'Go语言从入门到精通', tag: '编程语言', desc: '系统学习Go语言,掌握并发编程和微服务开发', count: 24, gradient: 'from-blue-500 to-cyan-500', icon: 'code' },
  { title: 'Rust系统编程', tag: '编程语言', desc: '深入理解Rust所有权系统,构建高性能应用', count: 18, gradient: 'from-orange-500 to-red-500', icon: 'book' },
  { title: '工业通讯协议详解', tag: '工业软件', desc: 'Modbus, OPC UA等工业协议实战应用', count: 15, gradient: 'from-green-500 to-emerald-500', icon: 'cpu' },
  { title: '3D建模与可视化', tag: '工业软件', desc: 'Three.js和WebGL打造工业级3D应用', count: 12, gradient: 'from-purple-500 to-pink-500', icon: 'boxes' },
  { title: 'AI大模型开发实战', tag: '视频教学', desc: '从零开始构建自己的AI应用', count: 20, gradient: 'from-indigo-500 to-blue-500', icon: 'video' },
  { title: '嵌入式开发板教程', tag: '视频教学', desc: '玩转树莓派、Arduino等开发板', count: 16, gradient: 'from-teal-500 to-cyan-500', icon: 'video' },
]

const links = [
  { name: 'GitHub', desc: '代码托管平台', href: 'https://github.com/', icon: 'terminal' },
  { name: 'Stack Overflow', desc: '技术问答社区', href: 'https://stackoverflow.com/', icon: 'globe' },
  { name: 'Docker Hub', desc: '容器镜像仓库', href: 'https://hub.docker.com/', icon: 'cloud' },
  { name: 'PostgreSQL', desc: '开源数据库', href: 'https://postgresql.org/', icon: 'database' },
  { name: 'DevTools', desc: '开发工具集合', href: '#', icon: 'wrench' },
  { name: 'MDN Web Docs', desc: 'Web开发文档', href: 'https://developer.mozilla.org/', icon: 'globe' },
]
</script>

<template>
  <div>
    <section class="relative bg-background overflow-hidden">
      <BackgroundLines />
      <div class="relative z-10">
        <div class="container mx-auto px-4 py-8">
          <div class="flex flex-col lg:flex-row gap-6">
            <div class="lg:w-[65%] min-w-0">
              <HeroCarousel />
            </div>

            <div class="lg:w-[35%] flex flex-col">
              <div class="bg-card rounded-xl border border-border p-5 flex-1">
                <div class="flex items-center gap-2 mb-4">
                  <IconHeart size="1.25rem" class="text-primary" />
                  <h3 class="font-bold">最新更新的专栏</h3>
                </div>

                <div class="space-y-3">
                  <div v-if="!latestColumns || latestColumns.length === 0" class="text-sm text-muted-foreground py-8 text-center">
                    暂无更新
                  </div>
                  <NuxtLink
                    v-for="col in latestColumns"
                    :key="col.path"
                    :to="col.path"
                    class="block rounded-lg hover:bg-muted/50 transition-colors p-2 -mx-2"
                  >
                    <div class="text-sm font-medium truncate">{{ col.title }}</div>
                    <div v-if="col.description" class="text-xs text-muted-foreground mt-0.5 line-clamp-1">{{ col.description }}</div>
                    <div v-if="col.date" class="text-xs text-muted-foreground/60 mt-1">{{ new Date(col.date).toLocaleDateString('zh-CN') }}</div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-16">
          <div class="container mx-auto px-4">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold mb-4">精选专栏</h2>
              <p class="text-muted-foreground">系统化学习路径,助你快速成长</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="col in columns" :key="col.title" class="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div :class="['absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity', col.gradient]" />
                <div class="relative p-6">
                  <div :class="['inline-flex p-3 rounded-lg bg-gradient-to-br mb-4', col.gradient]">
                    <IconCode v-if="col.icon === 'code'" class="size-6 text-white" />
                    <IconBook v-else-if="col.icon === 'book'" class="size-6 text-white" />
                    <IconCpu v-else-if="col.icon === 'cpu'" class="size-6 text-white" />
                    <IconBoxes v-else-if="col.icon === 'boxes'" class="size-6 text-white" />
                    <IconVideo v-else class="size-6 text-white" />
                  </div>
                  <div class="inline-block px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground mb-3">{{ col.tag }}</div>
                  <h3 class="font-bold mb-2">{{ col.title }}</h3>
                  <p class="text-sm text-muted-foreground mb-4">{{ col.desc }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">{{ col.count }} 篇文章</span>
                    <button class="text-sm font-medium text-primary hover:underline">查看详情 →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">友情链接</h2>
          <p class="text-muted-foreground">实用工具与资源推荐</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <a v-for="link in links" :key="link.name" :href="link.href" target="_blank" rel="noopener noreferrer" class="group relative flex flex-col items-center p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300">
            <div class="mb-3 p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
              <IconTerminal v-if="link.icon === 'terminal'" class="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <IconCloud v-else-if="link.icon === 'cloud'" class="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <IconDatabase v-else-if="link.icon === 'database'" class="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <IconWrench v-else-if="link.icon === 'wrench'" class="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <IconGlobe v-else class="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 class="font-medium text-center mb-1 group-hover:text-primary transition-colors">{{ link.name }}</h3>
            <p class="text-xs text-muted-foreground text-center">{{ link.desc }}</p>
            <IconExternalLink class="absolute top-2 right-2 size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
