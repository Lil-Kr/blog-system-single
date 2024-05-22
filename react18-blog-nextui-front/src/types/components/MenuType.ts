export type NavBarSubMenuItem = {
  id: number | string
  title: string
  link: string
  icon?: React.ReactNode
  children?: NavBarSubMenuItem[]
}

