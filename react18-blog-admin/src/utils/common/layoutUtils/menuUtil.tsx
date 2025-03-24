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

  // 仅处理 layout 为 true 的节点
  const routerConfig = config.filter(item => item?.meta?.layout === true)
  if (!routerConfig || routerConfig.length <= 0) {
    return []
  }

  for (const index in routerConfig) {
    const { meta, children } = routerConfig[index]
    const { key } = meta!
    const res = handleMenu(children ?? [], key!)
    menuItems.push(...res)
  }

  return menuItems
}

const handleMenu = (children: RouterItemType[], rootPaht: string): MenuItemType[] => {
  if (!children || children.length <= 0) {
    return []
  }

  return children.map(item => {
    const { meta, element } = item
    let menuKey = rootPaht + meta?.key!
    const menuItem: MenuItemType = {
      key: menuKey,
      label: meta?.title ?? '',
      icon: meta?.icon // 处理 icon 字段
    }

    // 如果有子菜单，递归处理
    if (!element && item?.children && item?.children.length > 0) {
      menuItem.children = handleMenu(item.children ?? [], menuKey)
    }

    return menuItem
  })
}

// function deepLoopRouterMenuItems(
//   childrens: RouterItemType[],
//   perPath: string,
//   menuItemsTable: MenuItemType[] = []
// ): MenuItemType[] {
//   let menuItems: MenuItemType[] = []

//   for (const idx in childrens) {
//     const { meta, path, children } = childrens[idx]
//     const { key, title, icon } = meta!

//     let menuKey = perPath + key
//     let menuItem: MenuItemType = { key: menuKey, icon, label: title }

//     // If there are children, process recursively
//     if (children && children.length > 0) {
//       menuItem.children = deepLoopRouterMenuItems(children, menuKey)
//     }

//     menuItems.push(menuItem)
//   }

//   return menuItems
// }

export { getRouterMenuItems }

const getPushMenu = (historyOpenTabs: TabType[], key: string): TabType[] => {
  return historyOpenTabs.filter(item => item.key === key)
}

export { getPushMenu }
