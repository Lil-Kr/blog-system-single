import React, { useEffect, useState } from 'react'
import Logo from './logo/Logo'
import { Breadcrumb, Button, Layout, Menu, MenuProps, Spin } from 'antd'
import { useNavigate, useLocation } from 'oh-router-react'
import { SubMenuType } from '@/types/common'
import { getMenuOpenKeysUtil } from '@/utils/common'
import { menuItems, tabMap } from '@/router'
import { useTabsStore } from '@/store/global'

const MenuLayout = (props: { collapsed: boolean }) => {
  const { collapsed } = props
  const { tabActive, tabList, setTab, setTabActive } = useTabsStore()
  const navigateTo = useNavigate()
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [loading, setLoading] = useState(false)

  const keys: string[] = getMenuOpenKeysUtil(pathname)

  useEffect(() => {
    setSelectedKeys([pathname])
    collapsed ? null : setOpenKeys(keys)
  }, [pathname, collapsed])

  // todo:后端加载菜单数据, 并渲染

  /**
   * jump content page
   * @param e
   */
  const clickMenu = (e: SubMenuType) => {
    const { key, keyPath } = e
    /**
     * 将 router path 存入 状态管理器 中
     */
    const tabInfo = tabMap.get(key)
    setTab({
      tabActive: tabInfo,
      tabList: []
    })
    navigateTo(key)
  }

  /**
   * handle open/close menu
   * @param openKeys
   */
  const handleOpenMenu = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  return (
    <>
      <Spin spinning={loading} tip='Loading...'>
        <Logo collapsed={collapsed} />
        <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          // default open menu
          // defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          // 初始选中的菜单项 key 数组
          // defaultSelectedKeys={defaultSelectKeys}
          onClick={clickMenu}
          onOpenChange={handleOpenMenu}
        />
      </Spin>
    </>
  )
}

export default MenuLayout
