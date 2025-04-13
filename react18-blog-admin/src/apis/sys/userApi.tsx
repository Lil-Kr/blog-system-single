import { PREFIX_URL_SYS_USER } from '@/config'
import {
  SysUser,
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
    return baseAxiosRequest.post<ResultPage<UserPageListByOrgIdResp>>(PREFIX_URL_SYS_USER + '/pageList', req)
  },
  get() {
    return baseAxiosRequest.get<Result<SysUser>>(PREFIX_URL_SYS_USER + '/get', {})
  },
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
