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
 * [新增]标签按钮
 * @returns
 */
const AddLabelButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddLabelButtonAcl = withPermission(AddLabelButton, '_add_label')
export { AddLabelButtonAcl }

/**
 * [编辑]标签信息
 * @returns
 */
const EditLabelButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditLabelButtonAcl = withPermission(EditLabelButton, '_edit_label')
export { EditLabelButtonAcl }

/**
 * [删除]标签信息
 * @returns
 */
const DelLabelButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelLabelButtonAcl = withPermission(DelLabelButton, '_del_label')
export { DelLabelButtonAcl }

/**
 * [查看]标签信息
 * @returns
 */
const LookLabelButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const LookLabelButtonAcl = withPermission(LookLabelButton, '_look_label')
export { LookLabelButtonAcl }

/**
 * [查询]标签信息
 * @returns
 */
const QueryLabelButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryLabelButtonAcl = withPermission(QueryLabelButton, '_query_label')
const _QUERY_LABEL_ACL = '_query_label'
export { QueryLabelButtonAcl, _QUERY_LABEL_ACL }
