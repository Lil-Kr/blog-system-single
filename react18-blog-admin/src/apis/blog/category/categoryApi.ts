import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_CATEGORY } from '@/config'
import {
  BlogCategoryApi,
  BlogCategoryReq,
  BlogCategoryVO,
  CreateCategoryReq,
  EditCategoryReq,
  DelCategoryReq,
  BlogCategoryPageReq
} from '@/types/apis/blog/category'

const blogCategoryApi: BlogCategoryApi = {
  getCategoryPageList(req: BlogCategoryPageReq) {
    return baseAxiosRequest.post<ResultPage<BlogCategoryVO>>(PREFIX_URL_BLOG_CATEGORY + '/pageCategoryList', req)
  },
  getCategoryList(req: BlogCategoryReq) {
    return baseAxiosRequest.post<ResultPage<BlogCategoryVO>>(PREFIX_URL_BLOG_CATEGORY + '/list', req)
  },
  add(req: CreateCategoryReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/add', req)
  },
  edit(req: EditCategoryReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/edit', req)
  },
  delete(params: DelCategoryReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/delete', params)
  }
}

export default blogCategoryApi
