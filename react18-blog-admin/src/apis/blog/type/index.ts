import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { CreateLabelReq, EditLabelReq, DelLabelReq, LabelVO, LabelApi } from '@/types/apis/blog/label'
import { PREFIX_URL_BLOG_TYPE } from '@/config'
import {
  BlogTypeApi,
  BlogTypeReqParams,
  BlogTypeVO,
  CreateTypeReq,
  EditTypeReq,
  DelTypeReq
} from '@/types/apis/blog/type'

const blogTypeApi: BlogTypeApi = {
  getTypePageList(params: BlogTypeReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogTypeVO>>(PREFIX_URL_BLOG_TYPE + '/pageTypeList', params)
  },
  save(params: CreateTypeReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TYPE + '/save', params)
  },
  edit(params: EditTypeReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TYPE + '/edit', params)
  },
  delete(params: DelTypeReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_TYPE + '/delete', params)
  }
}

export default blogTypeApi
