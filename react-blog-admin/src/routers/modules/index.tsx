import LazyLoad from "@/routers/component/LazyLoad"
import { UserOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { lazy } from "react"
import {homeConfig} from './homeConfig'
import { userConfig} from './userConfig'
import { logConfig} from './logConfig'
import { blogConfig } from './blogConfig'
import { pictureConfig } from './pictureConfig'
import { compsConfig } from './compsConfig'
import { systemConfig } from './systemConfig'
import { permissionConfig } from './permissionConfig'
import { OhRouterItemType } from "@/types/router/routeType"

const busRouterConfig: any = new Router({
  routes: [
    {
      meta: {
        key: '/main',
        title: '主框架',
        layout: true,
        icon: <UserOutlined />
      },
      path:'main',
      element: LazyLoad(lazy(() => import('@/layout'))),
      children: [
        ...homeConfig,
        ...blogConfig,
        ...userConfig,
        ...pictureConfig,
        ...compsConfig,
        ...logConfig,
        ...systemConfig,
        ...permissionConfig
      ]
    }
  ]
})

const busConfig: OhRouterItemType[] = busRouterConfig.getRoutes()

export {busRouterConfig, busConfig}