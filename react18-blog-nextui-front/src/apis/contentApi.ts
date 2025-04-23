import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_BLOG_CONTENT } from '@/config'
import { Result, ResultPage } from '@/types/base/response'
import { BasePageReq } from '@/types/base'

export interface BlogContentApi {
  frontContentRecentList(): Promise<Result<BlogContentVO[]>>
  frontContentPageList(req: BlogContentReq): Promise<ResultPage<BlogContentVO>>
  frontGetBlog(req: BlogContentGetReq): Promise<Result<BlogContentVO>>
  // save(params: CreateLabelReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

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

export interface BlogContentReq extends BasePageReq {
  keyWords?: string
}

export interface BlogContentGetReq {
  surrogateId: string
}

export interface BlogContentVO {
  id: string
  surrogateId: string
  number: string
  title: string
  original: number
  recommend: number
  imgUrl: string
  paragraph: string
  introduction: string
  labels: {
    surrogateId: string
    name: string
  }[]
  publishTime: string
  updateTime: string
  contentText: string
  category: {
    surrogateId: string
    name: string
  }
  topic?: {
    surrogateId: string
    name: string
  }
}
