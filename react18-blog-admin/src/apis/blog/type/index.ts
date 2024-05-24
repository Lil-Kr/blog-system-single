import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { CreateLabelReq, EditLabelReq, DelLabelReq, LabelVO, LabelApi } from '@/types/apis/blog/label'
import { PREFIX_URL_BLOG_CATEGORY } from '@/config'
import {
  BlogCategoryApi,
  BlogTypeReqParams,
  BlogCategoryVO,
  CreateTypeReq,
  EditTypeReq,
  DelTypeReq
} from '@/types/apis/blog/category'

const blogTypeApi: BlogCategoryApi = {
  getTypePageList(params: BlogTypeReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogCategoryVO>>(PREFIX_URL_BLOG_CATEGORY + '/pageCategoryList', params)
  },
  save(params: CreateTypeReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/save', params)
  },
  edit(params: EditTypeReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/edit', params)
  },
  delete(params: DelTypeReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/delete', params)
  }
}

export default blogTypeApi
