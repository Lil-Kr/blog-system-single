import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'

import { lazyLoadUtil } from '@/utils/router'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const permissionConfig: RouteItemType[] = [
	{
		meta: {
			key: '/permission',
			title: '权限管理',
			icon: <UserOutlined />
		},
		children: [
			{
				meta: {
					key: '/menu',
					title: '菜单管理',
					icon: <VideoCameraOutlined />
				},
				path: '/menu',
				element: lazyLoadUtil(lazy(() => import('@/views/permission/Menu')))
			},
			{
				meta: {
					key: '/role',
					title: '角色管理',
					icon: <UserOutlined />
				},
				path: '/role',
				element: lazyLoadUtil(lazy(() => import('@/views/permission/Role')))
			},
			{
				meta: {
					key: '/btn',
					title: '按钮管理',
					icon: <UserOutlined />
				},
				children: [
					{
						meta: {
							key: '/btn-1',
							title: '按钮管理-1',
							icon: <UserOutlined />
						},
						path: '/btn-1',
						element: lazyLoadUtil(lazy(() => import('@/views/permission/Button1')))
					},
					{
						meta: {
							key: '/btn-2',
							title: '按钮管理-2',
							icon: <UserOutlined />
						},
						path: '/btn-2',
						element: lazyLoadUtil(lazy(() => import('@/views/permission/Button2')))
					}
				]
			}
		]
	}
]

export default permissionConfig
