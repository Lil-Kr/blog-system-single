import { BaseEntityRequiredType } from '../../base'

/**
 * blog => label entity
 */
export interface LabelType extends BaseEntityRequiredType {
  id: number
  surrogateId: string
  number: number | string
  name: string
  color: string
}
