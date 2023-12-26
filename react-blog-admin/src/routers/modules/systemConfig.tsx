import React, { Suspense, lazy } from 'react'
import { RouteItemType } from '@/types/router/routeType'

import { lazyLoadUtil } from '@/utils/router'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'

const systemConfig: RouteItemType[] = [
	{
		meta: {
			key: '/system',
			icon: <UploadOutlined />,
			title: '系统管理'
		},
		children: [
			{
				meta: {
					key: '/configuration',
					title: '系统配置',
					icon: <UserOutlined />
				},
				path: '/configuration',
				element: lazyLoadUtil(lazy(() => import('@/views/system')))
			}
		]
	}
]

export default systemConfig
