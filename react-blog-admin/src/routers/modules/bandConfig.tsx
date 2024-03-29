import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'

import LazyLoad from '@/routers/component/LazyLoad'
import { UserOutlined } from '@ant-design/icons'

const bandConfig: RouteItemType[] = [
	{
		meta: {
			key: '/band',
			title: '乐队管理',
			icon: <UserOutlined />
		},
		children: [
			{
				meta: {
					key: '/index',
					title: '乐队信息',
					icon: <UserOutlined />
				},
				path: '/index',
				element: LazyLoad(lazy(() => import('@/views/band')))
			}
		]
	}
]

export default bandConfig
