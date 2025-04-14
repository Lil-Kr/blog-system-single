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
 * _add_dict
 * @returns
 */
const AddDictBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const AddDictBtnAcl = withPermission(AddDictBtn, '_add_dict')
export { AddDictBtnAcl }

/**
 * _edit_dict
 * @returns
 */
const EditDictBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditDictBtnAcl = withPermission(EditDictBtn, '_edit_dict')
export { EditDictBtnAcl }

/**
 * _del_dict
 * @returns
 */
const DelDictBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelDictBtnAcl = withPermission(DelDictBtn, '_del_dict')
export { DelDictBtnAcl }

/**
 * _query_dict
 * @returns
 */
const QueryDictBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryDictBtnAcl = withPermission(QueryDictBtn, '_query_dict')
const _QUERY_DICT_ACL = '_query_dict'
export { QueryDictBtnAcl, _QUERY_DICT_ACL }

/**
 * _add_dict_detail
 * @returns
 */
const _ADD_DICT_DETAIL_ACL = '_add_dict_detail'
export { _ADD_DICT_DETAIL_ACL }

/**
 * _edit_dict_detail
 * @returns
 */
const EditDetailBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const EditDetailBtnAcl = withPermission(EditDetailBtn, '_edit_dict_detail')
export { EditDetailBtnAcl }

/**
 * _del_dict_detail
 * @returns
 */
const DelDetailBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const DelDetailBtnAcl = withPermission(DelDetailBtn, '_del_dict_detail')
export { DelDetailBtnAcl }

/**
 * _query_dict_detail
 * @returns
 */
const QueryDictDetailBtn: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>
}
const QueryDictDetailBtnAcl = withPermission(QueryDictDetailBtn, '_query_dict_detail')
export { QueryDictDetailBtnAcl }
