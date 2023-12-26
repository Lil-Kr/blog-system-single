import { testConfig } from '@/routers/modules'
import { RouteItemType } from '@/types/router/routeType'
import { CheckSquareFilled } from '@ant-design/icons'
import { Children } from 'react'

const getBreadCrumbItems = (config: RouteItemType[]): Map<string, string[]> => {
	// filter to just have layout level
	config = config.filter((item) => item.layout && item.children && item.children.length >= 1)
	if (getLayoutRouterItem(config)) {
		return new Map()
	}

	// container data in map
	let breadCrumbItemMap = new Map<string, any>()
	for (const index in config) {
		const { path, redirect, layout, element, meta, children } = config[index]
		const { key, title, icon } = meta
		// just handle
		breadCrumbItemMap = handleBreadCrumbItems(children, key, title, new Map())
	}

	breadCrumbItemMap.forEach(function (value: string, key: string, map) {
		let newVaule = value.split('.')
		if (newVaule.length >= 2) {
			newVaule.splice(0, 1)
		}
		breadCrumbItemMap.set(key, newVaule)
	})

	return breadCrumbItemMap
}

const handleBreadCrumbItems = (
	childrens: RouteItemType[],
	routerPath: string = '',
	breadcrumb: string = '',
	breadcrumbMap: Map<string, string>
): Map<string, string> => {
	for (const index in childrens) {
		const { path, redirect, layout, element, meta, children } = childrens[index]
		const { key, title, icon } = meta
		// root leve key
		let routerPathKey = ''
		// root leve breadcrumb
		let breadcrumbValue = ''
		// set deep loop to stop statue
		if ((!children || children.length <= 0) && path) {
			routerPathKey = routerPath + key // /main/home
			breadcrumbValue = breadcrumb + '.' + title // 主框架页面.首页
			breadcrumbMap.set(routerPathKey, breadcrumbValue)
		} else {
			routerPathKey = routerPath + key
			breadcrumbValue = breadcrumb + '.' + title
			handleBreadCrumbItems(children, routerPathKey, breadcrumbValue, breadcrumbMap)
		}
	}
	return breadcrumbMap
}

const getLayoutRouterItem = (config: RouteItemType[]): boolean => {
	if (!config && config.length <= 0) {
		return true
	} else {
		return false
	}
}

export { getBreadCrumbItems }
