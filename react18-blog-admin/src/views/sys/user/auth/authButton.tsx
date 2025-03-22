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
 * 新增用户信息按钮
 * @returns
 */
const AddUserButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddUserButtonAcl = withPermission(AddUserButton, '_add_user')
export { AddUserButtonAcl }

/**
 * 编辑用户信息
 * @returns
 */
const EditUserButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditUserButtonAcl = withPermission(EditUserButton, '_edit_user')
export { EditUserButtonAcl }

/**
 * 删除用户信息
 * @returns
 */
const DelUserButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelUserButtonAcl = withPermission(DelUserButton, '_del_user')
export { DelUserButtonAcl }
