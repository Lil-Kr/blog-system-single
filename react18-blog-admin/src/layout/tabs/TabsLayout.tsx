import React, { useEffect, useRef, useState } from 'react'
import { Button, Tabs, TabsProps } from 'antd'
import { useNavigate, useLocation } from 'oh-router-react'
import { TabType } from '@/types/common/tabType'
// css
import './index.scss'
import { useMenuStore, useTabsStoreTest } from '@/store/global/globalLayoutStore'
import { getMenuOpenKeysUtil } from '@/utils/common'
import { menuItems, tabMap } from '@/router'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

/**
 *
 * @returns
 */
const TabsLayout = () => {
  const navigateTo = useNavigate()
  const { pathname } = useLocation()
  /**
   * 从 zustand 读取最后一次打开的所有 tab, 并初始化展开的 tab
   */
  const { historyOpenTabs, tabActive, setTabActive, removeTab } = useTabsStoreTest()
  const [items, setItems] = useState<TabType[]>(historyOpenTabs)
  const [activeKey, setActiveKey] = useState(historyOpenTabs[0].key)
  // const { collapsed, selectedKeys, setSelectedKeys, setOpenMenuKeys } = useMenuStore()
  console.log('--> TabsLayout 加载, historyOpenTabs: tabActive: ', historyOpenTabs, tabActive)

  useEffect(() => {
    console.log('--> useEffect TabsLayout: ', historyOpenTabs)
    setItems(historyOpenTabs)
    setActiveKey(tabActive.key)
    // collapsed ? null : setOpenMenuKeys(keys)
  }, [pathname])

  /**
   * onChange
   * @param newActiveKey
   */
  const onChange = (newActiveKey: string) => {
    console.log('--> tabsLayout onChange, 切换tab')
    const newActiveTab = {
      key: newActiveKey,
      path: newActiveKey,
      label: '',
      closable: true
    }
    // historyOpenTabs.push(newActiveTab)
    setTabActive(newActiveTab)
    navigateTo(newActiveKey)
  }

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = tabActive.key
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items.filter(item => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    console.log('--> newPanes: ', newPanes)

    const tabInfo = tabMap.get(newActiveKey)
    console.log('--> newActive: ', tabInfo)
    removeTab(tabInfo!, newPanes)
    setItems(newPanes)
  }

  // const onEdit = (targetKey: string, action: 'add' | 'remove') => {
  const onEdit = (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    console.log('--> tabsLayout onEdit')
    if (action === 'add') {
      // addTabs()
    } else {
      // const { newTabs, newActiveTab } = remove(e.toString())
      remove(e.toString())
    }
  }

  // console.log('--> 刷新 TabsLayout')

  const tabClick = (key: string, e: any) => {
    console.log('--> tabsLayout tabClick, 切换tab')
    const newActiveTab = {
      key: key,
      path: key,
      label: '',
      closable: true
    }
    // historyOpenTabs.push(newActiveTab)
    setTabActive(newActiveTab)
    navigateTo(key)
  }

  return (
    <div className='tabs'>
      <Tabs
        hideAdd
        type='editable-card'
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        onTabClick={tabClick}
      ></Tabs>
    </div>
  )
}

export default TabsLayout
