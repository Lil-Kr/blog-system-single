import { BlogContentTableType, BlogContentResq } from '@/apis/blog/content/blogContentApi'
import { OptionType } from '@/types/apis'
import { BlogCategoryVO } from '@/types/apis/blog/category'
import { BlogTopicVO } from '@/types/apis/blog/topicType'

const transformBlogToTable = (blogList: BlogContentResq[]): BlogContentTableType[] => {
  return blogList.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    ...rest
  }))
}

export { transformBlogToTable }

/**
 * 将分类列表转换为下拉选择器选项
 */
const transformCategoryToSelector = (list: BlogCategoryVO[]): OptionType[] => {
  return list.map(({ surrogateId, name }) => ({
    label: name,
    value: surrogateId
  }))
}

export { transformCategoryToSelector }

/**
 * 将专题列表转换为下拉选择器选项
 */
const transformTopicToSelector = (list: BlogTopicVO[]): OptionType[] => {
  return list.map(({ surrogateId, name }) => ({
    label: name,
    value: surrogateId
  }))
}

export { transformTopicToSelector }
