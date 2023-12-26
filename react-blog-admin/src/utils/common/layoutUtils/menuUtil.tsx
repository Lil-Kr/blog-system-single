import { MenuItemType } from '@/types/common'
import { RouteItemType } from '@/types/router/routeType'
import { it } from 'node:test'

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
		const menuItem: MenuItemType[] = deepLoopMenuItmes(children, key, [])
		menuItems.push(...menuItem)
	}
	// console.log('--> menuItems:', menuItems)
	return menuItems
}

/**
 * deep loop router -> menu
 * @param childrens
 * @param perPath
 * @param menuItemsTable
 * @returns
 */
function deepLoopMenuItmes(
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
			menuItem.children = deepLoopMenuItmes(children, menuKey, menuItems)
		}
		menuItems.push(menuItem)

		if (!children || children.length <= 0) {
			continue
		}
	}
	return menuItems
}

export { getMenuItems }
