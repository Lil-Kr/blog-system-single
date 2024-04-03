import { ColumnsType } from 'antd/es/table'
import { BaseType } from '../base'

/**
 * blog label
 */

export interface LabelShowType {
  key: string
  number: string | number
  name: string
  remark: string
}

export interface LabelType extends BaseType {
  id: number
  surrogateId: string
  number: number | string
  name: string
  remark: string
}
