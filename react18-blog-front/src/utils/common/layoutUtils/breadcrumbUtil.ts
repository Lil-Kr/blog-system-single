import { BreadcrumbType } from '@/types/common/breadcrumbType'
import { RouterItemType } from '@/types/router/routeType'

/**
 * data structure only support antd < v5.3.0
 */
const getBreadCrumbItems = (config: RouterItemType[]): Map<string, BreadcrumbType[]> => {
  config = config.filter(item => item.meta!.layout && item.children && item.children.length >= 1)
  if (getLayoutRouterItem(config)) {
    return new Map()
  }

  // container data in map
  let breadCrumbItemMap = new Map<string, string>()
  for (const idx in config) {
    const { meta, path, element, children, index } = config[idx]
    const { key, title } = meta!
    // console.log('--> ', {key, title})// 不需要这个
    // just handle
    if (!children || children.length < 1) {
      continue
    }

    for (const childIdx in children) {
      const { meta, children: childs, index, path, element } = children[childIdx]
      if (!childs || childs.length < 1) {
        let secondPath = key + meta!.key
        let secondCrumb = title + '.' + meta!.title
        breadCrumbItemMap.set(secondPath, secondCrumb)
        continue
      } else {
        let secondPath = key + meta!.key
        let secondCrumb = title + '.' + meta!.title
        handleBreadCrumbItems(childs, secondPath, secondCrumb, breadCrumbItemMap)
      }
    }
  }

  let resMap = new Map<string, BreadcrumbType[]>()
  for (let [key, value] of breadCrumbItemMap.entries()) {
    let newVaule = value.split('.')
    if (newVaule.length >= 2) {
      newVaule.splice(0, 1)
    }

    let readcrumbObj: BreadcrumbType[] = newVaule.map(v => {
      return { title: v }
    })
    resMap.set(key, readcrumbObj)
  }

  return resMap
}

const getLayoutRouterItem = (config: RouterItemType[]): boolean => {
  if (!config || config.length <= 0) {
    return true
  } else {
    return false
  }
}

const handleBreadCrumbItems = (
  childrens: RouterItemType[],
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
      const { key, title } = meta!
      routerPathKey = routerPathKey + key
      rounterCrumbKey = rounterCrumbKey + '.' + title
      // console.log('--> 进来了', {routerPathKey, rounterCrumbKey, })
      breadcrumbMap.set(routerPathKey, rounterCrumbKey)
      continue
    } else {
      const { key, title } = meta!
      routerPathKey = routerPathKey + key
      rounterCrumbKey = rounterCrumbKey + '.' + title
      // console.log('--> 进来了', {routerPathKey, rounterCrumbKey, })
      handleBreadCrumbItems(children, routerPathKey, rounterCrumbKey, breadcrumbMap)
    }
  }
  return breadcrumbMap
}

export { getBreadCrumbItems }
