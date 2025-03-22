import { BaseApi } from '@/types/apis'
import { Result } from '@/types/base/response'

interface MenuTreeType {
  key: string
  title: string
  path: string
  uniqueSign: string
  children: MenuTreeType[] | []
}

interface PermissionType {
  menuList: MenuTreeType[] | []
  btnSignList: string[] | []
}

/**
 * permission() ==> 返回菜单权限和按钮权限
 */
export default interface AuthApi extends BaseApi {
  permission(): Promise<Result<PermissionType>>
}

export type { MenuTreeType, PermissionType }
