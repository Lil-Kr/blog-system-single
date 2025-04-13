import withPermission from '@/hooks/usePermission'
import { Button } from 'antd/lib'
import { ButtonShape, ButtonType } from 'antd/lib/button'

interface Props {
  text?: string
  size?: 'small' | 'middle' | 'large'
  name?: string
  icon?: React.ReactNode
  type: ButtonType
  shape?: ButtonShape
  danger?: boolean
  onClick?: () => void
}

/**
 * [新增]博客按钮
 * @returns
 */
const AddBlogButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddBlogButtonAcl = withPermission(AddBlogButton, '_add_blog')
export { AddBlogButtonAcl }

/**
 * [编辑]博客信息
 * @returns
 */
const EditBlogButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditBlogButtonAcl = withPermission(EditBlogButton, '_edit_blog')
export { EditBlogButtonAcl }

/**
 * [删除]博客信息
 * @returns
 */
const DelBlogButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelBlogButtonAcl = withPermission(DelBlogButton, '_del_blog')
export { DelBlogButtonAcl }

/**
 * [删除]博客信息
 * @returns
 */
const PublishBlogButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const PublishBlogButtonAcl = withPermission(PublishBlogButton, '_publish_blog')
export { PublishBlogButtonAcl }

/**
 * [分页查询]博客信息
 * @returns
 */
const QueryBlogButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryBlogButtonAcl = withPermission(QueryBlogButton, '_query_blog')
export { QueryBlogButtonAcl }
