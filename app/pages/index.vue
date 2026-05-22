<script setup lang="ts">
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
    <HeroCarousel />

    <section class="py-16 bg-background">
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
                <svg v-if="col.icon === 'code'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-white"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
                <svg v-else-if="col.icon === 'book'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-white"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>
                <svg v-else-if="col.icon === 'cpu'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-white"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>
                <svg v-else-if="col.icon === 'boxes'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-white"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" /><path d="m7 16.5-4.74-2.85" /><path d="m7 16.5 5-3" /><path d="M7 16.5v5.17" /><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" /><path d="m17 16.5-5-3" /><path d="m17 16.5 4.74-2.85" /><path d="M17 16.5v5.17" /><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" /><path d="M12 8 7.26 5.15" /><path d="m12 8 4.74-2.85" /><path d="M12 13.5V8" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-white"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg>
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
              <svg v-if="link.icon === 'terminal'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-muted-foreground group-hover:text-primary transition-colors"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg>
              <svg v-else-if="link.icon === 'cloud'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-muted-foreground group-hover:text-primary transition-colors"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
              <svg v-else-if="link.icon === 'database'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-muted-foreground group-hover:text-primary transition-colors"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>
              <svg v-else-if="link.icon === 'wrench'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-muted-foreground group-hover:text-primary transition-colors"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-muted-foreground group-hover:text-primary transition-colors"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
            </div>
            <h3 class="font-medium text-center mb-1 group-hover:text-primary transition-colors">{{ link.name }}</h3>
            <p class="text-xs text-muted-foreground text-center">{{ link.desc }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-2 right-2 size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
