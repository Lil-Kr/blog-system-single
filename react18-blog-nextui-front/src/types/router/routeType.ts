
import { EventEmitter, RouteMeta, RouteObject } from 'oh-router-shared'

// interface FunctionalImportType {
//   (): any
// }

// interface MetaType {
//   key: string
//   title?: string
//   icon?: any
//   requiresAuth?: boolean
// }

// interface RouteItemType extends RouteObject {
//   redirect?: string
//   layout?: React.ReactNode
//   component?: FunctionalImportType
//   meta?: MetaType
//   children?: RouteItemType[]
// }

/**
 * oh-router
 */
interface RouterMetaType extends RouteMeta {
  key: string
  title: string // 主框架页面 为空
  icon?: any
  layout?: boolean
}

interface RouterItemType extends RouteObject {
  meta?: RouterMetaType
  children?: RouterItemType[] | []
}

// interface OhRouterObject extends RouterOptions {
//   routes: OhRouterItemType[]
// }

export type { RouterMetaType, RouterItemType }
