import React from 'react'
// import { useRoutes, Outlet } from 'react-router-dom'
import {Outlet} from 'oh-router-react'
import { Layout } from 'antd'


const { Content } = Layout
const ContentLayout = () => {

	return (
		<>
			<Content
				className="site-layout-background content-layout"
				style={{
					margin: '10px 15px 10px',
					minHeight: '280'
				}}
			>
				<Outlet />
			</Content>
		</>
	)
}

export default ContentLayout
