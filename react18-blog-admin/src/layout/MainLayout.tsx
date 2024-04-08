import React, { useEffect, useState } from 'react'
import { useMenuStore, useTabsStoreTest } from '@/store/global/globalLayoutStore'
import MenuLayout from './menu'
import HeaderLayout from './header'
import ContentLayout from './content'
import FooterLayout from './footer/FooterLayout'
import TabsLayout from './tabs'
import { Layout } from 'antd'
const { Sider } = Layout
import { useLocation } from 'oh-router-react'
import { getMenuOpenKeysUtil } from '@/utils/common'
import { menuItems, tabMap } from '@/router'

// css
import styles from '@/layout/css/index.module.scss'

const MainLayout = () => {
  const { pathname } = useLocation()
  const { historyOpenTabs, tabActive, setTabActive } = useTabsStoreTest()
  const { collapsed, selectedKeys, setSelectedKeys, setOpenMenuKeys } = useMenuStore()
  // const { historyOpenTabs } = useTabsStoreTest()
  console.log('--> 主框架页面加载: historyOpenTabs: ', historyOpenTabs)

  // useEffect(() => {
  //   /**
  //    * 设置
  //    */
  //   // const tabInfo = tabMap.get(pathname)
  //   // setTabActive(tabInfo!)
  //   setSelectedKeys([pathname])
  //   // collapsed ? null : setOpenMenuKeys(keys)
  // }, [pathname, tabActive, historyOpenTabs])

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
          {/*<FooterLayout /> */}
        </Layout>
      </Layout>
    </div>
  )
}

export default MainLayout
