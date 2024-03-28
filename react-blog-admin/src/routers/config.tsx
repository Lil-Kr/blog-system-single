
import Router from "oh-router"
import { busConfig} from '@/routers//modules'
import { UserOutlined } from "@ant-design/icons"
import { lazy } from "react"
import LazyLoad from '@/routers/component/LazyLoad'
import { LoginCheckMiddleware } from '@/routers/middleware/authCheck'
import { getOhRouterMenuItems, getBreadCrumbItems, getTabsMap } from "@/utils/common"

const rootRouterConfig = new Router({
  middlewares: [new LoginCheckMiddleware()],
  routes:[
    {
      meta:{
        key:'/',
        title: '重定向到登录页',
        layout: false,
        icon: <UserOutlined />
      },
      path: '/',
      redirect: '/login'
    },
    {
      meta: {
        key: '/login',
        title: '登录',
        layout: false,
        icon: ''
      },
      path: '/login',
      element: LazyLoad(lazy(() => import('@/views/login')))
    },
    {
      meta: {
        key: '*',
        title: '404',
        layout: false,
        icon: ''
      },
      path: '*',
      element: LazyLoad(lazy(() => import('@/views/error')))
    },
    ...busConfig
  ]
})

const rootConfig: any[] = rootRouterConfig.getRoutes()

const ohRouter =  rootConfig
console.log('--> oh-router 配置: ', ohRouter)

const menuItems = getOhRouterMenuItems(rootConfig)
console.log('--> oh-router 处理后的路由信息, 提供菜单使用: ', menuItems)

/**
 * TODO: 通过导出的方式发现, get(key) => 得到的value变少, 比如: 应该得到 ['a',b',c'], 却得到 ['a','b']
 * 通过到处
 */
const breadcrumbMap: Map<string, string[]> = getBreadCrumbItems(rootConfig)
console.log('--> oh-router 处理后的面包屑结构: ', breadcrumbMap)

const tabMap = getTabsMap(breadcrumbMap)
console.log('--> oh-router 处理后的Tab结构:', tabMap)

const config = () => {
	return <></>
}

export default config

export {rootRouterConfig, rootConfig}
export { menuItems, breadcrumbMap, tabMap }
