import { BaseEntityRequiredType } from '@/types/base'

/**
 * blog => content entity
 */
export interface BlogContentType extends BaseEntityRequiredType {
  id?: number
  surrogateId: string
  number: number | string
  recommend: number
  original: string
  title: string
  imgUrl: string
  paragraph: string
  publishTime: string
  categoryId: string
  labelIds: string
  topicId: string
  wordCount: string
}
