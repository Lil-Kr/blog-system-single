import Router from 'oh-router'
import LazyLoad from '@/components/router/LazyLoad'
import { lazy } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { busConfig } from './modules'
import { RouterItemType } from '@/types/router/routeType'
import { getBreadCrumbItems, getRouterMenuItems, getTabsMap } from '@/utils/common'
import { BreadcrumbType } from '@/types/common/breadcrumbType'
import { homeConfig } from './modules/homeConfig'
import { sysConfig } from './modules/sysConfig'
import { aideToolsConfig } from './modules/aideToolsConfig'
import { blogConfig } from './modules/blogConfig'
import { compsConfig } from './modules/compsConfig'
import { imageToolsConfig } from './modules/imageToolsConfig'
import { portalConfig } from './modules/portalConfig'

/**
 * 后端动态生成
 */
const rootConfig1: RouterItemType[] = [
  {
    meta: {
      key: '/',
      title: 'redirect to home',
      layout: false,
      icon: <UserOutlined />
    },
    path: '/',
    redirect: '/login'
  },
  {
    meta: {
      key: '/admin/login',
      title: '登录',
      layout: false,
      icon: ''
    },
    path: '/admin/login',
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

const rootConfig: RouterItemType[] = [
  {
    meta: {
      key: '/',
      title: 'redirect to admin login',
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
    path: 'login',
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
  {
    meta: {
      key: '/admin',
      title: 'blog-admin',
      layout: true,
      icon: ''
    },
    path: '/admin',
    element: LazyLoad(lazy(() => import('@/layout/MainLayout'))),
    children: [
      ...homeConfig,
      ...blogConfig,
      ...imageToolsConfig,
      ...portalConfig,
      ...compsConfig,
      ...aideToolsConfig,
      ...sysConfig
    ]
  }
]

/**
 * create router
 */
const rootRouterConfig: Router<{}> = new Router({
  // middlewares: [new LoginCheckMiddleware()],
  routes: rootConfig
})

/**
 * 处理路由
 */
const menuItems = getRouterMenuItems(rootConfig)
// console.log('--> oh-router 处理后的路由信息, 提供菜单使用: ', menuItems)

/**
 * 通过导出的面包屑结构, 生成Tabs结构
 */
const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(rootConfig)
// console.log('--> oh-router 处理后的面包屑结构: ', breadcrumbMap)

const tabMap = getTabsMap(breadcrumbMap)
// console.log('--> oh-router 处理后的Tab结构:', tabMap)

export { rootRouterConfig, rootConfig }
export { menuItems, breadcrumbMap, tabMap }
