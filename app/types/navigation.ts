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