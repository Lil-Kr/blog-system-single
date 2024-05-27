import { BaseApi } from '@/types/apis'
import { BaseEntityPageType } from '@/types/base'
import { Result, ResultPage } from '@/types/base/response'
import { BlogContentType } from '@/types/entity/blog/content'

/**
 * blog label request API type
 */
export interface BlogContentApi extends BaseApi {
  getBlogContentPageList(params: BlogContentReqParams): Promise<ResultPage<BlogContentVO>>
  save(params: CreateBlogContentReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/**
 * ==================== blog-content request ====================
 */
export interface BlogContentReqParams extends BaseEntityPageType {
  keyWords?: string | number
}

export interface CreateBlogContentReq extends BaseEntityPageType {
  number: string
  original: string
  recommend: string
  title: string
  categoryId: string
  categoryName: string
  labelIds: string[]
  topicId?: string
  topicName?: string
  contentText: string
}

/**
 * ==================== blog content binding response ====================
 */
export interface BlogContentDTO {
  key?: string
  title: string
  original: string
  recommend: string
  labelNames: string[]
  categoryName: string
  remark: string
  status: string
  publishTime: string
}

/** ==================== mapping back-end data ====================  */
export interface BlogContentVO extends BlogContentType {
  labelNames: string[]
  categoryName: string
  contentText: string
}
