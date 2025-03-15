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

const aclConfig: RouterItemType[] = [
  {
    meta: {
      key: '/sys',
      title: '系统管理',
      layout: false,
      icon: <ToolOutlined />
    },
    path: 'sys',
    children: [
      {
        meta: { key: 'sys-index', title: 'sys-index' },
        index: true,
        element: LazyLoad(lazy(() => import('@/views/sys/User')))
      },
      {
        meta: {
          key: '/index',
          title: '用户管理',
          layout: false,
          icon: <UserOutlined />
        },
        path: 'index',
        element: LazyLoad(lazy(() => import('@/views/sys/User')))
      },
      {
        meta: {
          key: '/org',
          title: '组织管理',
          layout: false,
          icon: <ApartmentOutlined />
        },
        path: 'org',
        element: LazyLoad(lazy(() => import('@/views/sys/Org')))
      },
      // {
      //   meta: {
      //     key: '/menu',
      //     title: '菜单管理',
      //     layout: false,
      //     icon: <MenuOutlined />
      //   },
      //   path: 'menu',
      //   element: LazyLoad(lazy(() => import('@/views/sys/Menu')))
      // },
      {
        meta: {
          key: '/role',
          title: '角色管理',
          layout: false,
          icon: <UserSwitchOutlined />
        },
        path: 'role',
        element: LazyLoad(lazy(() => import('@/views/sys/role/Role')))
      },
      {
        meta: {
          key: '/acl',
          title: '权限管理',
          layout: false,
          icon: <MergeCellsOutlined />
        },
        path: 'acl',
        element: LazyLoad(lazy(() => import('@/views/sys/Acl')))
      },
      {
        meta: {
          key: '/dict',
          title: '数据字典',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'dict',
        element: LazyLoad(lazy(() => import('@/views/sys/Dict')))
      }
    ]
  }
]

export { aclConfig }
