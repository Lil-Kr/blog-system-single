import { BaseEntityRequiredType } from "@/types/base"

/**
 * blog => label entity
 */
export interface LabelType extends BaseEntityRequiredType {
  id: number
  surrogateId: string
  number: number | string
  name: string
  color: string
  colorText: string
}
