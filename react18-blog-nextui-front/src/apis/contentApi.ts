import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_BLOG_CONTENT } from '@/config'
import { Result, ResultPage } from '@/types/base/response'
import { BlogContentApi, BlogContentGetReq, BlogContentReq, BlogContentVO } from '@/types/apis/blog/blogTypes'

export const blogContentApi: BlogContentApi = {
  frontContentRecentList() {
    return baseAxiosRequest.get<Result<BlogContentVO[]>>(PREFIX_URL_BLOG_CONTENT + '/frontContentList')
  },
  frontContentPageList(req: BlogContentReq) {
    return baseAxiosRequest.post<ResultPage<BlogContentVO>>(PREFIX_URL_BLOG_CONTENT + '/frontContentPageList', req)
  },
  frontGetBlog(req: BlogContentGetReq) {
    return baseAxiosRequest.get<Result<BlogContentVO>>(PREFIX_URL_BLOG_CONTENT + '/frontGetBlog', req)
  }
}
