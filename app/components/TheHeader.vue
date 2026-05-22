<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="size-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span class="font-bold text-white">R</span>
          </div>
          <span class="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Rati</span>
        </NuxtLink>
      </div>

      <nav class="relative hidden md:flex">
        <ul class="flex gap-1">
          <li>
            <NuxtLink to="/columns" class="flex items-center gap-1 rounded px-3 py-2 hover:bg-accent transition-colors">
              开源项目
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts" class="flex items-center gap-1 rounded px-3 py-2 hover:bg-accent transition-colors">
              技术分享
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/columns" class="flex items-center gap-1 rounded px-3 py-2 hover:bg-accent transition-colors">
              视频教学
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#about" class="block rounded px-3 py-2 hover:bg-accent transition-colors">
              关于我
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <button class="md:hidden p-2 rounded-md hover:bg-accent transition-colors" aria-label="Open menu" @click="mobileMenuOpen = !mobileMenuOpen">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6">
          <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      <div class="hidden md:flex items-center gap-2">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-md hover:bg-accent transition-colors" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
        <a href="https://bilibili.com/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-md hover:bg-accent transition-colors" aria-label="Bilibili">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
          </svg>
        </a>
        <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" />
          </svg>
          <span>登录</span>
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden border-t border-border/40 bg-background/95 backdrop-blur px-4 py-4 space-y-2">
      <NuxtLink to="/columns" class="block rounded px-3 py-2 hover:bg-accent transition-colors">开源项目</NuxtLink>
      <NuxtLink to="/posts" class="block rounded px-3 py-2 hover:bg-accent transition-colors">技术分享</NuxtLink>
      <NuxtLink to="/columns" class="block rounded px-3 py-2 hover:bg-accent transition-colors">视频教学</NuxtLink>
      <NuxtLink to="/#about" class="block rounded px-3 py-2 hover:bg-accent transition-colors">关于我</NuxtLink>
    </div>
  </header>
</template>
