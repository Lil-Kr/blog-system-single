/**
 * definition breadcrumb type
 */
export interface BreadcrumbState {
  breadcrumbMap?: Map<string, BreadcrumbType[]>
  breadcrumbList?: any[]
}

export interface BreadcrumbType {
  title: string
}
