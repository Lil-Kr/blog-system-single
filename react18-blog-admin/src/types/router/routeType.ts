import { RouteMeta, RouteObject } from 'oh-router-shared'

/**
 * oh-router
 */
interface RouterMetaType extends RouteMeta {
  key?: string
  title?: string // 主框架页面 为空
  icon?: any
  layout?: boolean
}

interface RouterItemType extends RouteObject {
  meta?: RouterMetaType
  children?: RouterItemType[] | []
}

export type { RouterMetaType, RouterItemType }
