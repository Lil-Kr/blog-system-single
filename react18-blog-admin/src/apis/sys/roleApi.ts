import { PREFIX_URL_SYS_ROLE } from '@/config'
import { AclModuleTreeResp } from '@/types/apis/sys/acl/aclType'
import {
  RoleAclTreeReq,
  RoleAddReq,
  RoleApi,
  RoleDelReq,
  RoleEditReq,
  RoleListPageReq,
  RoleUserListResp,
  RoleUserReq,
  SysRoleTableType,
  UpdateRoleAclsReq,
  UpdateRoleUserReq
} from '@/types/apis/sys/role/roleType'
import { Result, ResultPage } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const roleApi: RoleApi = {
  retrievePageRoleList(req: RoleListPageReq) {
    return baseAxiosRequest.post<ResultPage<SysRoleTableType>>(PREFIX_URL_SYS_ROLE + '/pageList', req)
  },
  add(req: RoleAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ROLE + '/add', req)
  },
  edit(req: RoleEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ROLE + '/edit', req)
  },
  delete(req: RoleDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_ROLE + '/delete', req)
  },
  roleAclTree(req: RoleAclTreeReq) {
    return baseAxiosRequest.post<Result<AclModuleTreeResp[]>>(PREFIX_URL_SYS_ROLE + '/roleAclTree', req)
  },
  roleUserList(req: RoleUserReq) {
    return baseAxiosRequest.post<Result<RoleUserListResp>>(PREFIX_URL_SYS_ROLE + '/roleUserList', req)
  },
  updateRoleAcls(req: UpdateRoleAclsReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ROLE + '/updateRoleAcls', req)
  },
  updateRoleUsers(req: UpdateRoleUserReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ROLE + '/updateRoleUsers', req)
  }
}

export default roleApi
