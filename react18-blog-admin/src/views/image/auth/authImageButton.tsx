import withPermission from '@/hooks/usePermission'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd/lib'
import { ButtonShape, ButtonType } from 'antd/lib/button'
import { blob } from 'stream/consumers'

interface Props {
  text?: string
  size?: 'small' | 'middle' | 'large'
  name?: string
  icon?: React.ReactNode
  type?: ButtonType
  shape?: ButtonShape
  danger?: boolean
  onClick?: () => void
}

/**
 * 新增 图片
 * @returns
 */
const AddImageButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddImageButtonAcl = withPermission(AddImageButton, '_upload_image')
export { AddImageButtonAcl }

/**
 * 删除 图片
 * @returns
 */
const DelImageButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelImageButtonAcl = withPermission(DelImageButton, '_del_image')
const _DEL_IMAGE_ACL = '_del_image'
export { DelImageButtonAcl, _DEL_IMAGE_ACL }

/**
 * 复制 图片信息
 * @returns
 */
const CopyImageButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const CopyImageCategoryButtonAcl = withPermission(CopyImageButton, '_copy_image')
const _COPY_IMAGE_ACL = '_copy_image'
export { CopyImageCategoryButtonAcl, _COPY_IMAGE_ACL }
