/**
 *
 */
export interface BaseEntityType {
  deleted?: number
  creatorId?: string
  modifierId?: string
  createTime?: string
  updateTime?: string
}

export interface BaseEntityRequiredType {
  deleted?: number
  creatorId: string
  modifierId: string
  createTime: string
  updateTime: string
}

/**
 * 分页请求
 */
export interface BasePageReq extends BaseEntityType {
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
