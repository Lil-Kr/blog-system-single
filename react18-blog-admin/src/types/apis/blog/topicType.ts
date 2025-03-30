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

export interface BlogTopicListReq {
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
  retrieveTopicPageList(req: BlogTopicPageReq): Promise<ResultPage<BlogTopicVO>>
  retrieveTopicList(req: BlogTopicListReq): Promise<ResultPage<BlogTopicVO>>
  add(req: CreateTopicReq): Promise<Result<string>>
  edit(req: EditTopicReq): Promise<Result<string>>
  delete(req: DelTopicReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}
