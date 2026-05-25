import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface NavLink {
  title: string
  to: string
  icon?: string
  target?: string
}

export interface NavSection {
  title: string
  icon?: string
  links: NavLink[]
}

export default defineEventHandler(async () => {
  const rootDir = process.cwd()
  const navPath = join(rootDir, 'content', '.navigation.yml')

  try {
    const content = await readFile(navPath, 'utf-8')
    const lines = content.split('\n')
    const sections: NavSection[] = []
    let currentSection: NavSection | null = null
    let currentLinks: NavLink[] = []
    let inLinksBlock = false

    for (const line of lines) {
      const trimmed = line.trim()

      if (trimmed === 'links:') {
        inLinksBlock = true
        currentLinks = []
        continue
      }

      if (trimmed.startsWith('- title:')) {
        const title = trimmed.replace('- title:', '').trim()

        if (inLinksBlock && currentSection && currentLinks.length > 0) {
          currentSection.links = [...currentLinks]
          currentLinks = []
        }

        if (!inLinksBlock && currentSection && currentSection.links.length > 0) {
          sections.push({ ...currentSection })
        }

        currentSection = { title, links: [] }
        inLinksBlock = false
      } else if (trimmed.startsWith('icon:') && currentSection && !inLinksBlock) {
        currentSection.icon = trimmed.replace('icon:', '').trim()
      } else if (trimmed.startsWith('- title:') && currentSection && inLinksBlock) {
        const linkTitle = trimmed.replace('- title:', '').trim()
        currentLinks.push({ title: linkTitle, to: '#' })
      } else if (trimmed.startsWith('to:') && currentLinks.length > 0) {
        currentLinks[currentLinks.length - 1]!.to = trimmed.replace('to:', '').trim()
      } else if (trimmed.startsWith('icon:') && currentLinks.length > 0 && inLinksBlock) {
        currentLinks[currentLinks.length - 1]!.icon = trimmed.replace('icon:', '').trim()
      }
    }

    if (currentSection) {
      if (currentLinks.length > 0 && inLinksBlock) {
        currentSection.links = currentLinks
      }
      sections.push(currentSection)
    }

    return sections
  } catch (error) {
    console.warn('Failed to load navigation:', error)
    return []
  }
})