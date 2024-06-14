/**
 * home page blog items type
 */
export type BlogItemsType = {
  key: string | number
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
  backendApi?: string
}
