import type { TocItem } from '~/types/column'

export function useColumnToc(getBody: () => any) {
  const headings = computed<TocItem[]>(() => {
    const body = getBody()
    if (!body) return []
    return extractHeadings(body)
  })

  return { headings }
}

interface ASTNode {
  type?: string
  tag?: string
  props?: Record<string, any>
  value?: string
  children?: ASTNode[]
}

function extractHeadings(node: ASTNode): TocItem[] {
  if (!node?.children) return []

  const items: TocItem[] = []
  for (const child of node.children) {
    if (child.tag === 'h2' || child.tag === 'h3') {
      const text = extractText(child)
      const id = child.props?.id || slugify(text)
      items.push({
        id,
        text,
        depth: child.tag === 'h2' ? 2 : 3,
      })
    }
    items.push(...extractHeadings(child))
  }
  return items
}

function extractText(node: ASTNode): string {
  if (node.value) return node.value
  if (!node.children) return ''
  return node.children.map(extractText).join('')
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
