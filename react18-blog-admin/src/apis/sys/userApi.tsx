import { PREFIX_URL_SYS_USER } from '@/config'
import {
  SysUserApi,
  SysUserDelReq,
  UserAddReq,
  UserEditReq,
  UserListPageReq,
  UserPageListByOrgIdResp
} from '@/types/apis/sys/user/userType'
import { Result, ResultPage } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const userApi: SysUserApi = {
  pageUserList(req: UserListPageReq) {
    return baseAxiosRequest.post<ResultPage<UserPageListByOrgIdResp>>(PREFIX_URL_SYS_USER + '/pageUserList', req)
  },
  // pageChildOrgList(req: SysOrgReq) {
  //   return baseAxiosRequest.post<ResultPage<SysOrgResp>>(PREFIX_URL_SYS_ORG + '/pageChildOrgList', req)
  // },
  // pageOrgList(req: SysOrgReq) {
  //   return baseAxiosRequest.post<ResultPage<SysOrgResp>>(PREFIX_URL_SYS_ORG + '/pageOrgList', req)
  // },
  // orgAllList(req: SysOrgListAllReq) {
  //   return baseAxiosRequest.post<Result<SysOrgAllResp[]>>(PREFIX_URL_SYS_ORG + '/list', req)
  // },
  add(req: UserAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_USER + '/add', req)
  },
  edit(req: UserEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_USER + '/edit', req)
  },
  delete(req: SysUserDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_USER + '/delete', req)
  }
}

export default userApi
