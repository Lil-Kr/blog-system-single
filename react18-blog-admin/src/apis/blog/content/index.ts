import { baseAxiosRequest } from '@/utils/http/request'
import { LabelType } from '@/types/entity/blog/labelType'
import { Result, ResultPage } from '@/types/base/response'
import {
  BlogContentApi,
  BlogContentReqParams,
  BlogContentVO,
  CreateBlogContentReq
} from '@/types/apis/blog/blogContent'
import { PREFIX_URL_BLOG_CONTENT } from '@/config'

const blogContentApi: BlogContentApi = {
  getBlogContentPageList(params: BlogContentReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogContentVO>>(PREFIX_URL_BLOG_CONTENT + '/pageContentList', params)
  },
  save(params: CreateBlogContentReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/save', params)
  }
  // edit(params: EditLabelReq) {
  //   return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/edit', params)
  // },
  // delete(params: DelLabelReq) {
  //   return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/delete', params)
  // },
  // deleteBatch(params: DelLabelReq) {
  //   return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/deleteBatch', params)
  // }
}

export default blogContentApi
