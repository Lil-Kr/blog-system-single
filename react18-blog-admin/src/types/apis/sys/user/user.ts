import { BaseApi } from '@/types/apis/'
import { BaseEntityPageType } from '@/types/base'
import { Result, ResultPage } from '@/types/base/response'
import exp from 'constants'

/**
 * login in
 */
export namespace LoginTpye {
  export interface LoginFormType {
    account: string
    password: string
  }
  export interface LoginRespType {
    token: string
  }
}

/**
 * entity
 */
export interface SysUser {
  id: string
  surrogateId: string
  number: string
  account: string
  userName: string
  telephone: string
  email: string
  orgId: string
  status: number
  deleted: number
  remark: string
  operateIp: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
}

export interface UserPageListByOrgIdResp extends SysUser {
  orgName: string
  creatorName: string
  operatorName: string
}

export interface UserAddReq {
  account: string
  email: string
  orgId: string
  status: number
  telephone: string
}

export interface UserEditReq {
  surrogateId: string
  account: string
  email: string
  orgId: string
  status: number
  telephone: string
}

export interface SysUserResp extends SysUser {
  orgName: string
  operatorName: string
}

export interface UserListPageReq extends BaseEntityPageType {
  surrogateId?: string
  keyWords?: string | number
}

export interface SysUserApi extends BaseApi {
  pageUserList(req: UserListPageReq): Promise<ResultPage<UserPageListByOrgIdResp>>
  // pageChildOrgList(req: SysOrgPageReq): Promise<ResultPage<SysOrgResp>>
  // pageOrgList(req: SysOrgPageReq): Promise<ResultPage<SysOrgResp>>
  // orgAllList(req: SysOrgListAllReq): Promise<Result<SysOrgAllResp[]>>
  add(params: UserAddReq): Promise<Result<string>>
  // edit(params: SysOrgEditReq): Promise<Result<string>>
  // delete(params: SysOrgDelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}
