import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'
import { SvgIcon } from '@/assets/images'

import LazyLoad from '@/routers/component/LazyLoad'
import { UserOutlined } from '@ant-design/icons'

const homeConfig: RouteItemType[] = [
	{
		meta: {
			key: '/home',
			icon: <UserOutlined />,
			title: '首页'
		},
		path: '/home',
		element: LazyLoad(lazy(() => import('@/views/home')))
	}
]

export default homeConfig
