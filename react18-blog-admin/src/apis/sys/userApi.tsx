import { PREFIX_URL_SYS_USER } from '@/config'
import { SysUserApi, UserAddReq, UserListPageReq, UserPageListByOrgIdResp } from '@/types/apis/sys/user/user'
import { Result, ResultPage } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const sysUserApi: SysUserApi = {
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
  add(params: UserAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_USER + '/add', params)
  }
  // edit(params: SysOrgEditReq) {
  // },
  // delete(params: SysOrgDelReq) {
  //   return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_ORG + '/delete', params)
  // }
}

export default sysUserApi
