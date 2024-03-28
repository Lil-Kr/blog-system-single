import { NonIndexRouteObject } from 'react-router-dom'
import { EventEmitter, RouteMeta, RouteObject } from 'oh-router-shared'
import { RouterOptions } from 'oh-router/dist/router'



interface FunctionalImportType {
  (): any
}

interface MetaType  {
  key: string
  title?: string
  icon?: any
  requiresAuth?: boolean
}

interface RouteItemType extends NonIndexRouteObject {
  redirect?: string
  layout?: React.ReactNode
  component?: FunctionalImportType
  meta?: MetaType
  children?: RouteItemType[]
}

/**
 * oh-router
 */
interface OhRouterMetaType extends RouteMeta {
  key: string
  title?: string // 主框架页面 为空
  icon?: any
  layout?: boolean
}

interface OhRouterItemType extends RouteObject {
  meta?: OhRouterMetaType
  children?:OhRouterItemType[]
}

interface OhRouterObject extends RouterOptions {
  routes: OhRouterItemType[]
}

export type { RouteItemType, FunctionalImportType, OhRouterItemType, OhRouterObject }