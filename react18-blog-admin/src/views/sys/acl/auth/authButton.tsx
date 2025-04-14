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
 * _add_acl
 * @returns
 */
const AddAclBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddAclBtnAcl = withPermission(AddAclBtn, '_add_acl')
export { AddAclBtnAcl }

/**
 * _edit_acl
 * @returns
 */
const EditAclBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditAclBtnAcl = withPermission(EditAclBtn, '_edit_acl')
export { EditAclBtnAcl }

/**
 * _del_acl
 * @returns
 */
const DelAclBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelAclBtnAcl = withPermission(DelAclBtn, '_del_acl')
export { DelAclBtnAcl }

/**
 * _query_acl
 * @returns
 */
const QueryAclBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryAclBtnAcl = withPermission(QueryAclBtn, '_query_acl')
const _QUERY_ACL_ACL = '_query_acl'
export { QueryAclBtnAcl, _QUERY_ACL_ACL }

/**
 * _add_acl_module
 * @returns
 */
const AddAclModuleBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddAclModuleBtnAcl = withPermission(AddAclModuleBtn, '_add_acl_module')
export { AddAclModuleBtnAcl }

/**
 * _edit_acl_module
 * @returns
 */
const EditAclModuleBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditAclModuleBtnAcl = withPermission(EditAclModuleBtn, '_edit_acl_module')
export { EditAclModuleBtnAcl }

/**
 * _del_acl_module
 * @returns
 */
const DelAclModuleBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelAclModuleBtnAcl = withPermission(DelAclModuleBtn, '_del_acl_module')
export { DelAclModuleBtnAcl }
