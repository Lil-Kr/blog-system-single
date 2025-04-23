/**
 * home page blog items type
 */
export type BlogItemsType = {
  key: string
  image: {
    alt: string
    url: string
  }
  tags: {
    surrogateId: string
    name: string
  }[]
  blogTitle: string
  publishTime: string
  paragraph: string
  backendApi?: string
}
