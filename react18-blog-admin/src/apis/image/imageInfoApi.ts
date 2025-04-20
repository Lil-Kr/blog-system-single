import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_IMAGE_INFO } from '@/config'
import { BaseApi } from '@/types/apis'
import { BaseEntityPageType, BaseEntityRequiredType } from '@/types/base'
import { AxiosRequestConfig } from 'axios'

/** ============== ImageInfo req params ===============  **/
export interface ImageInfoPageListReq extends BaseEntityPageType {
  imageCategoryId?: string
}

export interface ImageInfoListReq {
  imageCategoryId?: string
  keyWords?: string
}

export interface ImageInfoReq {
  surrogateId: string
}

export interface ImageInfoUploadReq {
  imageCategoryId: string
}

export interface ImageUploadReq {
  data: FormData
  config: AxiosRequestConfig
}

/** ==================== image info ====================  */
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
  imageCategoryName?: string
}

export interface ImageUploadResp {
  uid: string
  name: string
  status: string
  url: string
}

export interface ImageInfoDelReq {
  surrogateId: string
}

/**
 *
 */
export interface ImageInfoApi extends BaseApi {
  imageInfoPageList(req: ImageInfoPageListReq): Promise<ResultPage<ImageInfoVO>>
  imageInfoList(req?: ImageInfoListReq): Promise<ResultPage<ImageInfoVO>>
  get(req: ImageInfoReq): Promise<Result<ImageInfoVO>>
  imageUpload(req: ImageUploadReq): Promise<Result<ImageUploadResp>>
  delete(req: ImageInfoDelReq): Promise<Result<string>>
}

export const imageInfoApi: ImageInfoApi = {
  imageInfoPageList(req: ImageInfoPageListReq) {
    return baseAxiosRequest.post<ResultPage<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/pageList', req)
  },
  imageInfoList(req: ImageInfoListReq) {
    return baseAxiosRequest.post<ResultPage<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/list', req)
  },
  get(req: ImageInfoReq) {
    return baseAxiosRequest.get<Result<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/get', req)
  },
  delete(req: ImageInfoDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_IMAGE_INFO + `/delete/${req.surrogateId}`, {})
  },
  imageUpload(req: ImageUploadReq) {
    return baseAxiosRequest.postUpload<Result<ImageUploadResp>>(PREFIX_URL_IMAGE_INFO + '/upload', req.data, {
      ...req.config
    })
  }
}
