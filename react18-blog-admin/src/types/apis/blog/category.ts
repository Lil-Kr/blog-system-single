import { BaseEntityPageType, BasePageReq } from '@/types/base'
import { BaseApi } from '..'
import { ResultPage } from '@/types/base/response'
import { BlogCategoryType } from '@/types/entity/blog/categoryType'

/**
 * blog label request API type
 */
export interface BlogCategoryApi extends BaseApi {
  getCategoryPageList(params: BlogCategoryReqParams): Promise<ResultPage<BlogCategoryVO>>
  // save(params: CreateLabelReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/** ==================== blog type request ====================  */
export interface BlogCategoryReqParams extends BaseEntityPageType {
  keyWords?: string | number
}

export interface CreateCategoryReq {
  number: string
  name: string
  remark: string
}

export interface EditCategoryReq {
  surrogateId: string
  number: string
  name: string
  remark: string
}

export interface DelCategoryReq {
  surrogateId: string
}

/** ==================== blog type response ====================  */
export interface CategoryDTO {
  key: string
  number: string | number
  name: string
  remark: string
}

/** ==================== mapping back-end data ====================  */
export interface BlogCategoryVO extends BlogCategoryType {}
