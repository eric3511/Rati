<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground relative">
    <div class="relative z-10">
      <TheHeader />
      <main class="flex-1">
        <slot />
      </main>
      <TheFooter />
    </div>
  </div>
</template>
