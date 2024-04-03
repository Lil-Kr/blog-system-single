import { baseAxiosRequest } from '@/utils/http/request'
import { LabelType } from '@/types/blog/labelType'
import { Result } from '@/types/base/response'
import { LoginTpye } from '@/types/user'

export default {
  login(params: LoginTpye.LoginFormType) {
    return baseAxiosRequest.put<Result<string>>('/sys/user/login', params)
  }
}
