import Router from 'oh-router'
import { LoginCheckMiddleware } from '@/router/middleware/authCheck'
import LazyLoad from '@/components/router/LazyLoad'
import { lazy } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { busConfig } from './modules'
import { RouterItemType, RouterMetaType } from '@/types/router/routeType'
import { getBreadCrumbItems, getRouterMenuItems, getTabsMap } from '@/utils/common'
import { useBreadcrumbStore } from '@/store/global'
import { BreadcrumbType } from '@/types/common/breadcrumbType'

// antd

const rootConfig: RouterItemType[] = [
  {
    meta: {
      key: '/',
      title: '重定向到登录页',
      layout: false,
      icon: <UserOutlined />
    },
    path: '/',
    redirect: '/login'
  },
  {
    meta: {
      key: '/login',
      title: '登录',
      layout: false,
      icon: ''
    },
    path: '/login',
    element: LazyLoad(lazy(() => import('@/views/login/Login')))
  },
  {
    meta: {
      key: '/403',
      title: '403',
      layout: false,
      icon: ''
    },
    path: '403',
    element: LazyLoad(lazy(() => import('@/views/error/Error403')))
  },
  {
    meta: {
      key: '/404',
      title: '404',
      layout: false,
      icon: ''
    },
    path: '404',
    element: LazyLoad(lazy(() => import('@/views/error/Error404')))
  },
  {
    meta: {
      key: '*',
      title: '*',
      layout: false,
      icon: ''
    },
    path: '*',
    element: LazyLoad(lazy(() => import('@/views/error/Error404')))
  },
  ...busConfig
]

/**
 * create router
 */
const rootRouterConfig: Router<{}> = new Router({
  middlewares: [new LoginCheckMiddleware()],
  routes: rootConfig
})

const menuItems = getRouterMenuItems(rootConfig)
console.log('--> oh-router 处理后的路由信息, 提供菜单使用: ', menuItems)

/**
 * // todo: 通过导出的方式发现, get(key) => 得到的value变少, 比如: 应该得到 ['a',b',c'], 却得到 ['a','b']
 * 通过到处
 */
const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(rootConfig)
console.log('--> oh-router 处理后的面包屑结构: ', breadcrumbMap)

const tabMap = getTabsMap(breadcrumbMap)
console.log('--> oh-router 处理后的Tab结构:', tabMap)

export { rootRouterConfig, rootConfig }
export { menuItems, breadcrumbMap, tabMap }
