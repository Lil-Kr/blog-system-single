/**
 *
 */
export interface BaseEntityType {
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
  isOrder?: number
}

export interface BaseEntityRequiredType {
  status: number // 未使用
  remark: string
  deleted?: number // 未使用
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
  isOrder?: number
}

export interface BaseEntityPageType extends BasePageReq {
  status?: number
  remark?: string
  deleted?: number
  creatorId?: string
  operator?: string
  createTime?: string
  updateTime?: string
  isOrder?: number
  keyWords?: string
}

export interface BaseEntityRequiredPageType extends BasePageReq {
  status: number
  remark: string
  deleted?: number // 未使用
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
  isOrder?: number
}

export interface BaseDelReq {
  id?: string
  surrogateId: string
}

/**
 * 分页请求
 */
export interface BasePageReq {
  currentPageNum: number
  pageSize: number
}

/**
 *
 */
export interface BaseRequestBackEndType<T> {
  reqType: string | 'GET'
  reqUrl: string | '/logout'
  api: T
}

/**
 * 表格分页查询使用
 */
export interface TablePageInfoType {
  currentPageNum: number
  pageSize: number // 每页记录数
  totalSize: number // 总记录数
}
