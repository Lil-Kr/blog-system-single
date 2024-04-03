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
          padding: 15,
          margin: 0,
          maxHeight:'calc(100vh - 160px)',
          overflow: 'auto'
				}}
			>
				<Outlet />
			</Content>
		</>
	)
}

export default ContentLayout
