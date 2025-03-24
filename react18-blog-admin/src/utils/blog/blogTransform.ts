import { BlogContentDTO, BlogContentVO } from '@/apis/blog/content/blogContentApi'

const blogTransformToTable = (blogList: BlogContentVO[]): BlogContentDTO[] => {
  return blogList.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    categoryName: '',
    topicName: '',
    ...rest
  }))
}

export { blogTransformToTable }
