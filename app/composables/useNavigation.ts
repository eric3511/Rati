import type { NavLink, NavSection, HeaderNavItem } from '~/types/navigation'

export function useNavigation() {
  const navigation = ref<NavSection[]>([])
  const headerNav = ref<HeaderNavItem[]>([])

  const loadNavigation = async () => {
    try {
      const data = await $fetch<NavSection[]>('/api/navigation')
      navigation.value = data || []
    } catch (error) {
      console.warn('Failed to load navigation:', error)
      navigation.value = []
    }
  }

  const loadHeaderNav = async () => {
    try {
      const data = await $fetch<HeaderNavItem[]>('/api/header-nav')
      headerNav.value = data || []
    } catch (error) {
      console.warn('Failed to load header nav:', error)
      headerNav.value = []
    }
  }

  const route = useRoute()

  const isActive = (path: string) => {
    return route.path === path || route.path.startsWith(path + '/')
  }

  onMounted(() => {
    loadNavigation()
    loadHeaderNav()
  })

  return {
    navigation,
    headerNav,
    isActive,
    loadNavigation,
    loadHeaderNav,
  }
}
