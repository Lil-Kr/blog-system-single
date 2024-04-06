import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { CreateLabelReq, EditLabelReq, DelLabelReq, LabelVO, LabelApi } from '@/types/apis/blog/label'
import { PREFIX_URL_BLOG_TYPE } from '@/config'
import { BlogTypeApi, BlogTypeReqParams, BlogTypeVO } from '@/types/apis/blog/type'

const blogTypeApi: BlogTypeApi = {
  getTypePageList(params: BlogTypeReqParams) {
    console.log('--> blogTypeApi', { ...params })
    return baseAxiosRequest.post<ResultPage<BlogTypeVO>>(PREFIX_URL_BLOG_TYPE + '/pageTypeList', params)
  },
  save(params: CreateLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TYPE + '/save', params)
  },
  edit(params: EditLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TYPE + '/edit', params)
  },
  delete(params: DelLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TYPE + '/delete', params)
  },
  deleteBatch(params: DelLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TYPE + '/deleteBatch', params)
  }
}

export default blogTypeApi
