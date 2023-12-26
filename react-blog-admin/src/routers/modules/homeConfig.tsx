import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'
import { SvgIcon } from '@/assets/images'

import { lazyLoadUtil } from '@/utils/router'
import { UserOutlined } from '@ant-design/icons'

const homeConfig: RouteItemType[] = [
	{
		meta: {
			key: '/home',
			icon: <UserOutlined />,
			// icon: <SvgIcon name={'article-create'} color={null} />,
			title: '首页'
		},
		path: '/home',
		element: lazyLoadUtil(lazy(() => import('@/views/home')))
	}
]

export default homeConfig
