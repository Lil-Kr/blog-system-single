export interface Result<T = any> {
  code: number | string
  msg: string
  data: T
}

export interface ResultPage<T = any> {
  code: number | string
  msg: string
  data: PageResult<T>
}

export interface PageResult<T = any> {
  list: T[]
  total: number
}

export type PaginationType = {
  currentPageNum: number
  pageSize: number
  total: number
  totalPage: number
}
