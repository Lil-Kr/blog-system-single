import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'

import LazyLoad from '@/routers/component/LazyLoad'
import homeConfig from './homeConfig'
import blogConfig from './blogConfig'
import bandConfig from './bandConfig'
import userConfig from './userConfig'
import systemConfig from './systemConfig'
import permissionConfig from './permissionConfig'
import testConfig from './testConfig'
import { UserOutlined } from '@ant-design/icons'

const busConfig: RouteItemType[] = [
	{
		meta: {
			key: '/main',
			title: '主框架页面',
			icon: <UserOutlined />
		},
		layout: LazyLoad(lazy(() => import('@/layout'))),
		children: [
			...homeConfig,
			...blogConfig,
			...bandConfig,
			...userConfig,
			...systemConfig,
			...permissionConfig
		]
	}
]

export default busConfig
export {
	homeConfig,
	blogConfig,
	bandConfig,
	userConfig,
	systemConfig,
	permissionConfig,
	testConfig
}
