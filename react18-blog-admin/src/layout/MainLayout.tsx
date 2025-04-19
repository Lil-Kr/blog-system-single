import React, { useEffect } from 'react'
import { useMenuStore } from '@/store/global/globalStore'
import MenuLayout from './menu'
import HeaderLayout from './header'
import ContentLayout from './content'
import FooterLayout from './footer/FooterLayout'
import TabsLayout from './tabs'
import { Layout } from 'antd/lib'
const { Sider } = Layout
import { useLocation } from 'oh-router-react'
import { getMenuOpenKeysUtil } from '@/utils/common'
import { useTokenStore } from '@/store/login'

// css
import styles from '@/layout/scss/index.module.scss'

const MainLayout = () => {
  const { pathname } = useLocation()
  const { collapsed, setSelectedMenusKeys, setOpenMenuKeys } = useMenuStore()
  const keys: string[] = getMenuOpenKeysUtil(pathname)
  const { token } = useTokenStore()

  useEffect(() => {
    if (token !== '') {
      const initData = async () => {
        setSelectedMenusKeys([pathname])
        collapsed ? null : setOpenMenuKeys(keys)
      }
      initData()
    }
  }, [pathname, collapsed])

  return (
    <Layout className={styles.mainLayoutWarpper}>
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
  )
}

export default MainLayout
