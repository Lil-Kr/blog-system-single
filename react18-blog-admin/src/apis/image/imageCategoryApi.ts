import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_IMAGE_CATEGORY } from '@/config'
import {
  ImageCategoryAddReq,
  GetImageCategoryReq,
  ImageCategoryApi,
  ImageCategoryPageReq,
  ImageCategoryReq,
  ImageCategoryVO,
  DelImageCategoryReq,
  ImageCategoryEditReq
} from '@/types/apis/image/imageType'

const imageCategoryApi: ImageCategoryApi = {
  pageImageCategoryList(req: ImageCategoryPageReq) {
    return baseAxiosRequest.post<ResultPage<ImageCategoryVO>>(PREFIX_URL_IMAGE_CATEGORY + '/pageList', req)
  },
  imageCategoryList(req: ImageCategoryReq) {
    return baseAxiosRequest.post<ResultPage<ImageCategoryVO>>(PREFIX_URL_IMAGE_CATEGORY + '/list', req)
  },
  nameList(req: ImageCategoryReq) {
    return baseAxiosRequest.post<Result<ImageCategoryVO[]>>(PREFIX_URL_IMAGE_CATEGORY + '/nameList', req)
  },
  get(req: GetImageCategoryReq) {
    return baseAxiosRequest.get<Result<ImageCategoryVO>>(PREFIX_URL_IMAGE_CATEGORY + '/get', req)
  },
  add(req: ImageCategoryAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_IMAGE_CATEGORY + '/add', req)
  },
  edit(req: ImageCategoryEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_IMAGE_CATEGORY + '/edit', req)
  },
  delete(req: DelImageCategoryReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_IMAGE_CATEGORY + '/delete', req)
  }
}

export default imageCategoryApi
