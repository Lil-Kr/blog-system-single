import LazyLoad from "@/routers/component/LazyLoad"
import { OhRouterItemType } from "@/types/router/routeType"
import { UserOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { lazy } from "react"

const logRouterConfig = new Router({
  routes:[
    {
      meta: {
        key:'/logs',
        title: '日志管理',
        layout: false,
        icon: <UserOutlined />
      },
      path:'logs',
      children: [
        {
          meta:{key:'logs-index', title:'logs-index'},
          index: true,
          element: LazyLoad(lazy(() => import('@/views/logs/SystemLogs')))
        },
        {
          meta: {
            key: '/index',
            title: '系统日志',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'index',
          element: LazyLoad(lazy(() => import('@/views/logs/SystemLogs')))
        },
        {
          meta: {
            key: '/operat',
            title: '操作日志',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'operat',
          element: LazyLoad(lazy(() => import('@/views/logs/OperatLogs')))
        }
      ]
    }
  ]
})

const logConfig: OhRouterItemType[] = logRouterConfig.getRoutes()

export { logRouterConfig, logConfig}