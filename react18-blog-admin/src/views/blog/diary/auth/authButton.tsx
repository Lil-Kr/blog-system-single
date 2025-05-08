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
 * [新增]日记
 * @returns
 */
const AddDiaryBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddDiaryBtnAcl = withPermission(AddDiaryBtn, '_add_diary')
export { AddDiaryBtnAcl }

/**
 * [编辑]日记
 * @returns
 */
const EditDiaryBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditDiaryBtnAcl = withPermission(EditDiaryBtn, '_edit_diary')
export { EditDiaryBtnAcl }

/**
 * [删除]日记
 * @returns
 */
const DelDiaryBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelDiaryBtnAcl = withPermission(DelDiaryBtn, '_del_diary')
export { DelDiaryBtnAcl }

/**
 * [查询]日记
 * @returns
 */
const _QUERY_DIARY_ACL = '_query_diary'
const QueryDiaryBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryDiaryBtnAcl = withPermission(QueryDiaryBtn, _QUERY_DIARY_ACL)
export { QueryDiaryBtnAcl, _QUERY_DIARY_ACL }
