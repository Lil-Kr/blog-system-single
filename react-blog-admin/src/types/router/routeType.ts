import { NonIndexRouteObject, RouteObject } from 'react-router-dom'


interface FunctionalImportType {
  (): any
}

interface MetaType {
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

export type { RouteItemType, FunctionalImportType }