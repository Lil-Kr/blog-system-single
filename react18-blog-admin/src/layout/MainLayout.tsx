import React, { useState } from 'react'
// import { Outlet, useLocation } from 'react-router-dom'
import MenuLayout from './menu'
import HeaderLayout from './header'
import ContentLayout from './content'
import FooterLayout from './footer/FooterLayout'
import TabsLayout from './tabs'
import { Layout } from 'antd'
const { Sider } = Layout

// css
import styles from '@/layout/css/index.module.scss'

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  // console.log('--> 主框架页面 首先加载')
  return (
    <div className={styles.mainLayoutWarpper}>
      <Layout>
        <Sider className='sider-warpper' trigger={null} collapsible collapsed={collapsed}>
          <MenuLayout collapsed={collapsed} />
        </Sider>
        <Layout>
          <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
          <TabsLayout />
          <ContentLayout />
          <FooterLayout />
        </Layout>
      </Layout>
    </div>
  )
}

export default MainLayout
