import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultList, ResultPage } from '@/types/base/response'
import { PREFIX_URL_IMAGE_CATEGORY, PREFIX_URL_IMAGE_INFO } from '@/config'
import {
  CreactImageCategoryReq,
  ImageCategoryApi,
  ImageCategoryPageReqParams,
  ImageCategoryReqParams,
  ImageCategoryVO,
  ImageInfoReqParams,
  ImageInfoVO
} from '@/types/apis/image/image'
import { BaseApi } from '@/types/apis'

export interface ImageInfoApi extends BaseApi {
  // imageCategoryPageList(params: ImageCategoryPageReqParams): Promise<ResultPage<ImageCategoryVO>>
  // imageCategoryList(params: ImageCategoryReqParams): Promise<ResultList<ImageCategoryVO>>
  // save(params: CreactImageCategoryReq): Promise<Result<string>>
  get(params: ImageInfoReqParams): Promise<Result<ImageInfoVO>>
}

const imageInfoApi: ImageInfoApi = {
  get(params: ImageInfoReqParams) {
    return baseAxiosRequest.get<Result<ImageInfoVO>>(PREFIX_URL_IMAGE_INFO + '/get', params)
  }
}

export default imageInfoApi
