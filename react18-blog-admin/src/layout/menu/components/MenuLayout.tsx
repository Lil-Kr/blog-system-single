import React, { useEffect, useState } from 'react'
import Logo from './logo/Logo'
import { Breadcrumb, Button, Layout, Menu, MenuProps, Spin } from 'antd'
import { useNavigate, useLocation } from 'oh-router-react'
import { SubMenuType, TabType } from '@/types/common'
import { menuItems, tabMap } from '@/router'
import { useMenuStore, useTabsStoreTest } from '@/store/global/globalLayoutStore'
import { getPushMenu } from '@/utils/common/layoutUtils/menuUtil'
import { getMenuOpenKeysUtil } from '@/utils/common'

const MenuLayout = () => {
  const { pathname } = useLocation()
  const { historyOpenTabs, tabActive, setTabActive, setTabActive2, removeTab } = useTabsStoreTest()
  const { collapsed, selectedKeys, openKeys, setSelectedKeys, setOpenMenuKeys } = useMenuStore()
  const navigateTo = useNavigate()
  // const [loading, setLoading] = useState(false)

  /**
   * jump content page
   * @param e
   */
  const clickMenu = (e: SubMenuType) => {
    const { key, keyPath } = e
    console.log('--> MenuLayout 点了菜单项 key: ', key)
    /**
     * 选中菜单
     */
    // setSelectedKeys([key])
    const tabInfo = tabMap.get(key)
    setTabActive(tabInfo!)
    // setTabActive2(tabInfo!)
    // pushHistoryOpenTabs(tabInfo!)

    /**
     * pathname
     */
    navigateTo(key)
  }

  /**
   * handle open/close menu
   * @param openKeys
   */
  const handleOpenMenu = (openKeys: string[]) => {
    console.log('--> MenuLayout handleOpenMenu openKeys: ', openKeys)
    setOpenMenuKeys(openKeys)
  }

  return (
    <>
      <Spin spinning={false} tip='Loading...'>
        <Logo />
        <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          openKeys={openKeys}
          selectedKeys={selectedKeys} // 当前选中的菜单项 key 数组
          // selectedKeys={['/main/blog/index']} // 当前选中的菜单项 key 数组
          // default open menu
          // defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          // 初始选中的菜单项 key 数组
          // defaultSelectedKeys={defaultSelectKeys}
          onClick={clickMenu}
          // onOpenChange={openKeys => setOpenMenuKeys(openKeys)}
          onOpenChange={handleOpenMenu}
        />
      </Spin>
    </>
  )
}

export default MenuLayout
