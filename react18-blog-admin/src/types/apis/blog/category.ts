import { BaseEntityPageType, BaseEntityRequiredType, BaseEntityType, BasePageReq } from '@/types/base'
import { BaseApi } from '..'
import { Result, ResultPage } from '@/types/base/response'

/**
 * blog => label entity
 */
export interface BlogCategory extends BaseEntityRequiredType {
  id: number
  surrogateId: string
  number: string
  name: string
  color: string
  remark: string
}

/** ==================== blog type request ====================  */
export interface BlogCategoryReq {
  keyWords?: string
}

export interface BlogCategoryPageReq extends BaseEntityPageType {}

export interface CreateCategoryReq {
  number: string
  name: string
  color?: string
  remark: string
}

export interface EditCategoryReq {
  surrogateId: string
  number: string
  name: string
  color?: string
  remark: string
}

export interface DelCategoryReq {
  surrogateId: string
}

/** ==================== blog type response ====================  */
export interface CategoryTableType {
  key: string
  number: string
  name: string
  color: string
  remark: string
}

/** ==================== mapping back-end data ====================  */

export interface BlogCategoryVO extends BlogCategory {}

/**
 * blog label request API type
 */
export interface BlogCategoryApi extends BaseApi {
  getCategoryPageList(params: BlogCategoryPageReq): Promise<ResultPage<BlogCategoryVO>>
  retrieveCategoryList(req: BlogCategoryReq): Promise<ResultPage<BlogCategoryVO>>
  add(params: CreateCategoryReq): Promise<Result<string>>
  edit(params: EditCategoryReq): Promise<Result<string>>
  delete(params: DelCategoryReq): Promise<Result<string>>
}
