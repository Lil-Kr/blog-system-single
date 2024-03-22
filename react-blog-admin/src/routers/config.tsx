import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'
import { lazyLoadUtil } from '@/utils/router'
import busConfig, { testConfig, homeConfig } from './modules'
import { handleRouterItems } from '@/utils/router/routerCommonUtil'
import { UserOutlined } from '@ant-design/icons'
import { getBreadCrumbItems, getMenuItems, getTabsMap } from '@/utils/common'
import Login from '@/views/login'

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
		// redirect: <Navigate to="/login" replace={true} />
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
	...busConfig
]

/**
 * handle router structure
 */
const routers = handleRouterItems(routersConfig)
console.log('--> 处理后的路由表:', routers)

/**
 * generate menu structure by router
 * // todo: 后续由后端直接返回, 或者返回后再处理
 */
const menuItems = getMenuItems(routersConfig)
console.log('--> 处理后的菜单结构:', menuItems)

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
export { routersConfig, routers, menuItems, breadcrumbMap, tabMap }
