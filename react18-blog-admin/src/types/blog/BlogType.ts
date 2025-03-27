import { BlogContentApi, BlogContentDTO } from '@/apis/blog/content/blogContentApi'
import { SelectProps } from 'antd/lib'
import { OptionType } from '../apis'

/**
 * 打开Modal框时进行
 */
export type BlogModalType = {
  api: BlogContentApi
  openModal: boolean
  title: string
  action: string
  inputDisabled: boolean
  blogTopics?: SelectProps['options']
  data?: {
    categoryInfo: OptionType
    blogLabelList: SelectProps['options']
    topicInfo?: OptionType
    blogPublisStatue?: string
    original?: string
    recommend?: string
  }
  update: (data?: BlogModalType) => void
}
