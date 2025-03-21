import { BaseApi } from '@/types/apis'
import { Result } from '@/types/base/response'

type MenuType = {
  key: string
  title: string
  path: string
  uniqueSign: string
  children: MenuType[] | []
}

export default interface MenuApi extends BaseApi {
  menuTree(): Promise<Result<MenuType[]>>
}

export type { MenuType }
