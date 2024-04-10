import React from 'react'
import { Tabs } from 'antd'
import { useNavigate } from 'oh-router-react'
import { TabType } from '@/types/common/tabType'

// css
import './index.scss'
import { useMenuStore, useTabsStore } from '@/store/global/globalStore'
import { getMenuOpenKeysUtil } from '@/utils/common'

/**
 *
 * @returns
 */
const TabsLayout = () => {
  const navigateTo = useNavigate()
  /**
   * 从 zustand 读取最后一次打开的所有 tab, 并初始化展开的 tab
   */
  const { historyOpenTabs, tabActive, setTabActive, removeTab } = useTabsStore()
  const { setSelectedKeys, setOpenMenuKeys } = useMenuStore()

  /**
   * onChange
   * @param newActiveKey
   */
  const onChange = (newActiveKey: string) => {
    const newActiveTab = {
      key: newActiveKey,
      path: newActiveKey,
      label: '',
      closable: true
    }
    setTabActive(newActiveTab)
    navigateTo(newActiveKey)
  }

  /**
   *
   * @param targetKey
   * @returns
   */
  const remove = (targetKey: string) => {
    /**
     * 计算出删除 tab 位置的前一个tab的所引
     */
    let delIndex = 0
    let curIndex = 0
    historyOpenTabs.forEach(function (item, index, arr) {
      // 获取待删除的tab index
      if (item.key === targetKey) {
        delIndex = index
      }
      // 获取当前选中的tab index
      if (item.key === tabActive.key) {
        curIndex = index
      }
    })

    /**
     * 筛选出移除tab之后的新数组
     */
    const newTabs = historyOpenTabs.filter(item => item.key !== targetKey)
    let selectedIndex = 0
    if (delIndex > curIndex) {
      selectedIndex = curIndex
    } else if (delIndex < curIndex) {
      selectedIndex = curIndex - 1
    } else {
      selectedIndex = curIndex - 1
    }
    let newActiveTab: TabType = newTabs[selectedIndex]

    return { newActiveTab, newTabs }
  }

  const onEdit = (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'add') {
      // addTabs()
    } else {
      const { newActiveTab, newTabs } = remove(e.toString())
      removeTab(newActiveTab, newTabs)
      const keys: string[] = getMenuOpenKeysUtil(newActiveTab.key)
      setSelectedKeys([newActiveTab.key])
      setOpenMenuKeys(keys)
      navigateTo(newActiveTab.key)
    }
  }

  return (
    <div className='tabs'>
      <Tabs
        hideAdd
        type='editable-card'
        onChange={onChange}
        activeKey={tabActive.key}
        onEdit={onEdit}
        items={historyOpenTabs}
        // onTabClick={tabClick}
      ></Tabs>
    </div>
  )
}

export default TabsLayout
