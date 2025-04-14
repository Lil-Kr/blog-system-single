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
 * _add_org
 * @returns
 */
const AddOrgBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddOrgBtnAcl = withPermission(AddOrgBtn, '_add_org')
export { AddOrgBtnAcl }

/**
 * _edit_org
 * @returns
 */
const EditOrgBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditOrgBtnAcl = withPermission(EditOrgBtn, '_edit_org')
export { EditOrgBtnAcl }

/**
 * _del_org
 * @returns
 */
const DelOrgBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelOrgBtnAcl = withPermission(DelOrgBtn, '_del_org')
export { DelOrgBtnAcl }

/**
 * _look_org
 * @returns
 */
const LookOrgBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const LookOrgBtnAcl = withPermission(LookOrgBtn, '_look_org')
export { LookOrgBtnAcl }

/**
 * _query_org
 * @returns
 */
const QueryUserBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryUserBtnAcl = withPermission(QueryUserBtn, '_query_org')
const _QUERY_ORG_ACL = '_query_org'
export { QueryUserBtnAcl, _QUERY_ORG_ACL }
