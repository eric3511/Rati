import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { HeaderNavItem } from '~/types/navigation'

export default defineEventHandler(async (): Promise<HeaderNavItem[]> => {
  const rootDir = process.cwd()
  const navPath = join(rootDir, 'content', 'header-nav.json')

  const content = await readFile(navPath, 'utf-8')
  return JSON.parse(content)
})
