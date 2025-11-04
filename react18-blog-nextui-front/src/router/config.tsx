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
    path: '/'
  },
  {
    meta: {
      key: '/',
      title: 'blog-website',
      layout: false,
      icon: ''
    },
    path: '/',
    element: LazyLoad(lazy(() => import('@/layouts/MainLayout'))),
    children: [
      {
        meta: {
          key: '/',
          title: 'main-layout',
          layout: false,
          icon: ''
        },
        path: '',
        element: LazyLoad(lazy(() => import('@/pages/main/Main'))),
        children: [
          {
            index: true,
            element: LazyLoad(lazy(() => import('@/pages/home/Home')))
          },
          {
            meta: {
              key: '',
              title: '首页',
              layout: false,
              icon: ''
            },
            path: '',
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
          },
          // {
          //   meta: {
          //     key: '/timeline',
          //     title: '时间轴',
          //     layout: false,
          //     icon: ''
          //   },
          //   path: 'timeline',
          //   element: LazyLoad(lazy(() => import('@/pages/timeline/Timeline')))
          // }
        ]
      },
      {
        meta: {
          key: '/blog',
          title: '博客详情',
          layout: false,
          icon: ''
        },
        path: 'blog',
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
          title: '关于',
          layout: false,
          icon: ''
        },
        path: 'about',
        element: LazyLoad(lazy(() => import('@/pages/about/About')))
      },
      {
        meta: {
          key: '/resume',
          title: 'resume',
          layout: false,
          icon: ''
        },
        path: 'resume',
        element: LazyLoad(lazy(() => import('@/pages/resume/Resume')))
      }
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

export { rootRouterConfig, rootConfig }
