import { ColumnsType } from 'antd/es/table'
import { BaseType } from '../base'

/**
 * blog content
 */
export namespace BlogContenType {
  export interface BlogContentShow {
    key: string
    number: string | number
    name: string
    remark: string
  }

  export interface BlogContent extends BaseType {
    id?: number
    surrogateId?: string
    number?: number | string
    name?: string
    remark?: string
  }
}
