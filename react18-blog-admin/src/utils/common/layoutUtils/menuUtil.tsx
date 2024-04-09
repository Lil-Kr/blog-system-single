import { MenuItemType, TabType } from '@/types/common'
import { RouterItemType } from '@/types/router/routeType'

/**
 * ============================ handle menu items by oh-router
 */
const getRouterMenuItems = (config: RouterItemType[]): MenuItemType[] => {
  let menuItems: MenuItemType[] = []
  if (!config || config.length <= 0) {
    return menuItems
  }

  // just handle layout node
  config = config.filter(item => item?.meta?.layout)

  // handle menu item
  for (const index in config) {
    const { meta, path, redirect, element, children } = config[index]
    const { key, title, icon } = meta!

    const menuItem: MenuItemType[] = deepLoopRouterMenuItems(children!, key, [])
    menuItems.push(...menuItem)
  }

  return menuItems
}

function deepLoopRouterMenuItems(
  childrens: RouterItemType[],
  perPath: string,
  menuItemsTable: MenuItemType[] = []
): MenuItemType[] {
  if (!childrens || childrens.length <= 0) {
    return []
  }

  let menuItems: MenuItemType[] = []
  for (const idx in childrens) {
    const { meta, path, element, children, index } = childrens[idx]
    if (index) {
      // 过滤索引路由, 不参与菜单展树
      continue
    }

    const { key, title, icon } = meta!
    // menu key, breadcrumb key
    let menuKey = perPath + key
    let menuItem: MenuItemType = { key: menuKey, icon: icon, label: title }
    // if no have path, it is preMenu
    if (!element && children && children.length >= 2) {
      // children
      menuItem.children = deepLoopRouterMenuItems(children, menuKey, menuItems)
    }
    menuItems.push(menuItem)

    if (!children || children.length <= 0) {
      continue
    }
  }

  return menuItems
}

export { getRouterMenuItems }

const getPushMenu = (historyOpenTabs: TabType[], key: string): TabType[] => {
  return historyOpenTabs.filter(item => item.key === key)
}

export { getPushMenu }
