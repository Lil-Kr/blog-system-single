import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { BookOutlined, UnorderedListOutlined, TagsOutlined, SnippetsOutlined, SlidersOutlined } from '@ant-design/icons'
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
        element: LazyLoad(lazy(() => import('@/views/blog/publish/BlogList')))
      },
      {
        meta: {
          key: '/index',
          title: '博客列表',
          layout: false,
          icon: <UnorderedListOutlined />
        },
        path: 'index',
        element: LazyLoad(lazy(() => import('@/views/blog/publish/BlogList')))
      },
      {
        meta: {
          key: '/label',
          title: '标签管理',
          layout: false,
          icon: <TagsOutlined />
        },
        path: 'label',
        element: LazyLoad(lazy(() => import('@/views/blog//label/BlogLabel')))
      },
      {
        meta: {
          key: '/category',
          title: '分类管理',
          layout: false,
          icon: <SnippetsOutlined />
        },
        path: 'category',
        element: LazyLoad(lazy(() => import('@/views/blog/category/BlogCategory')))
      },
      {
        meta: {
          key: '/topic',
          title: '专题管理',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'topic',
        element: LazyLoad(lazy(() => import('@/views/blog/topic/BlogTopic')))
      }
    ]
  }
]

export { blogConfig }
