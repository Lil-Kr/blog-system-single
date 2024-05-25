import { BaseEntityRequiredType } from "@/types/base"


export interface TopicType extends BaseEntityRequiredType {
  id: number
  surrogateId: string
  number: number | string
  name: string
}
