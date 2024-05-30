import { Result, ResultList, ResultPage } from '@/types/base/response'
import { BaseApi } from '..'
import { BaseDelReq, BaseEntityPageType, BaseEntityRequiredType, BaseEntityType } from '@/types/base'

export interface ImageCategoryApi extends BaseApi {
  imageCategoryPageList(params: ImageCategoryPageReqParams): Promise<ResultPage<ImageCategoryVO>>
  imageCategoryList(params: ImageCategoryReqParams): Promise<ResultList<ImageCategoryVO>>
  save(params: CreactImageCategoryReq): Promise<Result<string>>
  // get(params: ImageInfoReqParams): Promise<Result<ImageInfoVO>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  delete(params: BaseDelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/**
 * image category entity
 */
export interface ImageCategoryType extends BaseEntityRequiredType {
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
export interface ImageCategoryVO extends ImageCategoryType {}

/** ==================== image info  ====================  */
export interface ImageInfoType extends BaseEntityRequiredType {
  id: string
  surrogateId: string
  imageCategoryId: string
  number: string
  name: string
  imageOriginalName: string
  imageType: string
  imageUrl: string
  imageBase64: string
}

export interface ImageInfoVO extends ImageInfoType {
  imageCategoryName: string
}
