import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_SYS_ACL, PREFIX_URL_SYS_ACL_MODULE } from '@/config'
import { Result, ResultPage } from '@/types/base/response'
import {
  AclAddReq,
  AclApi,
  AclDeletReq,
  AclEditReq,
  AclModuleAddReq,
  AclModuleApi,
  AclModuleEditReq,
  AclModuleListReq,
  AclModuleReq,
  AclModuleTreeResp,
  AclPageListReq,
  AclPageListResp,
  SysAclModule,
  SysAclModuleListResp
} from '@/types/apis/sys/acl/aclType'

const aclModuleApi: AclModuleApi = {
  add(req: AclModuleAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL_MODULE + '/addAclModule', req)
  },
  edit(req: AclModuleEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL_MODULE + '/editAclModule', req)
  },
  aclModuleTree() {
    return baseAxiosRequest.post<Result<AclModuleTreeResp[]>>(PREFIX_URL_SYS_ACL_MODULE + '/aclModuleTree', {})
  },
  getAclModule(req: AclModuleReq) {
    return baseAxiosRequest.get<Result<SysAclModule>>(PREFIX_URL_SYS_ACL_MODULE + '/getAclModule', req)
  },
  aclModuleList(req: AclModuleListReq) {
    return baseAxiosRequest.post<Result<SysAclModuleListResp[]>>(PREFIX_URL_SYS_ACL_MODULE + '/aclModuleList', req)
  }
}

const aclApi: AclApi = {
  add(req: AclAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL + '/addAcl', req)
  },
  edit(req: AclEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL + '/editAcl', req)
  },
  delete(req: AclDeletReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_ACL + '/delete', req)
  },
  // aclModuleTree() {
  //   return baseAxiosRequest.post<Result<AclModuleTreeResp[]>>(PREFIX_URL_SYS_ACL_MODULE + '/aclModuleTree', {})
  // },
  // getAclModule(req: AclModuleReq) {
  //   return baseAxiosRequest.get<Result<SysAclModule>>(PREFIX_URL_SYS_ACL_MODULE + '/getAclModule', req)
  // },
  pageList(req: AclPageListReq) {
    return baseAxiosRequest.post<ResultPage<AclPageListResp>>(PREFIX_URL_SYS_ACL + '/pageList', req)
  }
}

export { aclModuleApi, aclApi }
