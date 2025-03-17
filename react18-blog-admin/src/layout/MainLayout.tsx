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
import { aclModuleApi } from '@/apis/sys'
import { AclModuleTreeResp } from '@/types/apis/sys/acl/aclType'
import { useTokenStore } from '@/store/login'
import { LogoutAndRedirect } from '@/components/logout/LogoutAndRedirect'

const MainLayout = () => {
  const { pathname } = useLocation()
  const { collapsed, setSelectedMenusKeys, setOpenMenuKeys } = useMenuStore()
  const keys: string[] = getMenuOpenKeysUtil(pathname)
  const { token } = useTokenStore()
  // 初始化字典数据状态
  const { dictMap, setDictMap } = useDictDetailStore()

  useEffect(() => {
    if (token !== '') {
      const initData = async () => {
        setSelectedMenusKeys([pathname])
        collapsed ? null : setOpenMenuKeys(keys)

        /**
         * 初始化用户拥有的菜单
         */
        // const data = initMenu()
        // console.log('--> data:', { ...await data })
      }
      initData()
    }

    if (dictMap.size === 0) {
      const initDictMap = async () => {
        /**
         * 初始化字典表
         */
        const dictMap: Map<string, DictMapType[]> = await initDictList()
        setDictMap(dictMap)
      }
      initDictMap()
    }
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

  /**
   * 初始化用户拥有的菜单
   */
  // const initMenu = async (): Promise<AclModuleTreeResp[]> => {
  //   const res = await aclModuleApi.aclModuleTree()
  //   const { code, msg, data } = res
  //   return data
  // }

  return (
    <Layout className={styles.mainLayoutWarpper}>
      <LogoutAndRedirect />
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
