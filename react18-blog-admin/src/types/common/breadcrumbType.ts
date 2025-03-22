/**
 * definition breadcrumb type
 */
export interface BreadcrumbState {
  breadcrumbMap?: Map<string, BreadcrumbType[]>
  breadcrumbList?: string[]
}

export interface BreadcrumbType {
  title: string
}
