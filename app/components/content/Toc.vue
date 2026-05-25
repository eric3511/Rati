<script setup lang="ts">
const props = defineProps<{
  page: any
}>()

const route = useRoute()

const filteredHeadings = computed(() => {
  const body = props.page?.body
  if (!body || !body.children) return []

  const headings: { id: string; text: string; depth: number }[] = []

  const extractHeadings = (nodes: any[]) => {
    for (const node of nodes) {
      if (node.tag === 'h2' || node.tag === 'h3') {
        const text = extractText(node)
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        headings.push({
          id,
          text,
          depth: parseInt(node.tag.replace('h', '')),
        })
      }
      if (node.children) {
        extractHeadings(node.children)
      }
    }
  }

  extractHeadings(body.children)
  return headings
})

function extractText(node: any): string {
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

const activeId = ref('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -80% 0px' }
  )

  document.querySelectorAll('h2[id], h3[id]').forEach((el) => {
    observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <nav v-if="filteredHeadings.length > 0" class="space-y-2">
    <h4 class="text-sm font-semibold text-foreground-secondary mb-3">On this page</h4>
    <ul class="space-y-1 text-sm">
      <li v-for="heading in filteredHeadings" :key="heading.id">
        <a
          :href="`#${heading.id}`"
          :class="[
            'block py-1 transition-colors',
            heading.depth === 3 ? 'pl-4' : '',
            activeId === heading.id
              ? 'text-primary font-medium'
              : 'text-foreground-secondary hover:text-foreground'
          ]"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>