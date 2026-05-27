import type { ColumnChapters } from '~/types/column'

export function useColumnSeries() {
  return useAsyncData('column-series', () =>
    queryCollection('columns')
      .where('published', '=', true)
      .order('order', 'ASC')
      .all()
      .then(items => items.filter((item) => {
        const afterPrefix = item.path.replace(/^\/columns\//, '')
        return !afterPrefix.includes('/')
      }))
  )
}

export function useColumnChapters(seriesName: string, opts?: { watch?: any[] }) {
  const basePath = `/columns/${seriesName}`
  return useAsyncData(`column-chapters-${seriesName}`, () =>
    queryCollection('columns')
      .where('published', '=', true)
      .order('order', 'ASC')
      .all()
      .then((items) => {
        const seriesItems = items.filter(
          (item) => item.path === basePath || item.path.startsWith(`${basePath}/`)
        )
        const overview = seriesItems.find((item) => item.path === basePath) ?? null
        const chapters = seriesItems.filter((item) => item.path !== basePath)
        return { overview, chapters } as ColumnChapters
      }),
    { watch: opts?.watch }
  )
}
