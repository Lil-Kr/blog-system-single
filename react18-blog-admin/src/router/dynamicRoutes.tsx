import Router from 'oh-router'
import { getBreadCrumbItems, getRouterMenuItems, getTabsMap } from '@/utils/common'
import { BreadcrumbType } from '@/types/common/breadcrumbType'
import { loginCheckMiddleware } from './middleware/authCheck'
import { baseRouterConfig } from '@/router/baseRouterConfig'
import { useRouterStore } from '@/store/router/routerStore'
import { useTokenStore } from '@/store/login'
import { useEffect } from 'react'
import { authApi } from '@/apis/sys/authApi'
import { PermissionType } from '@/types/apis/sys/menu/permissionType'
import { RouterItemType } from '@/types/router/routeType'
import { transformMenuTree, transformTypeToSeletor } from '@/utils/sys/treeUtils'
import { useBreadcrumbStore } from '@/store/global'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { dictApi } from '@/apis/sys/dictApi'
import { OptionType } from '@/types/apis'
import { aclModuleApi } from '@/apis/sys'
import { useAclModuleStore, useDictDetailStore } from '@/store/global/initDictStore'
import { usePermissionsStore } from '@/store/sys/authStore'

/**
 * 动态路由配置与加载
 * 数据初始化
 */
const dynamicRoutes = () => {
  const { token } = useTokenStore()
  const { setMenuTree, setBtnSignSet, setMenuItems, setTabMap } = usePermissionsStore()
  const { rootRouterConfig, setRootRouterConfig, setRootConfig } = useRouterStore()
  const { setBreadcrumbMap } = useBreadcrumbStore()
  const { setDictMap, setDictStatueType, setAclType, setRoleType } = useDictDetailStore()
  const { setAclModuleSeletor } = useAclModuleStore()

  /**
   * 初始化用户菜单
   */
  const initUserPermission = async (): Promise<PermissionType> => {
    const res = await authApi.permission()
    const { code, data } = res
    if (code !== 200) {
      return {} as PermissionType
    }
    return data
  }

  /**
   * 初始化字典数据
   */
  const initDictList = async (): Promise<Map<string, DictMapType[]>> => {
    const dictTree = await dictApi.dictDetailTree()
    const { code, data } = dictTree

    if (code !== 200) {
      return new Map<string, DictMapType[]>()
    }
    return new Map(Object.entries(data))
  }

  /**
   * 初始化权限模块数据
   */
  const initAclModuleList = async (): Promise<OptionType[]> => {
    const aclModules = await aclModuleApi.aclModuleList({})
    const { code, data } = aclModules
    if (code !== 200) {
      return []
    }
    let aclModuleList: OptionType[] = data.map(({ surrogateId, name }) => ({
      value: surrogateId,
      label: name
    }))
    aclModuleList.push({
      value: '0',
      label: '-'
    })
    return aclModuleList
  }

  useEffect(() => {
    if (token && token !== '') {
      /**
       * 初始化用户数据
       */
      const updateRouterConfig = async () => {
        // 原始菜单数据和按钮权限数据
        const resPermission = await initUserPermission()
        const { menuList, btnSignList } = resPermission
        setMenuTree(menuList)
        setBtnSignSet(btnSignList)

        // 转换菜单数据, 菜单UI识别
        const newRootConfig: RouterItemType[] = transformMenuTree(menuList)
        setRootConfig(newRootConfig)

        // 构建新的路由表对象
        const newRouterConfig = baseRouterConfig.map(router => {
          if (router.path === '/admin') {
            router.children = [...newRootConfig]
          }
          return router
        })
        const newRouter: Router<{}> = new Router({
          middlewares: [loginCheckMiddleware],
          routes: newRouterConfig
        })
        setRootRouterConfig(newRouter)

        // 构建菜单数据
        const menuItems = getRouterMenuItems(newRouterConfig)
        setMenuItems(menuItems)

        // 构建面包屑数据
        // todo: map中的value丢失数据, 待修复
        const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(newRouterConfig)
        setBreadcrumbMap(breadcrumbMap)

        // 构建Tabs数据
        const tabMap = getTabsMap(breadcrumbMap)
        setTabMap(tabMap)
      }

      /**
       * 初始化字典数据
       */
      const initDictMap = async () => {
        /**
         * 初始化字典表
         */
        const dictMap: Map<string, DictMapType[]> = await initDictList()
        setDictMap(dictMap)

        /**
         * 初始化数据字典[状态类型]
         */
        const statusTypes: DictMapType[] = dictMap.get('状态类型') ?? []
        const statusTypeSelecor = transformTypeToSeletor(statusTypes)
        setDictStatueType(statusTypeSelecor)

        /**
         * 初始化数据字典[权限类型]
         */
        const aclTypes: DictMapType[] = dictMap.get('权限点类型') ?? []
        const aclTypeSelecor = transformTypeToSeletor(aclTypes)
        setAclType(aclTypeSelecor)

        /**
         * 查询数据字典[角色类型]
         */
        const roleTypes = dictMap.get('角色类型') ?? []
        const roleType = transformTypeToSeletor(roleTypes)
        setRoleType(roleType)
      }

      /**
       * 初始化权限模块数据
       */
      const initAclModule = async () => {
        const aclModuleSelector = await initAclModuleList()
        setAclModuleSeletor(aclModuleSelector)
      }

      updateRouterConfig()
      initDictMap()
      initAclModule()
    }
  }, [token])

  return { rootRouterConfig }
}

export { dynamicRoutes }
