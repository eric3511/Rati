export interface ColumnMeta {
  title: string
  description?: string
  path: string
  order?: number
  date?: string
  published: boolean
}

export interface ColumnChapters {
  overview: ColumnMeta | null
  chapters: ColumnMeta[]
}

export interface TocItem {
  id: string
  text: string
  depth: 2 | 3
}
