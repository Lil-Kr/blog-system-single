/**
 * blog.label
 */
import { BaseEntityPageType, BaseEntityType } from '@/types/base'
import { Result, ResultPage } from '@/types/base/response'
import { BaseApi } from '..'

/**
 * blog => label entity
 */
export interface LabelType {
  id: number
  surrogateId: string
  number: string
  name: string
  color: string
  colorText: string
  status: number // 未使用
  remark: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
}

export interface LabelListTableType {
  key: string
  number: string
  name: string
  color: string
  colorText: string
  remark: string
}

/**
 * ==================== label request ====================
 */
export interface LabelReq extends BaseEntityType {
  keyWord?: string
}

export interface LabelPageReq extends BaseEntityPageType {}

export interface CreateLabelReq {
  number: string
  name: string
  remark: string
}

export interface EditLabelReq {
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
export interface LabelMapped {
  key: string
  label: string
  value: string
}

/**
 * mapping back-end data
 */
export interface LabelTableResq extends LabelType {
  key?: string
}

/**
 * blog label request API type
 */
export interface LabelApi extends BaseApi {
  retrieveLabelPageList(req: LabelReq): Promise<ResultPage<LabelTableResq>>
  add(req: CreateLabelReq): Promise<Result<string>>
  edit(req: EditLabelReq): Promise<Result<string>>
  delete(req: DelLabelReq): Promise<Result<string>>
  deleteBatch(req: DelLabelReq): Promise<Result<string>>
}
