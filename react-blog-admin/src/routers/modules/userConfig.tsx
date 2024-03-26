import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'
import LazyLoad from '@/routers/component/LazyLoad'
import { VideoCameraOutlined } from '@ant-design/icons'

const userConfig: RouteItemType[] = [
	{
		meta: {
			key: '/user',
			icon: <VideoCameraOutlined />,
			title: '用户管理'
		},
		children: [
			{
				meta: {
					key: '/userInfo',
					icon: <VideoCameraOutlined />,
					title: '用户信息'
				},
				path: '/user/user',
				element: LazyLoad(lazy(() => import('@/views/user/User')))
			},
			{
				meta: {
					key: '/touristische',
					icon: <VideoCameraOutlined />,
					title: '游客管理'
				},
				path: '/touristische',
				element: LazyLoad(lazy(() => import('@/views/user/Touristische')))
			}
		]
	}
]

export default userConfig
