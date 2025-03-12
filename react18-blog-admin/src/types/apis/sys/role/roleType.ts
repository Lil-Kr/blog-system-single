import { Result, ResultPage } from '@/types/base/response'
import { BaseApi } from '../..'
import { BaseEntityPageType, BasePageReq } from '@/types/base'

export interface TableRoleType {
  key: string
  surrogateId: string
  name: string
  type: number
  status?: number
  remark: string
  createTime?: string
  updateTime?: string
}

export interface SysRole {
  id: string
  surrogateId: string
  name: string
  type: number
  remark: string
  status: number
  deleted: number
  operateIp: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
}

export interface SysRoleVO extends SysRole {
}

export interface RoleListPageReq extends BaseEntityPageType {
  name?: string
  type?: number
}

export interface RoleAddReq {
  name: string
  roleTypeId: string
  status: number
  remark?: string
}

export interface RoleApi extends BaseApi {
  retrievePageRoleList(req: RoleListPageReq): Promise<ResultPage<SysRoleVO>>
  add(req: RoleAddReq): Promise<Result<string>>
  // pageChildOrgList(req: SysOrgPageReq): Promise<ResultPage<SysOrgResp>>
  // pageOrgList(req: SysOrgPageReq): Promise<ResultPage<SysOrgResp>>
  // orgAllList(req: SysOrgListAllReq): Promise<Result<SysOrgAllResp[]>>
  // add(params: SysOrgSaveReq): Promise<Result<string>>
  // edit(params: SysOrgEditReq): Promise<Result<string>>
  // delete(params: SysOrgDelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}
