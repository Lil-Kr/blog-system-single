/**
 * home page blog items type
 */
export type BlogItemsType = {
  key: string | number
  image: {
    alt: string
    url: string
  }
  tags: string[]
  blogTitle: string
  publishDate: string
}
