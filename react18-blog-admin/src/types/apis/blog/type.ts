import { BaseEntityPageType, BasePageReq } from '@/types/base'
import { BaseApi } from '..'
import { ResultPage } from '@/types/base/response'
import { BlogType } from '@/types/entity/blog/blogType'

/**
 * blog label request API type
 */
export interface BlogTypeApi extends BaseApi {
  getTypePageList(params: BlogTypeReqParams): Promise<ResultPage<BlogTypeVO>>
  // save(params: CreateLabelReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/** ==================== blog type request ====================  */
export interface BlogTypeReqParams extends BaseEntityPageType {
  keyWord?: string
}

/** ==================== blog type response ====================  */
export interface TypeDTO {
  key: string
  number: string | number
  name: string
  remark: string
}

/** ==================== mapping back-end data ====================  */
export interface BlogTypeVO extends BlogType {}
