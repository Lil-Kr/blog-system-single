import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { BookOutlined, SendOutlined, SnippetsOutlined } from '@ant-design/icons'
import { lazy } from 'react'

const homeConfig: RouterItemType[] = [
  {
    meta: {
      key: '/home',
      title: '首页',
      layout: false,
      icon: <BookOutlined />
    },
    path: 'home',
    element: LazyLoad(lazy(() => import('@/views/home')))
  }
]

export { homeConfig }
