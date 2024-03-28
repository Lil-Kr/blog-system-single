import { MenuItemType } from '@/types/common'
import { RouteItemType, OhRouterItemType } from '@/types/router/routeType'

/**
 * generate Menu && breadcrumb Nav by Router config
 * @param config
 * @returns
 */
const getMenuItems = (config: RouteItemType[]): MenuItemType[] => {
	if (!config && config.length <= 0) {
		return []
	}

	// just handle layout node
	config = config.filter((item) => item.layout)
	// console.log('--> filter not layout node:', config)
	let menuItems: MenuItemType[] = []
	for (const index in config) {
		const { path, redirect, layout, element, meta, children } = config[index]
		const { key, title, icon } = meta

		// handle menu
		const menuItem: MenuItemType[] = deepLoopMenuItems(children, key, [])
		menuItems.push(...menuItem)
	}
	return menuItems
}

/**
 * deep loop router -> menu
 * @param childrens
 * @param perPath
 * @param menuItemsTable
 * @returns
 */
function deepLoopMenuItems(
	childrens: RouteItemType[],
	perPath: string,
	menuItemsTable: MenuItemType[] = []
): MenuItemType[] {
	if (!childrens || childrens.length <= 0) {
		return []
	}

	//
	let menuItems: MenuItemType[] = []
	for (const index in childrens) {
		const { path, redirect, layout, element, meta, children } = childrens[index]
		const { key, title, icon } = meta
		// menu key, breadcrumb key
		let menuKey = perPath + key
		let menuItem: MenuItemType = { key: menuKey, icon: icon, label: title }
		// if no have path, it is preMenu
		if (!path && !element && children && children.length >= 1) {
			// children
			menuItem.children = deepLoopMenuItems(children, menuKey, menuItems)
		}
		menuItems.push(menuItem)

		if (!children || children.length <= 0) {
			continue
		}
	}
	return menuItems
}

/**
 * ============================ handle menu items by oh-router
 */
const getOhRouterMenuItems = (config: OhRouterItemType[]): MenuItemType[] => {
	let menuItems: MenuItemType[] = []
	if (!config && config.length <= 0) {
		return menuItems
  }

	// just handle layout node
	config = config.filter((item) => item.meta.layout)

  // handle menu item 
	for (const index in config) {
		const { meta, path, redirect, element, children } = config[index]
		const { key, title, icon } = meta

    const menuItem: MenuItemType[] = deepLoopOhRouterMenuItems(children, key, [])
    menuItems.push(...menuItem)
  }

  return menuItems
}

function deepLoopOhRouterMenuItems(
  childrens: OhRouterItemType[], 
  perPath: string, 
	menuItemsTable: MenuItemType[] = []
): MenuItemType[] {
    if (!childrens || childrens.length <= 0) {
      return []
    }

    let menuItems: MenuItemType[] = []
    for (const idx in childrens) {
      const { meta, path, element, children, index } = childrens[idx]
      if (index) { // 过滤索引路由, 不参与菜单展树
        continue
      }

      const { key, title, icon } = meta
      // menu key, breadcrumb key
      let menuKey = perPath + key
      let menuItem: MenuItemType = { key: menuKey, icon: icon, label: title }
      // if no have path, it is preMenu
      if (!element && children && children.length >= 2) {
        // children
        menuItem.children = deepLoopOhRouterMenuItems(children, menuKey, menuItems)
      }
      menuItems.push(menuItem)
  
      if (!children || children.length <= 0) {
        continue
      }
    }
    
    return menuItems
}

export { getMenuItems, getOhRouterMenuItems }
