import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultList, ResultPage } from '@/types/base/response'
import { PREFIX_URL_IMAGE_CATEGORY } from '@/config'
import {
  CreactImageCategoryReq,
  ImageCategoryApi,
  ImageCategoryPageReqParams,
  ImageCategoryReqParams,
  ImageCategoryVO,
  ImageInfoVO
} from '@/types/apis/image/image'
import { BaseDelReq } from '@/types/base'

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
  delete(params: BaseDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_IMAGE_CATEGORY + '/delete', params)
  }
}

export default imageCategoryApi
