import { RouteItemType } from '@/types/router/routeType'
import busConfig, { testConfig, homeConfig } from './modules'
import { getRouterItems, getAllRoutersMap } from '@/utils/router'
import { UserOutlined } from '@ant-design/icons'
import { getBreadCrumbItems, getMenuItems, getTabsMap } from '@/utils/common'
import Login from '@/views/login'
import LazyLoad from './component/LazyLoad'
import { lazy } from 'react'

/**
 * original router config
 */
const routersConfig: RouteItemType[] = [
	{
		meta: {
			key: '/',
			title: '重定向到登录page',
			icon: <UserOutlined />
		},
		path: '/',
		redirect: '/login'
	},
	{
		meta: {
			key: '/login',
			title: '登录'
		},
		path: '/login',
		element: <Login />
	},
	{
		meta: {
			key: '*',
			title: '404'
		},
		path: '*',
    element: LazyLoad(lazy(() => import('@/views/error/BaseError')))
	},
	...busConfig
]

const routerAllMap = getAllRoutersMap(routersConfig)
console.log('--> 用户全局路由保护辅助的路由数据: ', routerAllMap)

/**
 * handle router structure
 */
const routers = getRouterItems(routersConfig)
console.log('--> 处理后的路由表:', routers)

/**
 * generate menu structure by router
 * // todo: 后续由后端直接返回, 或者返回后再处理
 */
const menuItems = getMenuItems(routersConfig)
console.log('--> 根据路由处理后的菜单结构:', menuItems)

/**
 * generate breadcrumb nav
 * // todo: 与后端联调时候, 可能需要再做处理
 */
const breadcrumbMap = getBreadCrumbItems(routersConfig)
console.log('--> 处理后的面包屑结构:', breadcrumbMap)

/**
 * generate tabs list from breadcrumb map
 * // todo: 与后端联调时候, 可能需要再做处理
 */
const tabMap = getTabsMap(breadcrumbMap)
console.log('--> 处理后的Tab结构:', tabMap)

const config = () => {
	return <></>
}


export default config
export { routersConfig, routers, menuItems, breadcrumbMap, tabMap, routerAllMap }
