import { Result, ResultPage } from '@/types/base/response'
import { BaseApi } from '../..'
import { BaseEntityPageType, BaseEntityRequiredType, BasePageReq } from '@/types/base'

export interface SysOrg {
  id: string
  surrogateId: string
  number: string
  name: string
  parentId: string
  level: number
  seq: number
  remark: string
  status: number
  deleted: number
  operator: string
  operateIp: string
  createTime: string
  updateTime: string
}

export interface SysOrgReq extends BaseEntityPageType {
  surrogateId: string
}

export interface SysOrgPageReq extends BaseEntityPageType {
  surrogateId?: string
  keyWords?: string
}

export interface SysOrgResp extends SysOrg {
  parentName: string
  operatorName: string
  orgList?: SysOrgResp[]
}

export interface SysOrgListAllReq {
  surrogateId?: string
  number?: string
  name?: string
  remark?: string
}

export interface SysOrgAllResp extends SysOrg {}

export interface SysOrgSaveReq {
  name: string
  parentId: string
  parentSurrogateId: string
  status: number
  seq: number
  remark?: string
}

export interface SysOrgEditReq {
  name: string
  parentId: string
  parentSurrogateId: string
  status: number
  seq: number
  remark?: string
}

export interface SysOrgVO extends SysOrg {
  keyWords?: string | number
  isOrder?: number
}

export interface SysOrgApi extends BaseApi {
  retrieveOrgList(): Promise<Result<SysOrgResp[]>>
  pageChildOrgList(req: SysOrgPageReq): Promise<ResultPage<SysOrgResp>>
  pageOrgList(req: SysOrgPageReq): Promise<ResultPage<SysOrgResp>>
  orgAllList(req: SysOrgListAllReq): Promise<Result<SysOrgAllResp[]>>
  save(params: SysOrgSaveReq): Promise<Result<string>>
  edit(params: SysOrgEditReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}
