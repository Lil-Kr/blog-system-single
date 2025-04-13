import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import {
  ToolOutlined,
  MenuOutlined,
  DatabaseOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ApartmentOutlined,
  UserSwitchOutlined,
  MergeCellsOutlined,
  SlidersOutlined
} from '@ant-design/icons'
import { lazy } from 'react'

const sysConfig: RouterItemType[] = [
  {
    meta: {
      key: '/sys',
      title: '系统管理',
      layout: false,
      icon: <ToolOutlined />
    },
    path: '/admin/sys',
    children: [
      {
        meta: { key: 'sys-index', title: 'sys-index' },
        index: true,
        element: LazyLoad(lazy(() => import('@/views/sys/user/User')))
      },
      {
        meta: {
          key: '/index',
          title: '用户管理',
          layout: false,
          icon: <UserOutlined />
        },
        path: '/admin/sys/index',
        element: LazyLoad(lazy(() => import('@/views/sys/user/User')))
      },
      {
        meta: {
          key: '/org',
          title: '组织管理',
          layout: false,
          icon: <ApartmentOutlined />
        },
        path: '/admin/sys/org',
        element: LazyLoad(lazy(() => import('@/views/sys/org/Org')))
      },
      {
        meta: {
          key: '/role',
          title: '角色管理',
          layout: false,
          icon: <UserSwitchOutlined />
        },
        path: '/admin/sys/role',
        element: LazyLoad(lazy(() => import('@/views/sys/role/Role')))
      },
      {
        meta: {
          key: '/acl',
          title: '权限管理',
          layout: false,
          icon: <MergeCellsOutlined />
        },
        path: '/admin/sys/acl',
        element: LazyLoad(lazy(() => import('@/views/sys/acl/Acl')))
      },
      {
        meta: {
          key: '/dict',
          title: '数据字典',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: '/admin/sys/dict',
        element: LazyLoad(lazy(() => import('@/views/sys/dict/Dict')))
      }
    ]
  }
]

export { sysConfig }
