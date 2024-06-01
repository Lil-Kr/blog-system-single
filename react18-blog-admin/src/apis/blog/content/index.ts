import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_CONTENT } from '@/config'
import { BaseApi } from '@/types/apis'
import { BlogContentType } from '@/types/entity/blog/content'
import { LabelMapped, LabelVO } from '@/types/apis/blog/label'
import { BlogCategoryVO } from '@/types/apis/blog/category'
import { BaseEntityPageType } from '@/types/base'
import { BlogTopicVO } from '@/types/apis/blog/topic'
/**
 * blog label request API type
 */
export interface BlogContentApi extends BaseApi {
  getBlogContentPageList(params: BlogContentReqParams): Promise<ResultPage<BlogContentVO>>
  save(params: CreateBlogContentReq): Promise<Result<string>>
  getContent(params: GetBlogContentReq): Promise<Result<BlogContent>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

const blogContentApi: BlogContentApi = {
  getBlogContentPageList(params: BlogContentReqParams) {
    return baseAxiosRequest.post<ResultPage<BlogContentVO>>(PREFIX_URL_BLOG_CONTENT + '/pageList', params)
  },
  save(params: CreateBlogContentReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_CONTENT + '/save', params)
  },
  getContent(params: GetBlogContentReq) {
    return baseAxiosRequest.get<Result<BlogContent>>(PREFIX_URL_BLOG_CONTENT + `/getContent/${params.blogId}`, params)
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

/**
 * ==================== blog-content request ====================
 */
export interface BlogContentReqParams extends BaseEntityPageType {
  keyWords?: string | number
}

export interface CreateBlogContentReq extends BaseEntityPageType {
  number: string
  original: string
  recommend: string
  title: string
  categoryId: string
  categoryName: string
  labelIds: string[]
  topicId?: string
  topicName?: string
  contentText: string
}

export interface GetBlogContentReq {
  blogId: string
}

/**
 * ==================== blog content binding response ====================
 */
export interface BlogContentDTO {
  key: string
  title: string
  original: number
  recommend: number
  categoryName: string
  topicName: string
  introduction: string
  remark: string
  status: number
  publishTime: string
  blogLabelList: LabelVO[]
  contentText?: string
}

export interface MappedBlogContentDTO extends Omit<BlogContentDTO, 'blogLabelList'> {
  blogLabelList: LabelMapped[]
}

/** ==================== mapping back-end data ====================  */
export interface BlogContentVO extends BlogContentType {
  labelNames: string[]
  contentText: string
  blogLabelList: LabelVO[]
  blogCategoryVO: BlogCategoryVO
  blogTopicVO: BlogTopicVO
}

export interface BlogContent {
  surrogateId: string
  contentText: string
}
