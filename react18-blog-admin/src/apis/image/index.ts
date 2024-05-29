import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultList, ResultPage } from '@/types/base/response'
import { PREFIX_URL_IMAGE_CATEGORY } from '@/config'
import {
  CreactImageCategoryReq,
  ImageCategoryApi,
  ImageCategoryPageReqParams,
  ImageCategoryReqParams,
  ImageCategoryVO,
  ImageInfoReqParams,
  ImageInfoVO
} from '@/types/apis/image/image'

const imageCategoryApi: ImageCategoryApi = {
  imageCategoryPageList(params: ImageCategoryPageReqParams) {
    return baseAxiosRequest.post<ResultPage<ImageCategoryVO>>(PREFIX_URL_IMAGE_CATEGORY + '/pageList', params)
  },
  imageCategoryList(params: ImageCategoryReqParams) {
    return baseAxiosRequest.post<ResultPage<ImageCategoryVO>>(PREFIX_URL_IMAGE_CATEGORY + '/list', params)
  },
  save(params: CreactImageCategoryReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_IMAGE_CATEGORY + '/save', params)
  },
  get(params: ImageInfoReqParams) {
    return baseAxiosRequest.get<Result<ImageInfoVO>>(PREFIX_URL_IMAGE_CATEGORY + '/get', params)
  }
}

export default imageCategoryApi
