<script setup lang="ts">
const slides = [
  { title: '探索开源项目', desc: '发现最新的开源技术和创新解决方案', gradient: 'from-blue-600 to-cyan-500' },
  { title: '技术文章分享', desc: '深入浅出的技术教程和实战经验', gradient: 'from-purple-600 to-pink-500' },
  { title: '视频教学', desc: '跟随大佬学习前沿技术', gradient: 'from-orange-600 to-red-500' },
  { title: '加入社区', desc: '与志同道合的开发者一起成长', gradient: 'from-green-600 to-teal-500' },
]

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const next = () => { current.value = (current.value + 1) % slides.length }
const prev = () => { current.value = (current.value - 1 + slides.length) % slides.length }
const goTo = (i: number) => { current.value = i }

const startAutoPlay = () => { timer = setInterval(next, 5000) }
const stopAutoPlay = () => { if (timer) { clearInterval(timer); timer = null } }

onMounted(startAutoPlay)
onUnmounted(stopAutoPlay)
</script>

<template>
  <section class="relative w-full bg-muted/30">
    <div class="container mx-auto px-4 py-8">
      <div class="relative" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
        <div class="overflow-hidden rounded-xl">
          <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${current * 100}%)` }">
            <div v-for="(slide, i) in slides" :key="i" class="w-full flex-shrink-0">
              <div :class="['relative h-[400px] rounded-xl bg-gradient-to-r overflow-hidden', slide.gradient]">
                <div class="absolute inset-0 bg-black/20" />
                <div class="relative h-full flex flex-col items-center justify-center text-center text-white px-8">
                  <h2 class="text-5xl font-bold mb-4 drop-shadow-lg">{{ slide.title }}</h2>
                  <p class="text-xl max-w-2xl drop-shadow-md">{{ slide.desc }}</p>
                  <button class="mt-8 px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium">了解更多</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors" aria-label="Previous slide" @click="prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-white"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors" aria-label="Next slide" @click="next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 text-white"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        <div class="flex justify-center gap-2 mt-4">
          <button v-for="(_, i) in slides" :key="i" :class="['w-3 h-3 rounded-full transition-colors', current === i ? 'bg-primary' : 'bg-muted-foreground/40']" :aria-label="`Go to slide ${i + 1}`" @click="goTo(i)" />
        </div>
      </div>
    </div>
  </section>
</template>
