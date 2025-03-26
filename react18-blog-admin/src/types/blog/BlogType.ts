import { BlogContentApi } from '@/apis/blog/content/blogContentApi'

/**
 * 打开Modal框时进行
 */
export type BlogModalType = {
  api: BlogContentApi
  openModal: boolean
  title: string
  inputDisabled: boolean
  update: (data?: BlogModalType) => void
}
