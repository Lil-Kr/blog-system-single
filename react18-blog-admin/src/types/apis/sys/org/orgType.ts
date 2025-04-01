import { Result, ResultPage } from '@/types/base/response'
import { BaseApi, OptionType } from '@/types/apis/'
import { BaseEntityPageType } from '@/types/base'

export interface SysOrg {
  id: string
  surrogateId: string
  number: string
  name: string
  parentId: string
  level: string
  seq: number
  remark: string
  status: number
  deleted: number
  operator: string
  operateIp: string
  createTime: string
  updateTime: string
}

export type OrgTableType = {
  key?: string
  id?: string
  number?: string
  name?: string
  seq?: number
  status?: number
  remark?: string
  createTime?: string
  updateTime?: string
  parentId?: string
  parentName?: string
  operatorName?: string
  orgInfo?: OptionType
}

export interface SysOrgReq extends BaseEntityPageType {
  surrogateId: string
}

export interface SysOrgPageReq extends BaseEntityPageType {
  surrogateId?: string
  parentId?: string
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
  status?: number
}

export interface SysOrgListResp extends SysOrg {}

export interface SysOrgSaveReq {
  name: string
  parentId: string
  parentSurrogateId: string
  status: number
  seq: number
  remark?: string
}

export interface SysOrgEditReq {
  surrogateId: string
  name: string
  parentId?: string
  parentSurrogateId: string
  status: string
  seq: number
  remark?: string
}

export interface SysOrgVO extends SysOrg {
  keyWords?: string | number
  isOrder?: number
}

export interface SysOrgDelReq {
  surrogateId: string
}

export interface SysOrgApi extends BaseApi {
  retrieveOrgTreeList(): Promise<Result<SysOrgResp[]>>
  pageOrgList(req: SysOrgPageReq): Promise<ResultPage<SysOrgResp>>
  orgAllList(req: SysOrgListAllReq): Promise<Result<SysOrgListResp[]>>
  add(req: SysOrgSaveReq): Promise<Result<string>>
  edit(req: SysOrgEditReq): Promise<Result<string>>
  delete(req: SysOrgDelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}
