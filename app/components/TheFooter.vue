<template>
  <footer class="border-t border-border bg-card">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="size-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span class="font-bold text-white">R</span>
            </div>
            <span class="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Rati</span>
          </div>
          <p class="text-muted-foreground max-w-md mb-4">
            致力于分享高质量的技术内容,帮助开发者快速成长。探索开源、学习技术、分享经验。
          </p>
          <div class="flex gap-3">
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
            <a href="mailto:contact@rati.dev" class="p-2 rounded-md hover:bg-accent transition-colors" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-medium mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/columns" class="text-muted-foreground hover:text-foreground transition-colors">开源项目</NuxtLink></li>
            <li><NuxtLink to="/posts" class="text-muted-foreground hover:text-foreground transition-colors">技术文章</NuxtLink></li>
            <li><NuxtLink to="/columns" class="text-muted-foreground hover:text-foreground transition-colors">视频教程</NuxtLink></li>
            <li><NuxtLink to="/#about" class="text-muted-foreground hover:text-foreground transition-colors">关于我</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="font-medium mb-4">资源</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-muted-foreground hover:text-foreground transition-colors">文档中心</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-foreground transition-colors">常见问题</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-foreground transition-colors">隐私政策</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-foreground transition-colors">使用条款</a></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-border">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-1">
            &copy; 2026 Rati. Made with
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 text-red-500 fill-red-500">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            by developers
          </div>
          <div class="flex gap-6">
            <span class="hover:text-foreground transition-colors">ICP备案号: 京ICP备xxxxxxxx号</span>
            <span class="hover:text-foreground transition-colors">公网安备xxxxxxxxxx号</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
