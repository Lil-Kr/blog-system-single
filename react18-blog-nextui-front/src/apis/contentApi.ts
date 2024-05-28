import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_BLOG_CONTENT, PREFIX_URL_BLOG_LABEL } from '@/config'
import { Result, ResultPage } from '@/types/base/response'
import { BasePageReq } from '@/types/base'

export interface BlogContentApi {
  frontContentRecentList(): Promise<Result<BlogContentVO[]>>
  frontContentPageList(params: BlogContentReqParams): Promise<ResultPage<BlogContentVO>>
  // save(params: CreateLabelReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

export interface BlogContentReqParams extends BasePageReq {
  keyWords?: string | number
}

export interface BlogContentVO {
  id: string
  surrogateId: string
  number: string
  title: string
  original: number
  recommend: number
  imgUrl: string
  labelIds: string[]
  labelNames: string[]
  publishTime: string
}

const blogContentApi: BlogContentApi = {
  frontContentRecentList() {
    return baseAxiosRequest.get<Result<BlogContentVO[]>>(PREFIX_URL_BLOG_CONTENT + '/frontContentList')
  },
  frontContentPageList(params: BlogContentReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogContentVO>>(PREFIX_URL_BLOG_CONTENT + '/frontContentPageList', params)
  }
}

export default blogContentApi
