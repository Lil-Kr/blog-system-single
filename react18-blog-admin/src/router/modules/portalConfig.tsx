import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { BookOutlined, SendOutlined, SnippetsOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'

const portalConfig: RouterItemType[] = [
  {
    meta: {
      key: '/protal',
      title: '门户管理',
      layout: false,
      icon: <BookOutlined />
    },
    path: 'protal',
    // element: LazyLoad(lazy(() => import('@/views/home')))
  }
]

export { portalConfig }
