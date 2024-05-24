import { BaseApi } from '@/types/apis'
import { Result } from '@/types/base/response'

/**
 * blog label request API type
 */
export interface BlogContentApi extends BaseApi {
  save(params: CreateBlogContentReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/**
 * ==================== blog-content request ====================
 */

export interface CreateBlogContentReq {
  // number: string
  original: number
  recommend: number
  title: string
  categoryId: string
  labelIds: string[]
  topicId?: string
  contentText: string
}
