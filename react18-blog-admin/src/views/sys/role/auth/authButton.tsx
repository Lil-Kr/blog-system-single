import withPermission from '@/hooks/usePermission'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd/lib'
import { ButtonColorType, ButtonShape, ButtonType, ButtonVariantType } from 'antd/lib/button'
import { blob } from 'stream/consumers'

interface Props {
  text?: string
  size?: 'small' | 'middle' | 'large'
  name?: string
  icon?: React.ReactNode
  type?: ButtonType
  shape?: ButtonShape
  color?: ButtonColorType
  danger?: boolean
  variant?: ButtonVariantType
  onClick?: () => void
}

/**
 * _add_role
 * @returns
 */
const _ADD_ROLE = '_add_role'
export { _ADD_ROLE }

/**
 * _edit_role
 * @returns
 */
const EditRoleBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditRoleBtnAcl = withPermission(EditRoleBtn, '_edit_role')
export { EditRoleBtnAcl }

/**
 * _del_role
 * @returns
 */
const DelRoleBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelRoleBtnAcl = withPermission(DelRoleBtn, '_del_role')
export { DelRoleBtnAcl }

/**
 * _freeze_role
 * currently not used
 * @returns
 */
const FreezeRoleBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const FreezeRoleBtnAcl = withPermission(FreezeRoleBtn, '_freeze_role')
export { FreezeRoleBtnAcl }

const _SHOW_ROLE_ACL = '_show_role_acl'
const _SHOW_ROLE_USER = '_show_role_user'
export { _SHOW_ROLE_ACL, _SHOW_ROLE_USER }

/**
 * _edit_role_acls
 * @returns
 */
const UpdateRoleAclsBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const UpdateRoleAclsBtnAcl = withPermission(UpdateRoleAclsBtn, '_edit_role_acls')
export { UpdateRoleAclsBtnAcl }

/**
 * _edit_role_user
 * @returns
 */
const UpdateRoleUserBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const UpdateRoleUserBtnAcl = withPermission(UpdateRoleUserBtn, '_edit_role_user')
export { UpdateRoleUserBtnAcl }
