import type { NavLink, NavSection } from '~/types/navigation'

export function useNavigation() {
  const navigation = ref<NavSection[]>([])

  const loadNavigation = async () => {
    try {
      const data = await $fetch<NavSection[]>('/api/navigation')
      navigation.value = data || []
    } catch (error) {
      console.warn('Failed to load navigation:', error)
      navigation.value = []
    }
  }

  const route = useRoute()

  const isActive = (path: string) => {
    return route.path === path || route.path.startsWith(path + '/')
  }

  onMounted(() => {
    loadNavigation()
  })

  return {
    navigation,
    isActive,
    loadNavigation,
  }
}