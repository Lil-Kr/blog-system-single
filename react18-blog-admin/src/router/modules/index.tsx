import Router from 'oh-router'

import { UserOutlined } from '@ant-design/icons'
import LazyLoad from '@/components/router/LazyLoad'
import { lazy } from 'react'
import { blogConfig } from './blogConfig'
import { RouterItemType } from '@/types/router/routeType'
import { homeConfig } from './homeConfig'
import { compsConfig } from './compsConfig'

const busConfig: RouterItemType[] = [
  {
    meta: {
      key: '/main',
      title: '主框架',
      layout: true,
      icon: <UserOutlined />
    },
    path: 'main',
    element: LazyLoad(lazy(() => import('@/layout/MainLayout'))),
    children: [...homeConfig, ...blogConfig, ...compsConfig]
  }
]

export { busConfig }
