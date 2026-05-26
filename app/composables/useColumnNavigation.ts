export async function useColumnNavigation(columnName?: string) {
  const key = columnName ? `column-nav-${columnName}` : 'columns-nav-list'

  const { data } = await useAsyncData(key, () =>
    queryCollection('columns')
      .where('published', '=', true)
      .order('order', 'ASC')
      .all()
  )

  const items = data.value

  if (!items?.length) {
    return columnName ? { overview: null, chapters: [] } : { overviews: [] }
  }

  if (!columnName) {
    const overviews = items.filter((item) => {
      const afterPrefix = item.path.replace(/^\/columns\//, '')
      return !afterPrefix.includes('/')
    })
    return { overviews }
  }

  const basePath = `/columns/${columnName}`
  const columnItems = items.filter(
    (item) => item.path === basePath || item.path.startsWith(`${basePath}/`)
  )

  const overview = columnItems.find((item) => item.path === basePath) ?? null
  const chapters = columnItems.filter((item) => item.path !== basePath)

  return { overview, chapters }
}
