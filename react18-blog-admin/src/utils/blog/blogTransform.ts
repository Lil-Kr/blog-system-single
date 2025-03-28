import { BlogContentTableType, BlogContentResq } from '@/apis/blog/content/blogContentApi'

const transformBlogToTable = (blogList: BlogContentResq[]): BlogContentTableType[] => {
  return blogList.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    ...rest
  }))
}

export { transformBlogToTable }
