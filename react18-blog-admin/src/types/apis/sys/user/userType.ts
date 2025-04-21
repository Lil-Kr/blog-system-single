import { BaseApi, OptionType } from '@/types/apis/'
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
  surrogateId: string
  token: string
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

export interface UserTableType {
  key?: string
  id?: string
  number?: string
  account?: string
  userName?: string
  telephone?: string
  email?: string
  orgId?: string
  status?: number
  deleted?: number
  remark?: string
  operateIp?: string
  creatorId?: string
  operator?: string
  createTime?: string
  updateTime?: string
  orgName?: string
  creatorName?: string
  operatorName?: string
  orgInfo?: OptionType
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
  userName: string
  email: string
  orgId: string
  status: number
  telephone: string
  remark: string
  operateIp?: string
}

export interface SysUserResp extends SysUser {
  orgName: string
  operatorName: string
}

export interface UserListPageReq extends BaseEntityPageType {
  surrogateId?: string
  keyWords?: string
}

export interface SysUserDelReq {
  surrogateId: string
}

export interface SysUserApi extends BaseApi {
  pageUserList(req: UserListPageReq): Promise<ResultPage<UserPageListByOrgIdResp>>
  get(): Promise<Result<SysUser>>
  add(req: UserAddReq): Promise<Result<string>>
  edit(req: UserEditReq): Promise<Result<string>>
  delete(req: SysUserDelReq): Promise<Result<string>>
  // deleteBatch(req: DelLabelReq): Promise<Result<string>>
}
