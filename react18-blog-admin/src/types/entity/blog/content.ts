import { BaseEntityRequiredType } from '@/types/base'

/**
 * blog => content entity
 */
export interface BlogContentType extends BaseEntityRequiredType {
  id?: number
  surrogateId: string
  number: string
  recommend: string
  original: string
  title: string
  introduction: string
  imgUrl: string
  paragraph: string
  publishTime: string
  categoryId: string
  labelIds: string
  topicId: string
  wordCount: string
}
