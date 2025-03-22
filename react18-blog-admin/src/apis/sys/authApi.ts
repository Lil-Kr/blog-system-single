import { PREFIX_URL_SYS_MENU } from '@/config'
import AuthApi, { PermissionType } from '@/types/apis/sys/menu/permissionType'
import { Result } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const authApi: AuthApi = {
  permission() {
    return baseAxiosRequest.get<Result<PermissionType>>(PREFIX_URL_SYS_MENU + '/permission', {})
  }
}

export { authApi }
