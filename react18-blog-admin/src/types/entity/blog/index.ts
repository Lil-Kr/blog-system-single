import { BaseEntityRequiredType, BaseEntityType } from '../../base'

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

  export interface BlogContent extends BaseEntityType {
    id?: number
    surrogateId?: string
    number?: number | string
    name?: string
  }
}
