import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultList, ResultPage } from '@/types/base/response'
import { PREFIX_URL_IMAGE_CATEGORY, PREFIX_URL_IMAGE_INFO } from '@/config'
import { ImageCategoryVO, ImageInfoVO } from '@/types/apis/image/image'
import { BaseApi } from '@/types/apis'
import { BaseEntityPageType } from '@/types/base'

export interface ImageInfoApi extends BaseApi {
  imageInfoPageList(params: ImageInfoPageReqParams): Promise<ResultPage<ImageInfoVO>>
  get(params: ImageInfoReqParams): Promise<Result<ImageInfoVO>>
  // iamgeUpload(params: ImageUploadReqParams): Promise<Result<ImageInfoVO>>
  imageUpload(params: ImageUploadReqParams): Promise<any>
}

const imageInfoApi: ImageInfoApi = {
  imageInfoPageList(params: ImageInfoPageReqParams) {
    return baseAxiosRequest.post<ResultPage<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/pageList', params)
  },
  get(params: ImageInfoReqParams) {
    return baseAxiosRequest.get<Result<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/get', params)
  },
  imageUpload(params: ImageUploadReqParams) {
    return baseAxiosRequest.postUpload<any>(
      PREFIX_URL_IMAGE_INFO + '/upload',
      params.formData,
      params.config
    )
  }
}

export default imageInfoApi

/** ============== ImageInfo req params ===============  **/
export interface ImageInfoPageReqParams extends BaseEntityPageType {
  imageCategoryId?: string
}
export interface ImageInfoReqParams {
  surrogateId: string
}

export interface ImageInfoUploadParams {
  imageCategoryId: string
}

export interface ImageUploadReqParams {
  formData: FormData
  config: object
}
