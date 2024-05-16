import { RouterItemType } from '@/types/router/routeType'
import { lazy } from 'react'
import LazyLoad from '@/components/router/LazyLoad'
import Router from 'oh-router'

const rootConfig: RouterItemType[] = [
  {
    meta: {
      key: '/',
      title: 'main',
      layout: false,
      icon: ''
    },
    path: '/',
    element: LazyLoad(lazy(() => import('@/layouts/MainLayout')))
  },
  {
    meta: {
      key: '/home',
      title: '首页',
      layout: false,
      icon: ''
    },
    path: 'home',
    element: LazyLoad(lazy(() => import('@/pages/home/Home')))
  },
  {
    meta: {
      key: '/about',
      title: '关于',
      layout: false,
      icon: ''
    },
    path: 'about',
    element: LazyLoad(lazy(() => import('@/pages/about/About')))
  }
]

/**
 * create router
 */
const rootRouterConfig: Router<{}> = new Router({
  // middlewares: [new LoginCheckMiddleware()],
  routes: rootConfig
})

export { rootRouterConfig, rootConfig }
