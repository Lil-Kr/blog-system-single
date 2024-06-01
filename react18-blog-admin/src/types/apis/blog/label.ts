/**
 * blog.label
 */
import { BaseEntityPageType, BaseEntityType } from '@/types/base'
import { Result, ResultPage } from '@/types/base/response'
import { LabelType } from '@/types/entity/blog/labelType'
import { BaseApi } from '..'

/**
 * blog label request API type
 */
export interface LabelApi extends BaseApi {
  getLabelList(params: LabelReqParams): Promise<ResultPage<LabelVO>>
  save(params: CreateLabelReq): Promise<Result<string>>
  edit(params: EditLabelReq): Promise<Result<string>>
  delete(params: DelLabelReq): Promise<Result<string>>
  deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

/**
 * ==================== label request ====================
 */
export interface LabelReqParams extends BaseEntityType {
  keyWord?: string
}

export interface CreateLabelReq {
  number: string
  name: string
  remark: string
}

export interface EditLabelReq {
  id?: bigint
  surrogateId?: string
  number: string
  name: string
  remark: string
}

export interface DelLabelReq {
  surrogateId: string
}

/**
 * ==================== label response ====================
 */
export interface LabelDTO {
  key: string
  number: string | number
  name: string
  color?: string
  colorText: string
  remark: string
}

export interface LabelMapped {
  key: string
  label: string
  value: string
}

/**
 * mapping back-end data
 */
export interface LabelVO extends LabelType {
  key?: string
}
