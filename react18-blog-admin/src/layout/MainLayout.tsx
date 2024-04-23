import React, { useEffect, useState } from 'react'
import { useMenuStore } from '@/store/global/globalStore'
import MenuLayout from './menu'
import HeaderLayout from './header'
import ContentLayout from './content'
import FooterLayout from './footer/FooterLayout'
import TabsLayout from './tabs'
import { Layout } from 'antd'
const { Sider } = Layout
import { useLocation } from 'oh-router-react'
import { getMenuOpenKeysUtil } from '@/utils/common'

// css
import styles from '@/layout/css/index.module.scss'

const MainLayout = () => {
  const { pathname } = useLocation()
  const { collapsed, setSelectedKeys, setOpenMenuKeys } = useMenuStore()

  const keys: string[] = getMenuOpenKeysUtil(pathname)
  useEffect(() => {
    setSelectedKeys([pathname])
    collapsed ? null : setOpenMenuKeys(keys)
  }, [pathname, collapsed])

  return (
    <div className={styles.mainLayoutWarpper}>
      <Layout>
        <Sider className='sider-warpper' trigger={null} collapsible collapsed={collapsed}>
          <MenuLayout />
        </Sider>
        <Layout>
          <HeaderLayout />
          <TabsLayout />
          <ContentLayout />
          <FooterLayout />
        </Layout>
      </Layout>
    </div>
  )
}

export default MainLayout
