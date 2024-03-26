import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'
import LazyLoad from '@/routers/component/LazyLoad'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const testConfig: RouteItemType[] = [
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
			title: '登录',
			icon: <UserOutlined />
		},
		path: '/login',
		element: LazyLoad(lazy(() => import('@/views/login')))
	},
	{
		meta: {
			key: '/main',
			title: '主框架页面',
			icon: <UserOutlined />
		},
		layout: LazyLoad(lazy(() => import('@/layout'))),
		children: [
			{
				meta: {
					key: '/home',
					icon: <UserOutlined />,
					title: '首页'
				},
				path: '/home',
				element: LazyLoad(lazy(() => import('@/views/home')))
			},
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
						element: LazyLoad(lazy(() => import('@/views/permission/Menu')))
					},
					{
						meta: {
							key: '/role',
							title: '角色管理',
							icon: <UserOutlined />
						},
						path: '/role',
						element: LazyLoad(lazy(() => import('@/views/permission/Role')))
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
								element: LazyLoad(lazy(() => import('@/views/permission/Button1')))
							},
							{
								meta: {
									key: '/btn-2',
									title: '按钮管理-2',
									icon: <UserOutlined />
								},
								path: '/btn-2',
								element: LazyLoad(lazy(() => import('@/views/permission/Button2')))
							}
						]
					}
				]
			}
		]
	}
]

export default testConfig
