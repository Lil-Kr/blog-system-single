/**
 * 
 */
interface MenuItemType {
  key: string // menu key
  icon: any // icon
  label: string // menu name
  breadcrumb?:string // breadcrumb
  children?: MenuItemType[] // children menu
}

interface SubMenuType {
  key: string
  keyPath: string[]
}

export type { MenuItemType, SubMenuType }