/**
 * home page blog items type
 */
export type BlogItemsType = {
  key: string | number
  image: {
    alt: string
    src: string
  }
  tags: string[]
  blogTitle: string
  publishDate: string
}
