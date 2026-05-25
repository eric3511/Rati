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
              <IconGithub size="1.25rem" />
            </a>
            <a href="https://bilibili.com/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-md hover:bg-accent transition-colors" aria-label="Bilibili">
              <IconBilibili size="1.25rem" />
            </a>
            <a href="mailto:contact@rati.dev" class="p-2 rounded-md hover:bg-accent transition-colors" aria-label="Email">
              <IconMail size="1.25rem" />
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
            <IconHeart size="1rem" class="text-red-500" />
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
