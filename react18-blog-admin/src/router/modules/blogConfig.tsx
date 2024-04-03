import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { BookOutlined, SendOutlined, SnippetsOutlined } from '@ant-design/icons'
import { lazy } from 'react'

const blogConfig: RouterItemType[] = [
  {
    meta: {
      key: '/blog',
      title: '博客管理',
      layout: false,
      icon: <BookOutlined />
    },
    path: 'blog',
    children: [
      {
        meta: { key: 'blog-index', title: 'blog-index' },
        index: true,
        element: LazyLoad(lazy(() => import('@/views/blog/Blog')))
      },
      {
        meta: {
          key: '/index',
          title: '发布博客',
          layout: false,
          icon: <SendOutlined />
        },
        path: 'index',
        element: LazyLoad(lazy(() => import('@/views/blog/Blog')))
      },
      {
        meta: {
          key: '/label',
          title: '标签管理',
          layout: false,
          icon: <SnippetsOutlined />
        },
        path: 'label',
        element: LazyLoad(lazy(() => import('@/views/blog//label/BlogLabel')))
      }
    ]
  }
]

export { blogConfig }
