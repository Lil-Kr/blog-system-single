/**
 *
 */
export interface BaseEntityType {
  deleted?: number | 0
  creatorId?: string | ''
  modifierId?: string | ''
  createTime?: string | ''
  updateTime?: string | ''
}

export interface BaseEntityRequiredType {
  deleted?: number
  creatorId: string
  modifierId: string
  createTime: string
  updateTime: string
}

export interface BaseEntityPageType extends BasePageReq {
  deleted?: number | 0
  creatorId?: string | ''
  modifierId?: string | ''
  createTime?: string | ''
  updateTime?: string | ''
}

export interface BaseEntityRequiredPageType extends BasePageReq {
  deleted?: number
  creatorId: string
  modifierId: string
  createTime: string
  updateTime: string
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
