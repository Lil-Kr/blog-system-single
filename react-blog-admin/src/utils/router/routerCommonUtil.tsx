import React from 'react'
import { RouteItemType } from '@/types/router/routeType'
import { Navigate } from 'react-router-dom'

const routerCommonUtil = () => {
	return <div>routerCommonUtil</div>
}

// handle redireact component

const redireactUtil = (params: any) => {
	const { redireactPath, replace } = params
	return <Navigate to={redireactPath} replace={replace} />
}

/**
 * handle router config transform to react-router-dome data structure type
 * @param routerConfig need transform router config
 * @returns transform router config, type of RouteItemType[]
 */
const handleRouterItems = (routerConfig: RouteItemType[]): RouteItemType[] => {
	if (!routerConfig || routerConfig.length <= 0) {
		return []
	}
	let routeInfo: RouteItemType[] = []
	for (let index in routerConfig) {
		const { path, redirect, layout, element, meta, children } = routerConfig[index]
		const { key, title } = meta
		// handle need redirect path
		if (redirect && redirect.length >= 1) {
			const redirectRoute: RouteItemType = {
				path,
				element: redireactUtil({ redireactPath: redirect, replace: true })
			}
			routeInfo.push(redirectRoute)
			continue
		}
		// handle not have children node case
		if (!children || children.length <= 0) {
			routeInfo.push({
				path,
				element
			})
			continue
		}

		// handle layout node page case
		if (layout) {
			let mainRouter: RouteItemType = {}
			/**
			 * push layout router node
			 */
			mainRouter.path = path
			mainRouter.element = layout

			// handle have children node case
			const itemRouter = deepLoopRouterChildren(children, key, [])
			mainRouter.children = itemRouter
			routeInfo.push(mainRouter)
		}
	}
	// console.log('--> routeInfo:', routeInfo)
	return routeInfo
}

function deepLoopRouterChildren(
	children: RouteItemType[],
	rootKey: string,
	routerTable: RouteItemType[] = []
): RouteItemType[] {
	for (let index = 0; index < children.length; index++) {
		const { meta, path, element, children: childrenRoute } = children[index]
		const { key, title, icon } = meta

		const routerPath = rootKey + key
		// console.log('--> routerPath:', routerPath)
		// handle deep loop to end case
		if (!childrenRoute || childrenRoute.length <= 0) {
			routerTable.push({ path: routerPath, element })
			// console.log('--> routerTable:', routerTable)
			continue
		}
		// deep loop
		deepLoopRouterChildren(childrenRoute, routerPath, routerTable)
	}
	return routerTable
}

export default routerCommonUtil

export { redireactUtil, handleRouterItems }
