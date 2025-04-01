import { Result, ResultPage } from '@/types/base/response'
import { BaseApi, OptionType } from '@/types/apis/'
import { BaseEntityPageType } from '@/types/base'

/** 权限模块 entity */
export interface SysAclModule {
  id: string
  surrogateId: string
  number: string
  name: string
  parentId: string
  parentName: string
  level: string
  menuUrl: string
  seq: number
  status: number
  remark: string
  operateIp: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
}

/** 权限点 entity */
export interface SysAcl {
  id: string
  surrogateId: string
  number: string
  name: string
  aclModuleId: string
  type: number
  url: string
  menuName: string
  menuUrl: string
  btnSign: string
  status: number
  seq: number
  remark: string
  operateIp: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
}

/**
 * 权限模块信息列表展示类型
 */
export type AclModuleTableType = {
  key?: string
  id?: string
  surrogateId?: string
  number?: string
  name?: string
  parentId?: string
  parentName?: string
  parentSurrogateId?: string
  parentAclModuleInfo?: OptionType
  level?: string
  menuUrl?: string
  seq?: number
  status?: number
  remark?: string
  operateIp?: string
  creatorId?: string
  operator?: string
  createTime?: string
  updateTime?: string
}

export type CallBackType = {
  aclModuleId: string
}

/** ================ req ================ */
export interface AclModuleReq {
  surrogateId: string
}

export interface AclModuleAddReq {
  name: string
  parentSurrogateId: string
  menuUrl?: string
  seq: number
  status: number
  remark: string
  operateIp?: string
}

export interface AclModuleEditReq extends AclModuleAddReq {
  surrogateId: string
}

export interface AclModuleListReq {}

/** ================ resp ================ */

/**
 * 权限模块树
 */
export interface AclModuleTreeResp {
  id: string
  surrogateId: string
  number: string
  name: string
  parentId: string
  level: string
  seq: number
  status: number
  remark: string
  operateIp: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
  aclModuleDtoList: AclModuleTreeResp[]
  aclDtoList: SysAclDto[]
}

export interface SysAclDto extends SysAcl {
  checked: boolean
  hasAcl: boolean
}

export interface SysAclModuleListResp {
  id: string
  surrogateId: string
  number: string
  name: string
  parentId: string
  level: string
  seq: number
  status: number
  remark: string
  operateIp: string
  creatorId: string
  operator: string
  createTime: string
  updateTime: string
}

/** ================ table-type ================ */
export interface AclTableListType extends SysAcl {
  key: string
  aclModuleName: string
  creatorName: string
  operatorName: string
  nickName: string
  aclTypeName: string
}

export interface AclModuleApi extends BaseApi {
  aclModuleTree(): Promise<Result<AclModuleTreeResp[]>>
  getAclModule(req: AclModuleReq): Promise<Result<SysAclModule>>
  aclModuleList(req: AclModuleListReq): Promise<Result<SysAclModuleListResp[]>>
  add(req: AclModuleAddReq): Promise<Result<string>>
  edit(req: AclModuleEditReq): Promise<Result<string>>
  delete(req: AclDeletReq): Promise<Result<string>>
}

/** =========================== acl =================================== */
export interface AclModalType {
  key?: string
  aclModuleId?: string
  aclModuleSurrogateId?: string | '' // 用户添加和编辑之后回调函数, 存储当前选中的权限树节点
  aclModuleName?: string
  type?: number
  aclTypeName?: string
  name?: string
  url?: string
  menuName?: string
  menuUrl?: string
  btnSign?: string
  seq?: number
  status?: number
  remark?: string
}

export interface AclPageListReq extends BaseEntityPageType {
  aclModuleId?: string
}

export interface AclPageListResp extends SysAcl {
  aclModuleName: string
  creatorName: string
  operatorName: string
  nickName: string
  type: number
  aclTypeName: string
}

export interface AclAddReq {
  name: string
  aclModuleId: string
  type: string
  url: string
  status: number
  seq: number
  menuName?: string
  menuUrl?: string
  btnSign?: string
  remark: string
  operateIp?: string
}

export interface AclEditReq {
  surrogateId: string
  name: string
  aclModuleId: string
  url: string
  type: number
  status: number
  seq: number
  menuName?: string
  menuUrl?: string
  btnSign?: string
  remark: string
  operateIp?: string
}

export interface AclDeletReq {
  surrogateId: string
}

export interface AclApi extends BaseApi {
  add(req: AclAddReq): Promise<Result<string>>
  pageList(req: AclPageListReq): Promise<ResultPage<AclPageListResp>>
  edit(req: AclEditReq): Promise<Result<string>>
  delete(req: AclDeletReq): Promise<Result<string>>
}
