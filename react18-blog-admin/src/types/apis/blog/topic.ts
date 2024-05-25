import { BaseEntityPageType, BasePageReq } from '@/types/base'
import { BaseApi } from '..'
import { Result, ResultPage } from '@/types/base/response'
import { TopicType } from '@/types/entity/blog/topicType'

/**
 * blog label request API type
 */
export interface BlogTopicApi extends BaseApi {
  getTopicPageList(params: BlogTopicReqParams): Promise<ResultPage<BlogTopicVO>>
  save(params: CreateTopicReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/** ==================== blog topic request ====================  */
export interface BlogTopicReqParams extends BaseEntityPageType {
  keyWords?: string | number
}

/** ==================== blog topic response ====================  */
export interface TopicDTO {
  key: string
  number: string | number
  name: string
  remark: string
}

export interface CreateTopicReq {
  number: string
  name: string
  remark: string
}

export interface EditTopicReq {
  surrogateId: string
  number: string
  name: string
  remark: string
}

export interface DelTopicReq {
  surrogateId: string
}

/** ==================== mapping back-end data ====================  */
export interface BlogTopicVO extends TopicType {}
