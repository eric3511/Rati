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
        <IconMenu size="1.5rem" />
      </button>

      <div class="hidden md:flex items-center gap-2">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-md hover:bg-accent transition-colors" aria-label="GitHub">
          <IconGithub size="1.25rem" />
        </a>
        <a href="https://bilibili.com/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-md hover:bg-accent transition-colors" aria-label="Bilibili">
          <IconBilibili size="1.25rem" />
        </a>
        <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          <IconLogIn size="1rem" />
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
