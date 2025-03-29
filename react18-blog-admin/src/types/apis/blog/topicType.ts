import { BaseEntityPageType, BaseEntityRequiredType, BaseEntityType, BasePageReq } from '@/types/base'
import { BaseApi } from '..'
import { Result, ResultPage } from '@/types/base/response'

export interface TopicType extends BaseEntityRequiredType {
  id: number
  surrogateId: string
  number: string
  name: string
  color: string
}

/** ==================== blog topic request ====================  */
export interface BlogTopicPageReq extends BaseEntityPageType {}

export interface BlogTopicReq extends BaseEntityType {
  keyWords?: string
}

/** ==================== blog topic response ====================  */
export interface TopiciTableType {
  key: string
  surrogateId: string
  number: string
  name: string
  color: string
  remark: string
  createTime: string
  updateTime: string
}

export interface CreateTopicReq {
  number: string
  name: string
  color: string
  remark: string
}

export interface EditTopicReq {
  surrogateId: string
  number: string
  name: string
  color: string
  remark: string
}

export interface DelTopicReq {
  surrogateId: string
}

/** ==================== mapping back-end data ====================  */
export interface BlogTopicVO extends TopicType {}

/**
 * blog label request API type
 */
export interface BlogTopicApi extends BaseApi {
  retrieveTopicPageList(params: BlogTopicPageReq): Promise<ResultPage<BlogTopicVO>>
  retrieveTopicList(params: BlogTopicReq): Promise<ResultPage<BlogTopicVO>>
  add(params: CreateTopicReq): Promise<Result<string>>
  edit(params: EditTopicReq): Promise<Result<string>>
  delete(params: DelTopicReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}
