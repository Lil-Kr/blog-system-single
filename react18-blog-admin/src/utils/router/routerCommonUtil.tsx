import React from 'react'
import { RouterItemType } from '@/types/router/routeType'
// import {  } from 'oh-router-react'
import { Navigate } from 'react-router-dom'

/**
 * TODO: 还需要处理
 * handle redireact component
 * @param params
 * @returns
 */
const redireactUtil = (params: any) => {
  const { redireactPath, replace } = params
  return <Navigate to={redireactPath} replace={replace} />
}

/**
 * handle router config transform to react-router-dome data structure type
 * @param routerConfig need transform router config
 * @returns transform router config, type of RouteItemType[]
 */
const getRouterItems = (routerConfig: RouterItemType[]): RouterItemType[] => {
  if (!routerConfig || routerConfig.length <= 0) {
    return []
  }
  let routeInfo: RouterItemType[] = []
  for (let index in routerConfig) {
    const { path, redirect, layout, element, component, meta, children } = routerConfig[index]
    const { key } = meta!

    // handle need redirect path
    if (redirect && redirect.length >= 1) {
      const redirectRoute: RouterItemType = {
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
        element,
        component
      })
      continue
    }

    // handle layout node page case
    if (layout) {
      let mainRouter: RouterItemType = {}
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
  return routeInfo
}

function deepLoopRouterChildren(
  children: RouterItemType[],
  rootKey: string,
  routerTable: RouterItemType[] = []
): RouterItemType[] {
  for (let index = 0; index < children.length; index++) {
    const { meta, path, element, component, children: childrenRoute } = children[index]
    const { key } = meta!

    const routerPath = rootKey + key
    // handle deep loop to end case
    if (!childrenRoute || childrenRoute.length <= 0) {
      routerTable.push({ path: routerPath, element, component })
      continue
    }
    // deep loop
    deepLoopRouterChildren(childrenRoute, routerPath, routerTable)
  }
  return routerTable
}

export { redireactUtil, getRouterItems, deepLoopRouterChildren }
