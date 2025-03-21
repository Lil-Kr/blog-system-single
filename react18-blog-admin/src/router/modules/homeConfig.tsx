import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { lazy } from 'react'
import { componentMap, iconMap } from '../config/configMappings'

const homeConfig: RouterItemType[] = [
  {
    meta: {
      key: '/home',
      title: '首页',
      layout: false,
      icon: iconMap['_admin_home']
    },
    path: '/admin/home',
    element: LazyLoad(componentMap['_admin_home'])
  }
]

export { homeConfig }
