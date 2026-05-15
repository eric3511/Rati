<template>
  <div class="min-h-screen bg-bg text-text">
    <nav class="border-b border-border">
      <div class="max-w-4xl mx-auto px-4 h-14 flex items-center gap-6">
        <NuxtLink to="/" class="font-semibold text-lg">Rati</NuxtLink>
        <NuxtLink to="/columns" class="text-text-secondary hover:text-text transition-colors">专栏</NuxtLink>
        <NuxtLink to="/posts" class="text-text-secondary hover:text-text transition-colors">文章</NuxtLink>
      </div>
    </nav>
    <main>
      <slot />
    </main>
    <footer class="border-t border-border mt-16">
      <div class="max-w-4xl mx-auto px-4 h-14 flex items-center text-sm text-text-secondary">
        &copy; {{ new Date().getFullYear() }} Rati
      </div>
    </footer>
  </div>
</template>
