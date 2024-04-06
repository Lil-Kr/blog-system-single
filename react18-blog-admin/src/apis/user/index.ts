import { baseAxiosRequest } from '@/utils/http/request'
import { LabelType } from '@/types/entity/blog/labelType'
import { Result } from '@/types/base/response'
import { LoginTpye } from '@/types/user'
import { PREFIX_URL_SYS_USER } from '@/config'

export default {
  login(params: LoginTpye.LoginFormType) {
    return baseAxiosRequest.put<Result<string>>(PREFIX_URL_SYS_USER + '/login', params)
  },
  logout() {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_USER + '/logout', {})
  }
}
