import Router from 'oh-router'
import { LoginCheckMiddleware } from '@/router/middleware/authCheck'
import LazyLoad from '@/components/router/LazyLoad'
import { lazy } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { busConfig } from './modules'
import { RouterItemType, RouterMetaType } from '@/types/router/routeType'

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

export { rootRouterConfig, rootConfig }
