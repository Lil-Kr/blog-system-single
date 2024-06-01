import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_CATEGORY } from '@/config'
import {
  BlogCategoryApi,
  BlogCategoryReqParams,
  BlogCategoryVO,
  CreateCategoryReq,
  EditCategoryReq,
  DelCategoryReq,
  BlogCategoryPageReqParams
} from '@/types/apis/blog/category'

const blogCategoryApi: BlogCategoryApi = {
  getCategoryPageList(params: BlogCategoryPageReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogCategoryVO>>(PREFIX_URL_BLOG_CATEGORY + '/pageCategoryList', params)
  },
  getCategoryList(params: BlogCategoryReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogCategoryVO>>(PREFIX_URL_BLOG_CATEGORY + '/list', params)
  },
  save(params: CreateCategoryReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/save', params)
  },
  edit(params: EditCategoryReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/edit', params)
  },
  delete(params: DelCategoryReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/delete', params)
  }
}

export default blogCategoryApi
