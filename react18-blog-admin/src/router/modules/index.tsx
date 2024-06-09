import Router from 'oh-router'

import { UserOutlined } from '@ant-design/icons'
import LazyLoad from '@/components/router/LazyLoad'
import { lazy } from 'react'
import { blogConfig } from './blogConfig'
import { RouterItemType } from '@/types/router/routeType'
import { homeConfig } from './homeConfig'
import { compsConfig } from './compsConfig'
import { aideToolsConfig } from './aideToolsConfig'
import { portalConfig } from './portalConfig'
import { imageToolsConfig } from './imageToolsConfig'

const busConfig: RouterItemType[] = [
  {
    meta: {
      key: '/admin',
      title: '主框架',
      layout: true,
      icon: <UserOutlined />
    },
    path: '/admin',
    element: LazyLoad(lazy(() => import('@/layout/MainLayout'))),
    children: [...homeConfig, ...blogConfig, ...imageToolsConfig, ...portalConfig, ...compsConfig, ...aideToolsConfig]
  }
]

export { busConfig }
