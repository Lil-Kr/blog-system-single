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
            key: '/type',
            title: '分类管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'type',
          element: LazyLoad(lazy(() => import('@/views/blog/BlogType')))
        },
        {
          meta: {
            key: '/topics',
            title: '专题管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'topics',
          element: LazyLoad(lazy(() => import('@/views/blog/BlogTopics')))
        },
        {
          meta: {
            key: '/label',
            title: '标签管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'label',
          element: LazyLoad(lazy(() => import('@/views/blog/BlogLable')))
        },
        {
          meta: {
            key: '/recommend',
            title: '推荐管理',
            layout: false,
            icon: <UserOutlined />
          },
          path: 'recommend',
          element: LazyLoad(lazy(() => import('@/views/blog/BlogRecommend')))
        },
      ]
    }
  ]
})

const blogConfig: OhRouterItemType[] = blogRouterConfig.getRoutes()

export { blogRouterConfig, blogConfig}