import { RouteItemType, OhRouterItemType } from '@/types/router/routeType'
import { count } from 'console'

// const getBreadCrumbItems = (config: RouteItemType[]): Map<string, string[]> => {
// 	// filter to just have layout level
// 	config = config.filter((item) => item.layout && item.children && item.children.length >= 1)
// 	if (getLayoutRouterItem(config)) {
// 		return new Map()
// 	}

// 	// container data in map
// 	let breadCrumbItemMap = new Map<string, any>()
// 	for (const index in config) {
// 		const { path, redirect, layout, element, meta, children } = config[index]
// 		const { key, title, icon } = meta
// 		// just handle
// 		breadCrumbItemMap = handleBreadCrumbItems(children, key, title, new Map())
// 	}

// 	breadCrumbItemMap.forEach(function (value: string, key: string, map) {
// 		let newVaule = value.split('.')
// 		if (newVaule.length >= 2) {
// 			newVaule.splice(0, 1)
// 		}
// 		breadCrumbItemMap.set(key, newVaule)
// 	})

// 	return breadCrumbItemMap
// }

// const handleBreadCrumbItems = (
// 	childrens: RouteItemType[],
// 	routerPath: string = '',
// 	breadcrumb: string = '',
// 	breadcrumbMap: Map<string, string>
// ): Map<string, string> => {
// 	for (const index in childrens) {
// 		const { path, redirect, layout, element, meta, children } = childrens[index]
// 		const { key, title } = meta
// 		// root leve key
// 		let routerPathKey = ''
// 		// root leve breadcrumb
// 		let breadcrumbValue = ''
// 		// set deep loop to stop statue
// 		if ((!children || children.length <= 0) && path) {
// 			routerPathKey = routerPath + key // /main/home
// 			breadcrumbValue = breadcrumb + '.' + title // 主框架页面.首页
// 			breadcrumbMap.set(routerPathKey, breadcrumbValue)
// 		} else {
// 			routerPathKey = routerPath + key
// 			breadcrumbValue = breadcrumb + '.' + title
// 			handleBreadCrumbItems(children, routerPathKey, breadcrumbValue, breadcrumbMap)
// 		}
// 	}
// 	return breadcrumbMap
// }

const getLayoutRouterItem = (config: any[]): boolean => {
	if (!config && config.length <= 0) {
		return true
	} else {
		return false
	}
}

/**
 * =========================== oh-router ===========================
 */
const getBreadCrumbItems = (config: OhRouterItemType[]): Map<string, string[]> => {

	config = config.filter((item) => item.meta.layout && item.children && item.children.length >= 1)
  if (getLayoutRouterItem(config)) {
		return new Map()
	}
  
	// container data in map
	let breadCrumbItemMap = new Map<string, string>()
	for (const idx in config) {
		const { meta, path, element, children, index } = config[idx]
		const { key, title } = meta
    // console.log('--> ', {key, title})// 不需要这个
		// just handle
    if (!children || children.length < 1) {
      continue
    }

    for (const childIdx in children) {
      const { meta, children:childs, index, path, element } = children[childIdx]
      if (!childs || childs.length < 1) {
        let secondPath = key + meta.key
        let secondCrumb = title + '.' + meta.title
        breadCrumbItemMap.set(secondPath, secondCrumb)
        continue
      }else {
        let secondPath = key + meta.key
        let secondCrumb = title + '.' + meta.title
        handleBreadCrumbItems2(childs, secondPath, secondCrumb, breadCrumbItemMap)
      }
    }
	}

	let resMap = new Map<string, string[]>()
  for (let [key, value] of breadCrumbItemMap.entries()) {
    let newVaule = value.split('.')
    if (newVaule.length >= 2) {
      newVaule.splice(0, 1)
		}
    resMap.set(key, newVaule)
  }
	return resMap
}

const handleBreadCrumbItems2 = (
	childrens: OhRouterItemType[],
	routerPath: string, // /main/blog
	breadcrumb: string, // 博客管理
	breadcrumbMap: Map<string, string>
): Map<string, string> => {

  for (const idx in childrens) {
		const { meta, children, index, path, element } = childrens[idx]
    if (index) {
      continue
    }

    let routerPathKey = routerPath
    let rounterCrumbKey = breadcrumb
    if (!children || children.length < 1) {
      const {key, title} = meta
      routerPathKey = routerPathKey + key
      rounterCrumbKey = rounterCrumbKey + '.' + title
      // console.log('--> 进来了', {routerPathKey, rounterCrumbKey, })
      breadcrumbMap.set(routerPathKey, rounterCrumbKey)
      continue
    }else {
      const {key, title} = meta
      routerPathKey = routerPathKey + key
      rounterCrumbKey = rounterCrumbKey + '.' + title
      // console.log('--> 进来了', {routerPathKey, rounterCrumbKey, })
      handleBreadCrumbItems2(children, routerPathKey, rounterCrumbKey, breadcrumbMap)
    }
  }
	return breadcrumbMap
}


export { getBreadCrumbItems }
