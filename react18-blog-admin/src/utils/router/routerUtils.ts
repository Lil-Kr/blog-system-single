import { RouterItemType } from "@/types/router/routeType"


const getAllRoutersMap = (routerConfig: RouterItemType[]): Map<string, any> => {
	let resMap: Map<string, any> = new Map()
	if (!routerConfig || routerConfig.length <= 0) {
		return resMap
	}

	for (let index in routerConfig) {
		const { path, redirect, layout, element, component, meta, children } = routerConfig[index]
		const { key } = meta!

    if (!children || children.length <= 0) {
      resMap.set(key, element)
    }

    if (layout) {
      resMap = deepLoopChildrenKey(children!, key, resMap)
    }
  }
  return resMap
}

/**
 * deep loop to get children
 * @param children
 * @param rootKey
 * @returns
 */
function deepLoopChildrenKey(children: RouterItemType[], rootKey: string, childMap: Map<string, any>): Map<string, any> {

	for (let index = 0; index < children.length; index++) {
		const { meta, path, element, children: nextChildren } = children[index]
		const { key } = meta!
    let pathRootKey = rootKey + key

    if(!nextChildren || nextChildren.length <= 0) {
      childMap.set(pathRootKey, element)
      continue
    }
    deepLoopChildrenKey(nextChildren, pathRootKey, childMap)
  }
  return childMap
}
1
export {getAllRoutersMap}


