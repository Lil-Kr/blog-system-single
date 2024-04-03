/**
 * blog
 */

/**
 * label
 */
export interface LabelReqParams {
  keyWord?: string
}

export interface CreateLabel {
  number: string
  name: string
  remark: string
}

export interface EditLabel {
  id?: bigint
  surrogateId?: string
  number: string
  name: string
  remark: string
}

export interface DelLabel {
  id?: bigint
  surrogateId: string
}
