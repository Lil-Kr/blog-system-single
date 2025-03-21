import { PREFIX_URL_SYS_MENU } from '@/config'
import MenuApi, { MenuType } from '@/types/apis/sys/menu/menuType'
import { Result } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const menuApi: MenuApi = {
  menuTree() {
    return baseAxiosRequest.get<Result<MenuType[]>>(PREFIX_URL_SYS_MENU + '/menuTree', {})
  }
}

export { menuApi }
