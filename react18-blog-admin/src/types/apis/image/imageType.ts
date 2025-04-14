import { PageData, Result, ResultPage } from '@/types/base/response'
import { BaseApi } from '..'
import { BaseEntityPageType, BaseEntityType } from '@/types/base'
import { ImageInfoVO } from '@/apis/image/imageInfoApi'

/**
 * image category entity
 */
export interface ImageCategory extends BaseEntityType {
  surrogateId: string
  name: string
  imageUrl: string
  status: number
  remark: string
}

/**
 * image category request API type
 */
export interface ImageCategoryPageReq extends BaseEntityPageType {
  imageCategoryId?: string
}

export interface ImageCategoryReq {
  keyWords?: string
}

export interface ImageCategoryAddReq {
  name: string
  imageUrl?: string
  remark: string
}

export interface ImageCategoryEditReq {
  surrogateId: string
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
export interface ImageCategoryTableType {
  key: string
  name: string
  imageUrl: string
  status: number
  createTime: string
  updateTime: string
  remark: string
}

/** ==================== mapping back-end data ====================  */
export interface ImageCategoryVO extends ImageCategory {
  imageInfo?: PageData<ImageInfoVO>
}

export interface ImageCategoryApi extends BaseApi {
  pageImageCategoryList(req: ImageCategoryPageReq): Promise<ResultPage<ImageCategoryVO>>
  imageCategoryList(req: ImageCategoryReq): Promise<ResultPage<ImageCategoryVO>>
  nameList(req: ImageCategoryReq): Promise<Result<ImageCategoryVO[]>>
  add(req: ImageCategoryAddReq): Promise<Result<string>>
  get(req: GetImageCategoryReq): Promise<Result<ImageCategoryVO>>
  edit(req: ImageCategoryEditReq): Promise<Result<string>>
  delete(req: DelImageCategoryReq): Promise<Result<string>>
}
