import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { RootState, useAppSelector } from '@/redux'
import { Breadcrumb } from 'antd'

const BreadcrumbNav = () => {
	const { pathname } = useLocation()
	// get breadcrumbMap from redux
	const { breadcrumbMap } = useAppSelector((state: RootState) => state.breadcrumb)
	const breadcrumbs: string[] = breadcrumbMap.get(pathname) || []

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>{`首页`}</Breadcrumb.Item>
				{breadcrumbs.map((item: string, index: number) => {
					return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
				})}
			</Breadcrumb>
		</>
	)
}

export default BreadcrumbNav
