import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'

import LazyLoad from '@/routers/component/LazyLoad'
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
					key: '/index',
					title: '发布博客',
					icon: <UserOutlined />
				},
				path: '/index',
				element: LazyLoad(lazy(() => import('@/views/blog')))
			},
			{
				meta: {
					key: '/share',
					title: '分享博客',
					icon: <UserOutlined />
				},
				path: '/share',
				element: LazyLoad(lazy(() => import('@/views/blog')))
			}
		]
	}
]

export default blogConfig
