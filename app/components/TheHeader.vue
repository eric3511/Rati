<script setup lang="ts">
import type { HeaderNavItem } from '~/types/navigation'

const { data: headerNav } = await useFetch<HeaderNavItem[]>('/api/header-nav')

const mobileMenuOpen = ref(false)
const expandedMenus = ref<Set<number>>(new Set())

const toggleSubmenu = (index: number) => {
  const next = new Set(expandedMenus.value)
  if (next.has(index)) {
    next.delete(index)
  } else {
    next.add(index)
  }
  expandedMenus.value = next
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto flex h-16 items-center gap-6 px-4">
      <NuxtLink to="/" class="flex items-center gap-3 flex-shrink-0">
        <div class="size-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span class="font-bold text-white">R</span>
        </div>
        <span class="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Rati</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1 ml-2">
        <ul class="flex items-center gap-1">
          <template v-for="(item, i) in headerNav" :key="item.title">
            <li v-if="item.children && item.children.length > 0" class="relative group" :data-nav-index="i">
              <button class="flex items-center gap-1 rounded px-3 py-2 hover:bg-accent transition-colors cursor-default">
                {{ item.title }}
                <IconChevronDown size="0.75rem" class="text-muted-foreground group-hover:rotate-180 transition-transform" />
              </button>
              <div class="absolute top-full left-0 mt-1 min-w-[200px] rounded-lg border border-border bg-card shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <div class="p-2">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.to"
                    :to="child.to!"
                    class="block rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <div class="font-medium">{{ child.title }}</div>
                    <div v-if="child.desc" class="text-xs text-muted-foreground mt-0.5">{{ child.desc }}</div>
                  </NuxtLink>
                </div>
              </div>
            </li>
            <li v-else>
              <NuxtLink :to="item.to!" class="rounded px-3 py-2 hover:bg-accent transition-colors">
                {{ item.title }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </nav>

      <div class="flex-1" />

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

    <div v-if="mobileMenuOpen" class="md:hidden border-t border-border/40 bg-background/95 backdrop-blur px-4 py-4">
      <template v-for="(item, i) in headerNav" :key="item.title">
        <div v-if="item.children && item.children.length > 0">
          <button
            class="flex items-center justify-between w-full rounded px-3 py-2 hover:bg-accent transition-colors"
            @click="toggleSubmenu(i)"
          >
            <span>{{ item.title }}</span>
            <IconChevronDown size="0.75rem" :class="['transition-transform', expandedMenus.has(i) ? 'rotate-180' : '']" />
          </button>
          <div v-if="expandedMenus.has(i)" class="ml-4 border-l border-border/40">
            <NuxtLink
              v-for="child in item.children"
              :key="child.to"
              :to="child.to!"
              class="block rounded px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ child.title }}
              <span v-if="child.desc" class="block text-xs text-muted-foreground/60">{{ child.desc }}</span>
            </NuxtLink>
          </div>
        </div>
        <NuxtLink v-else :to="item.to!" class="block rounded px-3 py-2 hover:bg-accent transition-colors" @click="mobileMenuOpen = false">
          {{ item.title }}
        </NuxtLink>
      </template>
    </div>
  </header>
</template>
