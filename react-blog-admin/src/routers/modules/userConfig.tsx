import LazyLoad from "@/routers/component/LazyLoad"
import { OhRouterItemType } from "@/types/router/routeType"
import { UserOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { lazy } from "react"

const userRouterConfig = new Router({
  routes:[
    {
      meta: {
        key:'/user',
        title: '用户管理',
        layout: false,
        icon: <UserOutlined />
      },
      path:'user',
      children: [
        {
          meta:{key:'user-index', title:'user-index'},
          index: true,
          element: LazyLoad(lazy(() => import('@/views/user/User')))
        },
        {
          meta: {
            key: '/index',
            title: '用户管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'index',
          element: LazyLoad(lazy(() => import('@/views/user/User')))
        },
        {
          meta: {
            key: '/touristische',
            title: '游客管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'touristische',
          element: LazyLoad(lazy(() => import('@/views/user/Touristische')))
        }
      ]
    }
  ]
})

const userConfig: OhRouterItemType[] = userRouterConfig.getRoutes()

export { userRouterConfig, userConfig}