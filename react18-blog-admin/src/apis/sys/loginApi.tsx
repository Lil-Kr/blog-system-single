import { baseAxiosRequest } from '@/utils/http/request'
import { Result } from '@/types/base/response'
import { PREFIX_URL_SYS_USER } from '@/config'
import { LoginTpye, SysUser } from '@/types/apis/sys/user/userType'

const loginApi = {
  login(req: LoginTpye.LoginFormType) {
    return baseAxiosRequest.put<Result<SysUser>>(PREFIX_URL_SYS_USER + '/login', req)
  },
  logout() {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_USER + '/logout', {})
  }
}

export default loginApi
