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
const AddBlogBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddBlogBtnAcl = withPermission(AddBlogBtn, '_add_blog')
export { AddBlogBtnAcl }

/**
 * [编辑]博客信息
 * @returns
 */
const EditBlogBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditBlogBtnAcl = withPermission(EditBlogBtn, '_edit_blog')
export { EditBlogBtnAcl }

/**
 * [删除]博客信息
 * @returns
 */
const DelBlogBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelBlogBtnAcl = withPermission(DelBlogBtn, '_del_blog')
export { DelBlogBtnAcl }

/**
 * [删除]博客信息
 * @returns
 */
const PublishBlogBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const PublishBlogBtnAcl = withPermission(PublishBlogBtn, '_publish_blog')
export { PublishBlogBtnAcl }

/**
 * [分页查询]博客信息
 * @returns
 */
const QueryBlogBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryBlogBtnAcl = withPermission(QueryBlogBtn, '_query_blog')
const _QUERY_BLOG_ACL = '_query_blog'
export { QueryBlogBtnAcl, _QUERY_BLOG_ACL }
