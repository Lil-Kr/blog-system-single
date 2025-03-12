import { PREFIX_URL_SYS_ROLE } from '@/config'
import { RoleAddReq, RoleApi, RoleListPageReq, SysRoleVO } from '@/types/apis/sys/role/roleType'
import { Result, ResultPage } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const roleApi: RoleApi = {
  retrievePageRoleList(req: RoleListPageReq) {
    return baseAxiosRequest.post<ResultPage<SysRoleVO>>(PREFIX_URL_SYS_ROLE + '/pageList', req)
  },

  add(req: RoleAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ROLE + '/add', req)
  }
}

export default roleApi
