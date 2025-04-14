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
const AddTopicButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddTopicButtonAcl = withPermission(AddTopicButton, '_add_topic')
export { AddTopicButtonAcl }

/**
 * [编辑]专题信息
 * @returns
 */
const EditTopicButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditTopicButtonAcl = withPermission(EditTopicButton, '_edit_topic')
export { EditTopicButtonAcl }

/**
 * [删除]专题信息
 * @returns
 */
const DelTopicButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelTopicButtonAcl = withPermission(DelTopicButton, '_del_topic')
export { DelTopicButtonAcl }

/**
 * [查看]专题信息
 * @returns
 */
const LookTopicButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const LookTopicButtonAcl = withPermission(LookTopicButton, '_look_topic')
export { LookTopicButtonAcl }

/**
 * [查询]专题信息
 * @returns
 */
const QueryTopicButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryTopicButtonAcl = withPermission(QueryTopicButton, '_query_topic')
const _QUERY_TOPIC_ACL = '_query_topic'
export { QueryTopicButtonAcl, _QUERY_TOPIC_ACL }
