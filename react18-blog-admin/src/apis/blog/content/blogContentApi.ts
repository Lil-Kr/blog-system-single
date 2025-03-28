import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_CONTENT } from '@/config'
import { BaseApi } from '@/types/apis'
import { LabelTableResq } from '@/types/apis/blog/labelType'
import { BaseEntityPageType } from '@/types/base'

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

/**
 * ==================== blog-content request ====================
 */
export interface BlogContentReq extends BaseEntityPageType {}

export interface BlogContentAddReq {
  title: string
  original: string
  recommend: string
  status: string
  categoryId: string
  labelIds: string[]
  topicId?: string
  imgUrl?: string
  contentText: string
}

export interface EditeBlogContentReq extends BaseEntityPageType {
  surrogateId: string
  number: string
  original: string
  recommend: string
  title: string
  categoryId: string
  categoryName: string
  labelIds: string[]
  topicId?: string
  imgUrl?: string
  topicName?: string
  contentText: string
}

export interface GetBlogContentReq {
  blogId: string
}

/**
 * ==================== blog content binding response ====================
 */
export interface BlogContentTableType {
  key: string
  title: string
  introduction: string
  original: string
  recommend: string
  categoryId: string
  topicId: string
  status: string // 发布状态
  remark: string
  publishTime: string
  contentText?: string
  categoryName: string
  categoryColor: string
  topicName: string
  blogLabelList: LabelTableResq[]
  originalType: number
  recommendType: number
  statusType: number
}

/** ==================== mapping back-end data ====================  */

export interface BlogContentResq {
  id: string
  surrogateId: string
  number: string
  title: string
  introduction: string
  original: string
  recommend: string
  categoryId: string
  topicId: string
  status: string // 发布状态
  remark: string
  publishTime: string
  contentText?: string
  categoryName: string
  categoryColor: string
  topicName: string
  blogLabelList: LabelTableResq[]
  originalType: number
  recommendType: number
  statusType: number
}

/**
 * blog label request API type
 */
export interface BlogContentApi extends BaseApi {
  getBlogContentPageList(params: BlogContentReq): Promise<ResultPage<BlogContentResq>>
  getContent(params: GetBlogContentReq): Promise<Result<BlogContent>>
  add(params: BlogContentAddReq): Promise<Result<string>>
  edit(params: EditeBlogContentReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

const blogContentApi: BlogContentApi = {
  getBlogContentPageList(req: BlogContentReq) {
    return baseAxiosRequest.post<ResultPage<BlogContentResq>>(PREFIX_URL_BLOG_CONTENT + '/pageList', req)
  },
  add(params: BlogContentAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/add', params)
  },
  edit(params: EditeBlogContentReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/edit', params)
  },
  getContent(params: GetBlogContentReq) {
    return baseAxiosRequest.get<Result<BlogContent>>(PREFIX_URL_BLOG_CONTENT + `/getContent/${params.blogId}`, params)
  }
}

export default blogContentApi
