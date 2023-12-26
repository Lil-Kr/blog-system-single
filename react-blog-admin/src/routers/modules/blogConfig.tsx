import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'

import { lazyLoadUtil } from '@/utils/router'
import { UserOutlined } from '@ant-design/icons'

const blogConfig: RouteItemType[] = [
	{
		meta: {
			title: '博客管理',
			key: '/blog',
			icon: <UserOutlined />
		},
		children: [
			{
				meta: {
					title: '博客管理',
					key: '/index',
					icon: <UserOutlined />
				},
				path: '/index',
				element: lazyLoadUtil(lazy(() => import('@/views/blog')))
			}
		]
	}
]

export default blogConfig
