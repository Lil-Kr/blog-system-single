import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_CONTENT } from '@/config'
import { BaseApi, OptionType } from '@/types/apis'
import { LabelTableResq } from '@/types/apis/blog/labelType'
import { BaseEntityPageType } from '@/types/base'
import { AxiosRequestConfig } from 'axios'

export interface BlogContent {
  id: string
  surrogateId: string
  number: string
  original: string
  recommend: string
  title: string
  introduction: string
  imgUrl: string
  paragraph: string
  contentText: string
  publishTime: string
  categoryId: string
  labelIds: string
  topicId: string
  status: string
  remark: string
  deleted: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
}

export interface BlogContentTableType {
  key: string
  title: string
  introduction: string
  imgUrl: string
  original: string
  recommend: string
  categoryId: string
  topicId: string
  status: number // 发布状态
  remark: string
  publishTime: string
  contentText?: string
  categoryName: string
  categoryColor: string
  topicName: string
  topicColor: string
  blogLabelList: LabelTableResq[]
  originalType: number
  recommendType: number
  statusType: number
  statusName: string
}

/**
 * ==================== blog-content request ====================
 */
export interface BlogContentReq extends BaseEntityPageType {}

export interface BlogContentAddReq {
  title: string
  introduction: string
  original: string
  recommend: string
  status: string
  categoryId: string
  labelIds: string[]
  topicId?: string
  imgUrl?: string
  paragraph?:string
  contentText: string
}

export interface BlogContentEditeReq {
  surrogateId: string
  title: string
  introduction: string
  original: string
  recommend: string
  status: string
  categoryId: string
  labelIds: string[]
  topicId?: string
  imgUrl?: string
  paragraph?:string
  contentText: string
}

export interface GetBlogContentReq {
  surrogateId: string
}

export interface BlogContentResq {
  surrogateId: string
  number: string
  title: string
  introduction: string
  imgUrl: string
  original: string
  recommend: string
  categoryId: string
  topicId: string
  status: number // 发布状态
  remark: string
  publishTime: string
  contentText?: string
  categoryName: string
  categoryColor: string
  topicName: string
  topicColor: string
  blogLabelList: LabelTableResq[]
  originalType: number
  recommendType: number
  statusType: number
  statusName: string
  createTime: string
  updateTime: string
}

interface BlogDelReq {
  surrogateId: string
}

interface BlogPublishReq {
  surrogateId: string
  status: string
}

interface BlogRichEditorImageReq {
  data: FormData
  config: AxiosRequestConfig
}

interface BlogRichEditorResp {
  url: string
}

/**
 * blog label request API type
 */
export interface BlogContentApi extends BaseApi {
  getBlogContentPageList(req: BlogContentReq): Promise<ResultPage<BlogContentResq>>
  getContent(req: GetBlogContentReq): Promise<Result<BlogContent>>
  add(req: BlogContentAddReq): Promise<Result<string>>
  edit(req: BlogContentEditeReq): Promise<Result<string>>
  delete(req: BlogDelReq): Promise<Result<string>>
  publish(req: BlogPublishReq): Promise<Result<string>>
  upload(req: BlogRichEditorImageReq): Promise<Result<BlogRichEditorResp>>
}

const blogContentApi: BlogContentApi = {
  getBlogContentPageList(req: BlogContentReq) {
    return baseAxiosRequest.post<ResultPage<BlogContentResq>>(PREFIX_URL_BLOG_CONTENT + '/pageList', req)
  },
  add(req: BlogContentAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/add', req)
  },
  edit(req: BlogContentEditeReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/edit', req)
  },
  getContent(req: GetBlogContentReq) {
    return baseAxiosRequest.get<Result<BlogContent>>(PREFIX_URL_BLOG_CONTENT + `/getContent/${req.surrogateId}`, {})
  },
  delete(req: BlogDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/delete', req)
  },
  publish(req: BlogPublishReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/publish', req)
  },
  upload(req: BlogRichEditorImageReq) {
    return baseAxiosRequest.postUpload<Result<BlogRichEditorResp>>(PREFIX_URL_BLOG_CONTENT + '/upload', req.data, {
      ...req.config
    })
  }
}

export default blogContentApi
