import { BlogContentVO, CardBlogItemProps } from '@/types/apis/blog/blogTypes'
import { transformToDay } from '../date/dateTimeUtil'
import { getFontRandomColorClass } from '../colors'

const mappingContent = (data: BlogContentVO): CardBlogItemProps => {
  const cardBlogItem: CardBlogItemProps = {
    ...data,
    publishTime: transformToDay(data.publishTime),
    updateTime: transformToDay(data.updateTime),
    tags: data.labels?.map(({ surrogateId, name }) => ({
      key: surrogateId,
      text: name,
      url: '',
      textColor: getFontRandomColorClass()
    }))
  }
  return cardBlogItem
}

export { mappingContent }
