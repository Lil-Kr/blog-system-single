import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import MenuLayout from './menu'
import HeaderLayout from './header'
import ContentLayout from './content'
import FooterLayout from './footer/FooterLayout'
import TabsLayout from './tabs'
import { Layout } from 'antd'

// css
import styles from './mainLayout.module.scss'

const { Sider } = Layout

const MainLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	return (
		<div className={styles.container}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<MenuLayout collapsed={collapsed} />
				{/* <MenuDemo /> */}
			</Sider>
			<Layout className="site-layout">
				<HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
				<TabsLayout></TabsLayout>
				<ContentLayout />
				{/* <Content
					className="site-layout-background content-layout"
					style={{
						margin: '15px 15px 0',
						minHeight: '280'
					}}
				>
					<Outlet />
				</Content> */}
				<FooterLayout />
			</Layout>
		</div>
	)
}

export default MainLayout
