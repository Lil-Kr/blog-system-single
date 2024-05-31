import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_IMAGE_CATEGORY, PREFIX_URL_IMAGE_INFO } from '@/config'
import { BaseApi } from '@/types/apis'
import { BaseEntityPageType, BaseEntityRequiredType } from '@/types/base'
import { AxiosRequestConfig } from 'axios'

export interface ImageInfoApi extends BaseApi {
  imageInfoPageList(params: ImageInfoPageListReqParams): Promise<ResultPage<ImageInfoVO>>
  imageInfoList(params?: ImageInfoListReqParams): Promise<ResultPage<ImageInfoVO>>
  get(params: ImageInfoReqParams): Promise<Result<ImageInfoVO>>
  // iamgeUpload(params: ImageUploadReqParams): Promise<Result<ImageInfoVO>>
  imageUpload(params: ImageUploadReqParams): Promise<Result<ImageUploadResp>>
}

const imageInfoApi: ImageInfoApi = {
  imageInfoPageList(params: ImageInfoPageListReqParams) {
    return baseAxiosRequest.post<ResultPage<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/pageList', params)
  },
  imageInfoList(params: ImageInfoListReqParams) {
    return baseAxiosRequest.post<ResultPage<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/list', params)
  },
  get(params: ImageInfoReqParams) {
    return baseAxiosRequest.get<Result<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/get', params)
  },
  imageUpload(params: ImageUploadReqParams) {
    return baseAxiosRequest.postUpload<Result<ImageUploadResp>>(
      PREFIX_URL_IMAGE_INFO + '/upload',
      params.formData,
      params.config
    )
  }
}

export default imageInfoApi

/** ============== ImageInfo req params ===============  **/
export interface ImageInfoPageListReqParams extends BaseEntityPageType {
  imageCategoryId?: string
}

export interface ImageInfoListReqParams {
  imageCategoryId?: string
  keyWords?: string
}

export interface ImageInfoReqParams {
  surrogateId: string
}

export interface ImageInfoUploadParams {
  imageCategoryId: string
}

export interface ImageUploadReqParams {
  formData: FormData
  config?: AxiosRequestConfig
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
