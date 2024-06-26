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
    redirect: '/blog/home'
  },
  {
    meta: {
      key: '/blog',
      title: 'blog-website',
      layout: false,
      icon: ''
    },
    path: '/blog',
    element: LazyLoad(lazy(() => import('@/layouts/MainLayout'))),
    children: [
      {
        meta: {
          key: '/main',
          title: 'main',
          layout: false,
          icon: ''
        },
        path: 'main',
        element: LazyLoad(lazy(() => import('@/pages/main/Main'))),
        children: [
          {
            index: true,
            element: LazyLoad(lazy(() => import('@/pages/home/Home')))
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
              key: '/blogs',
              title: '博客列表',
              layout: false,
              icon: ''
            },
            path: 'blogs',
            element: LazyLoad(lazy(() => import('@/pages/blog/BlogList')))
          },
          {
            meta: {
              key: '/category',
              title: '分类',
              layout: false,
              icon: ''
            },
            path: 'category',
            element: LazyLoad(lazy(() => import('@/pages/category/Category'))),
            children: [
              {
                meta: {
                  key: '/:id',
                  title: '分类-详情',
                  layout: false,
                  icon: ''
                },
                path: ':id',
                element: LazyLoad(lazy(() => import('@/pages/category/CategoryDetail')))
              }
            ]
          }
        ]
      },
      {
        meta: {
          key: '/detail',
          title: '博客详情',
          layout: false,
          icon: ''
        },
        path: 'detail',
        // element: LazyLoad(lazy(() => import('@/pages/blog/BlogDetails'))),
        children: [
          {
            meta: {
              key: '/:blogId',
              title: '',
              layout: false,
              icon: ''
            },
            path: ':blogId',
            element: LazyLoad(lazy(() => import('@/pages/blog/BlogDetails')))
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
      }
    ]
  },
  {
    meta: {
      key: '/navbar',
      title: '测试导航条',
      layout: false,
      icon: ''
    },
    path: 'navbar',
    element: LazyLoad(lazy(() => import('@/components/menu/NavBarHorizSubMenu')))
  },
  {
    meta: {
      key: '/imageCarouse',
      title: '测试图片轮播',
      layout: false,
      icon: ''
    },
    path: 'imageCarouse',
    element: LazyLoad(lazy(() => import('@/components/imageCarousel/CarouselBase')))
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
