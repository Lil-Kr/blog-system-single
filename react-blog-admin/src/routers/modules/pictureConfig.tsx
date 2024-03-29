import { lazy } from "react"
import LazyLoad from "@/routers/component/LazyLoad"
import { PictureOutlined,ColumnWidthOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { OhRouterItemType } from "@/types/router/routeType"

const pictureRouterConfig = new Router({
  routes:[
    {
      meta: {
        key:'/picture',
        title: '图片管理',
        layout: false,
        icon: <PictureOutlined />
      },
      path: 'picture',
      children:[
        {
          meta:{key:'picture-index', title:'picture-index'},
          index: true,
          element: LazyLoad(lazy(() => import('@/views/picture/Picture')))
        },
        {
          meta: {
            key: '/index',
            title: '图片管理',
            layout: false,
            icon: <PictureOutlined />
          },
          path: 'index',
          element: LazyLoad(lazy(() => import('@/views/picture/Picture')))
        },
        {
          meta: {
            key: '/type',
            title: '类别管理',
            layout: false,
            icon: <ColumnWidthOutlined />
          },
          path: 'type',
          element: LazyLoad(lazy(() => import('@/views/picture/PictureType')))
        },
      ]
    }
  ]
})

const pictureConfig: OhRouterItemType[] = pictureRouterConfig.getRoutes()

export { pictureRouterConfig, pictureConfig}