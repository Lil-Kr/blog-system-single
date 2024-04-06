import { BaseEntityRequiredType } from '../../base'

/**
 * blog => label entity
 */
export interface BlogType extends BaseEntityRequiredType {
  id: number
  surrogateId: string
  number: number | string
  name: string
  remark: string
}
