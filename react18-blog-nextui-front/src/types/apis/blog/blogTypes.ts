import { BasePageReq } from '@/types/base'
import { Result, ResultPage } from '@/types/base/response'
import { LinkBaseType } from '@/types/components/LinkType'

export interface BlogContentReq extends BasePageReq {
  keyWords?: string
}

export interface BlogContentGetReq {
  surrogateId: string
}

interface PostAndNext {
  surrogateId: string
  title: string
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
  prev: PostAndNext
  next: PostAndNext
}

export interface CardBlogItemProps {
  surrogateId: string
  title: string
  original: number
  recommend: number
  introduction: string
  publishTime: string
  updateTime: string
  contentText: string
  paragraph: string
  tags: LinkBaseType[]
  prev: PostAndNext
  next: PostAndNext
}

export interface BlogContentApi {
  frontContentRecentList(): Promise<Result<BlogContentVO[]>>
  frontContentPageList(req: BlogContentReq): Promise<ResultPage<BlogContentVO>>
  frontGetBlog(req: BlogContentGetReq): Promise<Result<BlogContentVO>>
}
