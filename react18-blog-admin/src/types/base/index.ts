/**
 *
 */
export interface BaseEntityType {
  deleted?: number | 0
  status?: number // 未使用
  remark?: string
  creatorId?: string | ''
  modifierId?: string | ''
  createTime?: string | ''
  updateTime?: string | ''
  isOrder?: number
}

export interface BaseEntityRequiredType {
  status: number // 未使用
  remark: string
  deleted?: number // 未使用
  creatorId: string
  modifierId: string
  createTime: string
  updateTime: string
  isOrder?: number
}

export interface BaseEntityPageType extends BasePageReq {
  status?: number
  remark?: string
  deleted?: number
  creatorId?: string
  modifierId?: string
  createTime?: string
  updateTime?: string
  isOrder?: number
}

export interface BaseEntityRequiredPageType extends BasePageReq {
  status: number
  remark: string
  deleted?: number // 未使用
  creatorId: string
  modifierId: string
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
