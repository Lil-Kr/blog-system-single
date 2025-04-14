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
 * [新增]专题
 * @returns
 */
const AddCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddCategoryButtonAcl = withPermission(AddCategoryButton, '_add_category')
export { AddCategoryButtonAcl }

/**
 * [编辑]分类信息
 * @returns
 */
const EditCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditCategoryButtonAcl = withPermission(EditCategoryButton, '_edit_category')
export { EditCategoryButtonAcl }

/**
 * [删除]分类信息
 * @returns
 */
const DelCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelCategoryButtonAcl = withPermission(DelCategoryButton, '_del_category')
export { DelCategoryButtonAcl }

/**
 * [查看]分类信息
 * @returns
 */
const LookCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const LookCategoryButtonAcl = withPermission(LookCategoryButton, '_look_category')
export { LookCategoryButtonAcl }

/**
 * [查询]分类信息
 * @returns
 */
const QueryCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryCategoryButtonAcl = withPermission(QueryCategoryButton, '_query_category')
const _QUERY_CATEGORY_ACL = '_query_category'
export { QueryCategoryButtonAcl, _QUERY_CATEGORY_ACL }
