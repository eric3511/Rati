<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null

const NODE_COUNT = 60
const MAX_DIST = 150
const SPEED = 0.2

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  pulse: number
}

let nodes: Node[] = []
let width = 0
let height = 0
let dpr = 1

function init() {
  const canvas = canvasRef.value
  if (!canvas) return
  const container = canvas.parentElement
  if (!container) return

  dpr = window.devicePixelRatio || 1
  width = container.clientWidth
  height = container.clientHeight

  canvas.width = width * dpr
  canvas.height = height * dpr

  const cols = Math.ceil(width / 120) + 2
  const rows = Math.ceil(height / 120) + 2

  nodes = []
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      nodes.push({
        x: i * 120 + (Math.random() - 0.5) * 40,
        y: j * 120 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        radius: Math.random() * 2 + 1,
        opacity: 0.3 + Math.random() * 0.4,
        pulse: Math.random() * Math.PI * 2,
      })
    }
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const container = canvas.parentElement
  if (!container) return
  const newW = container.clientWidth
  const newH = container.clientHeight
  if (newW !== width || newH !== height) {
    width = newW
    height = newH
    canvas.width = width * dpr
    canvas.height = height * dpr
  }

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]!
    n.pulse += 0.02
    n.x += n.vx
    n.y += n.vy

    if (n.x < -40) n.x = width + 40
    if (n.x > width + 40) n.x = -40
    if (n.y < -40) n.y = height + 40
    if (n.y > height + 40) n.y = -40
  }

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]!
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j]!
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MAX_DIST) {
        const lineOpacity = (1 - dist / MAX_DIST) * 0.08
        ctx.strokeStyle = `rgba(59, 130, 246, ${lineOpacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  for (const n of nodes) {
    const glowSize = Math.max(0.5, n.radius + Math.sin(n.pulse) * 1.5)
    ctx.beginPath()
    ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(59, 130, 246, ${n.opacity + Math.sin(n.pulse) * 0.2})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(n.x, n.y, glowSize * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(59, 130, 246, 0.06)`
    ctx.fill()
  }

  ctx.restore()
  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  init()
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>
