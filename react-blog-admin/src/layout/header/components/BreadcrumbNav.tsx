import React, { useMemo } from 'react'
import {useLocation} from 'oh-router-react'
import { RootState, useAppSelector } from '@/redux'
import { Breadcrumb } from 'antd'

const BreadcrumbNav = () => {
	const { pathname } = useLocation()
  
  const breadcrumbMap: Map<string, string[]> = useAppSelector((state: RootState) => state.breadcrumb.breadcrumbMap)

	/**
   * get breadcrumbMap from redux
   */
	const breadcrumbs: string[] = breadcrumbMap.get(pathname) || []
	return (
		<>
			<Breadcrumb>
				{breadcrumbs.map((item: string, index: number) => {
					return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
				})}
			</Breadcrumb>
		</>
	)
}

export default BreadcrumbNav
