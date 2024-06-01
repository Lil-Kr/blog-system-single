import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_TOPIC } from '@/config'
import {
  BlogTopicApi,
  BlogTopicPageReqParams,
  BlogTopicReqParams,
  BlogTopicVO,
  CreateTopicReq,
  DelTopicReq,
  EditTopicReq
} from '@/types/apis/blog/topic'

const blogTopicApi: BlogTopicApi = {
  getTopicPageList(params: BlogTopicPageReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogTopicVO>>(PREFIX_URL_BLOG_TOPIC + '/pageTopicList', params)
  },
  getTopicList(params: BlogTopicReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogTopicVO>>(PREFIX_URL_BLOG_TOPIC + '/list', params)
  },
  save(params: CreateTopicReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TOPIC + '/save', params)
  },
  edit(params: EditTopicReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TOPIC + '/edit', params)
  },
  delete(params: DelTopicReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_TOPIC + '/delete', params)
  }
}

export default blogTopicApi
