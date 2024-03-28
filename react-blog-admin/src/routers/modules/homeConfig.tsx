import { lazy } from "react"
import LazyLoad from "@/routers/component/LazyLoad"
import { UserOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { OhRouterItemType } from "@/types/router/routeType"

const homeRouterConfig = new Router({
  routes:[
    {
      meta: {
        key:'/home',
        title: '首页',
        layout: false,
        icon: <UserOutlined />
      },
      path: 'home',
      element: LazyLoad(lazy(() => import('@/views/home')))
    }
  ]
})

const homeConfig: OhRouterItemType[] = homeRouterConfig.getRoutes()

export { homeRouterConfig, homeConfig}