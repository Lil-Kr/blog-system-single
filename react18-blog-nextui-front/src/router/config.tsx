import { RouterItemType } from '@/types/router/routeType'
import { lazy } from 'react'
import LazyLoad from '@/components/router/LazyLoad'
import Router from 'oh-router'

const rootConfig: RouterItemType[] = [
  {
    meta: {
      key: '/',
      title: 'redirect to home',
      layout: false,
      icon: ''
    },
    path: '/',
    redirect: '/home'
  },
  {
    meta: {
      key: '/',
      title: 'home page',
      layout: false,
      icon: ''
    },
    path: '/',
    element: LazyLoad(lazy(() => import('@/layouts/MainLayout'))),
    children: [
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
          key: '/category',
          title: '分类',
          layout: false,
          icon: ''
        },
        path: 'category',
        element: LazyLoad(lazy(() => import('@/pages/category/Category')))
      }
    ]
  },
  {
    meta: {
      key: '/about',
      title: '关于我',
      layout: false,
      icon: ''
    },
    path: 'about',
    element: LazyLoad(lazy(() => import('@/pages/about/About')))
  },
  {
    meta: {
      key: '/navbar',
      title: '测试导航条',
      layout: false,
      icon: ''
    },
    path: 'navbar',
    element: LazyLoad(lazy(() => import('@/pages/testnavbar/NavBarTest')))
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
