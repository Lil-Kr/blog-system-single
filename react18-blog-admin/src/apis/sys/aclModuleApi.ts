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
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL_MODULE + '/add', req)
  },
  edit(req: AclModuleEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL_MODULE + '/edit', req)
  },
  aclModuleTree() {
    return baseAxiosRequest.post<Result<AclModuleTreeResp[]>>(PREFIX_URL_SYS_ACL_MODULE + '/aclModuleTree', {})
  },
  getAclModule(req: AclModuleReq) {
    return baseAxiosRequest.get<Result<SysAclModule>>(PREFIX_URL_SYS_ACL_MODULE + `/getAclModule/${req.surrogateId}`, {})
  },
  aclModuleList(req: AclModuleListReq) {
    return baseAxiosRequest.post<Result<SysAclModuleListResp[]>>(PREFIX_URL_SYS_ACL_MODULE + '/list', req)
  },
  delete(req: AclDeletReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_ACL_MODULE + `/delete/${req.surrogateId}`, {})
  }
}

const aclApi: AclApi = {
  add(req: AclAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL + '/add', req)
  },
  edit(req: AclEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ACL + '/edit', req)
  },
  delete(req: AclDeletReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_ACL + `/delete/${req.surrogateId}`, {})
  },
  pageList(req: AclPageListReq) {
    return baseAxiosRequest.post<ResultPage<AclPageListResp>>(PREFIX_URL_SYS_ACL + '/pageList', req)
  }
}

export { aclModuleApi, aclApi }
