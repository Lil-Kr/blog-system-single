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
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { dictApi } from '@/apis/sys/dictApi'
import useDictDetailStore from '@/store/global/dictStore'

const MainLayout = () => {
  const { pathname } = useLocation()
  const { collapsed, setSelectedMenusKeys, setOpenMenuKeys } = useMenuStore()
  const keys: string[] = getMenuOpenKeysUtil(pathname)
  // 初始化字典数据状态
  const { setDictMap } = useDictDetailStore()

  useEffect(() => {
    const initData = async () => {
      setSelectedMenusKeys([pathname])
      collapsed ? null : setOpenMenuKeys(keys)
      /**
       * 初始化字典表
       */
      const dictMap: Map<string, DictMapType[]> = await initDictList()
      setDictMap(dictMap)
    }
    initData()
  }, [pathname, collapsed])

  /**
   * 初始化字典数据
   */
  const initDictList = async (): Promise<Map<string, DictMapType[]>> => {
    const dictTree = await dictApi.dictDetailTree()
    const { code, data } = dictTree
    if (code !== 200) {
      return new Map<string, DictMapType[]>()
    }
    return new Map(Object.entries(data))
  }

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
