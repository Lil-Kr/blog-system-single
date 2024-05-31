import { PageData, Result, ResultPage } from '@/types/base/response'
import { BaseApi } from '..'
import { BaseDelReq, BaseEntityPageType, BaseEntityRequiredType, BaseEntityType } from '@/types/base'
import { ImageInfoVO } from '@/apis/image/imageInfo'

export interface ImageCategoryApi extends BaseApi {
  imageCategoryPageList(params: ImageCategoryPageReqParams): Promise<ResultPage<ImageCategoryVO>>
  imageCategoryList(params: ImageCategoryReqParams): Promise<ResultPage<ImageCategoryVO>>
  save(params: CreactImageCategoryReq): Promise<Result<string>>
  get(params: GetImageCategoryReq): Promise<Result<ImageCategoryVO>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  delete(params: BaseDelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/**
 * image category entity
 */
export interface ImageCategoryType extends BaseEntityType {
  id: string
  surrogateId: string
  number: string
  name: string
  imageUrl: string
}

/**
 * image category request API type
 */
export interface ImageCategoryPageReqParams extends BaseEntityPageType {
  imageCategoryId?: string
  keyWords?: string | number
}

export interface ImageCategoryReqParams extends BaseEntityType {
  keyWords?: string | number
}

export interface CreactImageCategoryReq {
  number: string
  name: string
  imageUrl?: string
  remark: string
}

export interface CreactImageCategoryReq {
  surrogateId: string
  number: string
  name: string
  imageUrl?: string
  remark: string
}

export interface GetImageCategoryReq {
  surrogateId: string
}

export interface DelImageCategoryReq {
  surrogateId: string
}

/**
 * ==================== image response ====================
 */
export interface ImageCategoryDTO {
  key: string
  number: string | number
  name: string
  imageUrl: string
  status: number
  createTime: string
  updateTime: string
  remark: string
}

/** ==================== mapping back-end data ====================  */
export interface ImageCategoryVO extends ImageCategoryType {
  imageInfo?: PageData<ImageInfoVO>
}
