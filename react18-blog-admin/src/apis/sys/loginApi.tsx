import { baseAxiosRequest } from '@/utils/http/request'
import { Result } from '@/types/base/response'
import { PREFIX_URL_SYS_USER } from '@/config'
import { LoginTpye } from '@/types/apis/sys/user/userType'

const loginApi = {
  login(params: LoginTpye.LoginFormType) {
    return baseAxiosRequest.put<Result<string>>(PREFIX_URL_SYS_USER + '/login', params)
  },
  logout() {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_USER + '/logout', {})
  }
}

export default loginApi
