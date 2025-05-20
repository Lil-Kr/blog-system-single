import Router from 'oh-router'
import { baseRouterConfig } from '@/router/baseRouterConfig'
import { LoginCheckMiddleware } from './middleware/loginCheck'
import { authApi } from '@/apis/sys/authApi'
import { PermissionType } from '@/types/apis/sys/menu/permissionType'
import { getBreadCrumbItems, getRouterMenuItems, getTabsMap } from '@/utils/common'
import { BreadcrumbType } from '@/types/common/breadcrumbType'
import { useTokenStore } from '@/store/login'
import { RouterItemType, RouterMetaType } from '@/types/router/routeType'
import { transformMenuTree } from '@/utils/sys/treeUtils'
import { useBreadcrumbStore, useMenuStore, useTabsStore } from '@/store/global'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { dictApi } from '@/apis/sys/dictApi'
import { OptionType } from '@/types/apis'
import { aclModuleApi } from '@/apis/sys'
import { useAclModuleStore } from '@/store/global/initDictStore'
import { usePermissionsStore } from '@/store/sys/authStore'
import { useDictDetailStore } from '@/store/sys/dictStore'
import { transformDictTypeToSeletor, transformTypeToSeletorById } from '@/utils/sys/transform'

/**
 * 创建路由
 */
const rootRouterConfig: Router<RouterMetaType> = new Router({
  middlewares: [new LoginCheckMiddleware()],
  routes: baseRouterConfig
})

/**
 * 请求用户权限数据
 * @returns
 */
const initUserPermission = async (): Promise<PermissionType> => {
  const res = await authApi.permission()
  const { code, data } = res
  if (!code || code !== 200) {
    return {} as PermissionType
  }
  return data
}

/**
 * 初始化字典数据
 */
const dictDetailMapping = async (): Promise<Map<string, DictMapType[]>> => {
  const dictTree = await dictApi.dictDetailMapping()
  const { code, data } = dictTree

  if (code !== 200) {
    return new Map<string, DictMapType[]>()
  }
  return new Map(Object.entries(data))
}

/**
 * 初始化字典数据
 */
const initDictMap = async () => {
  const setDictMap = useDictDetailStore.getState().setDictMap
  const setDictStatueType = useDictDetailStore.getState().setDictStatueType
  const setAclType = useDictDetailStore.getState().setAclType
  const setRoleType = useDictDetailStore.getState().setRoleType
  const setSwitchStatue = useDictDetailStore.getState().setSwitchStatue

  /**
   * 初始化字典表
   */
  const dictMap: Map<string, DictMapType[]> = await dictDetailMapping()
  setDictMap(dictMap)

  /**
   * 初始化数据字典[状态类型]
   */
  const statusTypes: DictMapType[] = dictMap.get('状态类型') ?? []
  const statusTypeSelecor = transformDictTypeToSeletor(statusTypes)
  setDictStatueType(statusTypeSelecor)

  /**
   * 初始化数据字典[权限类型]
   */
  const aclTypes: DictMapType[] = dictMap.get('权限点类型') ?? []
  const aclTypeSelecor = transformDictTypeToSeletor(aclTypes)
  setAclType(aclTypeSelecor)

  /**
   * 查询数据字典[角色类型]
   */
  const roleTypes = dictMap.get('角色类型') ?? []
  const roleType = transformDictTypeToSeletor(roleTypes)
  setRoleType(roleType)

  /**
   * 查询数据字典[角色类型]
   */
  const switchStatues = dictMap.get('开关') ?? []
  const switchStatue = transformTypeToSeletorById(switchStatues)
  setSwitchStatue(switchStatue)
}

/**
 * 重置路由信息, 用户权限信息
 * @param token
 */
const resetPermissionRouters = async (token?: string) => {
  if (token && token !== '') {
    const setMenuItems = usePermissionsStore.getState().setMenuItems
    const setBtnSignSet = usePermissionsStore.getState().setBtnSign
    const setBreadcrumbMap = useBreadcrumbStore.getState().setBreadcrumbMap
    const setTabMap = usePermissionsStore.getState().setTabMap

    // 请求后端权限数据
    const resPermission = await initUserPermission()
    const { menuList, btnSignList } = resPermission
    // 存储按钮权限数据
    setBtnSignSet(btnSignList)

    // 转为前端路由结构
    const newRootConfig: RouterItemType[] = transformMenuTree(menuList)
    const newRouterConfig = baseRouterConfig.map(router => {
      if (router.name === 'admin-base') {
        router.children = [...newRootConfig]
      }
      return router
    })
    rootRouterConfig.setRoutes(newRouterConfig)

    // 构建菜单数据
    const menuItems = getRouterMenuItems(rootRouterConfig.getRoutes())
    setMenuItems(menuItems)

    // 构建面包屑数据
    // todo: map中的value丢失数据, 待修复
    const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(rootRouterConfig.getRoutes())
    setBreadcrumbMap(breadcrumbMap)

    // 构建Tabs数据
    const tabMap = getTabsMap(breadcrumbMap)
    setTabMap(tabMap)
    // const firstEntry = Array.from(tabMap.entries())[0]
    // const [key, value] = firstEntry // 解构赋值
    // console.log('--> tab:', value)
    // setTabActive(value)

    /**
     * 初始化字典数据
     */
    initDictMap()
  } else {
    const resetPermissions = usePermissionsStore.getState().resetPermissions
    const resetBreadcrumbMap = useBreadcrumbStore.getState().resetBreadcrumbMap
    const restMenuState = useMenuStore.getState().restMenuState
    const resetTabs = useTabsStore.getState().resetTabs
    const clearToken = useTokenStore.getState().clearToken

    rootRouterConfig.setRoutes(baseRouterConfig)
    // 退出登陆时重置所有信息
    clearToken()
    restMenuState()
    resetTabs()
    resetPermissions()
    resetBreadcrumbMap()
  }
  rootRouterConfig.rematch()
}

export { rootRouterConfig, resetPermissionRouters }
