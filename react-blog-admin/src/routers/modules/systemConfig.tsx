import LazyLoad from "@/routers/component/LazyLoad"
import { OhRouterItemType } from "@/types/router/routeType"
import { UploadOutlined, UserOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { lazy } from "react"

const systemRouterConfig = new Router({
  routes:[
    {
      meta: {
        key: '/system',
        icon: <UploadOutlined />,
        layout: false,
        title: '系统管理'
      },
      path:'system',
      children:[
        {
          meta:{key:'system-index'},
          index: true,
          element: LazyLoad(lazy(() => import('@/views/system')))
        },
        {
          meta: {
            key: '/configuration',
            title: '系统配置',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'configuration',
          element: LazyLoad(lazy(() => import('@/views/system')))
        },
        {
          meta: {
            key: '/params',
            title: '参数配置',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'params',
          element: LazyLoad(lazy(() => import('@/views/system/Params')))
        },
        {
          meta: {
            key: '/dict',
            title: '字典管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'dict',
          element: LazyLoad(lazy(() => import('@/views/system/Dict')))
        },
        {
          meta: {
            key: '/about',
            title: '关于我',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'about',
          element: LazyLoad(lazy(() => import('@/views/system/About')))
        }
      ]
    }
  ]
})

const systemConfig: OhRouterItemType[] = systemRouterConfig.getRoutes()

export { systemRouterConfig, systemConfig}