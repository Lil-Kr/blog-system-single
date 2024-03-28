import LazyLoad from "@/routers/component/LazyLoad"
import { OhRouterItemType } from "@/types/router/routeType"
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { lazy } from "react"

const permissionRouterConfig = new Router({
  routes: [
    {
      meta: {
        key: '/permission',
        title: '权限管理',
        layout: false,
        icon: <UserOutlined />
      },
      path:'permission',
      children: [
        {
          meta:{key:'permission-index'},
          index: true,
          element: LazyLoad(lazy(() => import('@/views/permission/Menu')))
        },
        {
          meta: {
            key: '/menu',
            title: '菜单管理',
            layout: false,
            icon: <VideoCameraOutlined />
          },
          path: 'menu',
          element: LazyLoad(lazy(() => import('@/views/permission/Menu')))
        },
        {
          meta: {
            key: '/role',
            title: '角色管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'role',
          element: LazyLoad(lazy(() => import('@/views/permission/Role')))
        },
        {
          meta: {
            key: '/btn',
            title: '按钮管理',
            layout: false,
            icon: <UserOutlined />
          },
          path:'btn',
          children: [
            {
              meta:{key:'btn-index'},
              index: true,
              element: LazyLoad(lazy(() => import('@/views/permission/Button1')))
            },
            {
              meta: {
                key: '/btn-1',
                title: '按钮管理-1',
                layout: false,
                icon: <UserOutlined />
              },
              path: 'btn-1',
              element: LazyLoad(lazy(() => import('@/views/permission/Button1')))
            },
            {
              meta: {
                key: '/btn-2',
                title: '按钮管理-2',
                layout: false,
                icon: <UserOutlined />
              },
              path: 'btn-2',
              element: LazyLoad(lazy(() => import('@/views/permission/Button2')))
            }
          ]
        }
      ]
    }
  ]
})

const permissionConfig: OhRouterItemType[] = permissionRouterConfig.getRoutes()

export { permissionRouterConfig, permissionConfig}
