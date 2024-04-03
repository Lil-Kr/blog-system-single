import React, { useEffect, useRef, useState } from 'react'
import { Tabs } from 'antd'
import { useNavigate, useLocation } from 'oh-router-react'
import { TabType } from '@/types/common/tabType'
import { useTabsStore } from '@/store/global'
const { TabPane } = Tabs
// css
import './index.scss'

const TabsLayout = () => {
  const navigateTo = useNavigate()
  const { pathname } = useLocation()
  /**
   * 从 zustand 读取最后一次打开的所有 tab, 并初始化展开的 tab
   */
  const { tabList, tabActive, setTabActive, removeTab } = useTabsStore()

  // 初始化 首页
  const [items, setItems] = useState(tabList)
  const [activeKey, setActiveKey] = useState(tabActive!.key)

  useEffect(() => {
    addTabs()
    setActiveKey(tabActive!.key)
  }, [pathname])

  /**
   * onChange
   * @param newActiveKey
   */
  const onChange = (newActiveKey: string) => {
    // dispatch(setTabActive({ tabActive: { key: newActiveKey, path: newActiveKey } }))
    setTabActive({
      key: newActiveKey,
      path: newActiveKey,
      label: '',
      closable: true
    })
    setActiveKey(newActiveKey)
    navigateTo(newActiveKey)
  }

  /**
   * 添加tab信息
   */
  const addTabs = () => {
    setItems(tabList)
  }

  const remove = (targetKey: string) => {
    /**
     * 计算出删除 tab 位置的前一个tab的所引
     */
    let delIndex = 0
    let curIndex = 0
    tabList.forEach(function (item, index, arr) {
      // 获取待删除的tab index
      if (item.key === targetKey) {
        delIndex = index
      }
      // 获取当前选中的tab index
      if (item.key === pathname) {
        curIndex = index
      }
    })

    const newTabs = tabList.filter(item => item.key !== targetKey)
    let selectedIndex = 0
    if (delIndex > curIndex) {
      selectedIndex = curIndex
    } else if (delIndex < curIndex) {
      selectedIndex = curIndex - 1
    } else {
      selectedIndex = newTabs.length - 1
    }
    // console.log('--> :selectedIndex', selectedIndex)

    let newActiveTab: TabType = newTabs[selectedIndex]
    // console.log('--> newActiveTab:', newActiveTab)

    setItems(newTabs)
    setActiveKey(newActiveTab.key)
    navigateTo(newActiveTab.key)
    return { newTabs, newActiveTab }
  }

  // const onEdit = (targetKey: string, action: 'add' | 'remove') => {
  const onEdit = (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'add') {
      addTabs()
    } else {
      console.log('--> tab newKey', e.toString())
      const { newTabs, newActiveTab } = remove(e.toString())
      // remove(targetKey)
      // dispatch(removeTab({ tabsList: newTabs, tabActive: newActiveTab }))
      removeTab({ tabList: newTabs, tabActive: newActiveTab })
    }
  }
  return (
    <div className='tabs'>
      <Tabs hideAdd type='editable-card' onChange={onChange} activeKey={activeKey} onEdit={onEdit} items={items}></Tabs>
      <TabPane>sssss</TabPane>
    </div>
  )
}

export default TabsLayout
