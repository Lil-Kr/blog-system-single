import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_TOPIC } from '@/config'
import {
  BlogTopicApi,
  BlogTopicPageReq,
  BlogTopicListReq,
  BlogTopicVO,
  CreateTopicReq,
  DelTopicReq,
  EditTopicReq
} from '@/types/apis/blog/topicType'

const blogTopicApi: BlogTopicApi = {
  retrieveTopicPageList(req: BlogTopicPageReq) {
    return baseAxiosRequest.post<ResultPage<BlogTopicVO>>(PREFIX_URL_BLOG_TOPIC + '/pageList', req)
  },
  retrieveTopicList(req: BlogTopicListReq) {
    return baseAxiosRequest.post<ResultPage<BlogTopicVO>>(PREFIX_URL_BLOG_TOPIC + '/list', req)
  },
  add(req: CreateTopicReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TOPIC + '/add', req)
  },
  edit(req: EditTopicReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_TOPIC + '/edit', req)
  },
  delete(req: DelTopicReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_TOPIC + '/delete', req)
  }
}

export default blogTopicApi
