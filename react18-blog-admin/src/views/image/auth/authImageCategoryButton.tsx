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
 * 新增 图片分类
 * @returns
 */
const AddImageCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddImageCategoryButtonAcl = withPermission(AddImageCategoryButton, '_add_image_category')
export { AddImageCategoryButtonAcl }

/**
 * 编辑 图片分类
 * @returns
 */
const EditImageCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditImageCategoryButtonAcl = withPermission(EditImageCategoryButton, '_edit_image_category')
export { EditImageCategoryButtonAcl }

/**
 * 删除 图片分类
 * @returns
 */
const DelImageCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelImageCategoryButtonAcl = withPermission(DelImageCategoryButton, '_del_image_category')
export { DelImageCategoryButtonAcl }

/**
 * 条件查询 图片分类
 * @returns
 */
const QueryImageCategoryButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryImageCategoryButtonAcl = withPermission(QueryImageCategoryButton, '_query_image_category')
export { QueryImageCategoryButtonAcl }
