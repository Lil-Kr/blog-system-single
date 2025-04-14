import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { UserOutlined } from '@ant-design/icons'
import { lazy } from 'react'
import { homeConfig } from './modules/homeConfig'

const baseRouterConfig: RouterItemType[] = [
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
      key: '/',
      title: 'redirect to admin login',
      layout: false,
      icon: <UserOutlined />
    },
    path: '/',
    redirect: '/admin/home'
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
    name:'admin-base',
    path: '/admin',
    element: LazyLoad(lazy(() => import('@/layout/MainLayout'))),
    children: []
  }
]

export { baseRouterConfig }
