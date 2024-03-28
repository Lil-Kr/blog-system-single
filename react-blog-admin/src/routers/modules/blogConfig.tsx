import LazyLoad from "@/routers/component/LazyLoad"
import { OhRouterItemType } from "@/types/router/routeType"
import { UserOutlined } from "@ant-design/icons"
import Router from "oh-router"
import { lazy } from "react"

const blogRouterConfig = new Router({
  routes:[
    {
      meta: {
        key:'/blog',
        title: '博客管理',
        layout: false,
        icon: <UserOutlined />
      },
      path:'blog',
      children: [
        {
          meta:{key:'blog-index', title:'blog-index'},
          index: true,
          element: LazyLoad(lazy(() => import('@/views/blog')))
        },
        {
          meta: {
            key: '/index',
            title: '发布博客',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'index',
          element: LazyLoad(lazy(() => import('@/views/blog')))
        },
        {
          meta: {
            key: '/share',
            title: '分享博客',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'share',
          element: LazyLoad(lazy(() => import('@/views/blog')))
        },
        {
          meta: {
            key: '/editor-rt',
            title: '富文本编辑器-1',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'editor-rt',
          element: LazyLoad(lazy(() => import('@/views/blog/BlogMd1')))
        },
        {
          meta: {
            key: '/editor-rt-2',
            title: '富文本编辑器-2',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'editor-rt-2',
          element: LazyLoad(lazy(() => import('@/views/blog/BlogMd2')))
        }
      ]
    }
  ]
})

const blogConfig: OhRouterItemType[] = blogRouterConfig.getRoutes()

export { blogRouterConfig, blogConfig}