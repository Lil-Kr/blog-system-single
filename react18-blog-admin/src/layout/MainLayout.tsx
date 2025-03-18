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
import { useDictDetailStore, useAclModuleStore } from '@/store/global/initDictStore'
import { aclModuleApi } from '@/apis/sys'
import { useTokenStore } from '@/store/login'
import { LogoutAndRedirect } from '@/components/logout/LogoutAndRedirect'
import { OptionType, transformTypeToSeletor } from '@/types/apis'

const MainLayout = () => {
  const { pathname } = useLocation()
  const { collapsed, setSelectedMenusKeys, setOpenMenuKeys } = useMenuStore()
  const keys: string[] = getMenuOpenKeysUtil(pathname)
  const { token } = useTokenStore()
  // 初始化字典数据状态
  const { dictMap, setDictMap, dictStatues: statues, setDictStatueType, setAclType } = useDictDetailStore()
  const { aclModuleSelector, setAclModuleSeletor } = useAclModuleStore()

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

    /**
     * 初始化字典数据, 只在第一次加载时初始化一次
     */
    if (dictMap.size === 0) {
      const initDictMap = async () => {
        /**
         * 初始化字典表
         */
        const dictMap: Map<string, DictMapType[]> = await initDictList()
        setDictMap(dictMap)

        /**
         * 初始化数据字典[状态类型]
         */
        const statusTypes: DictMapType[] = dictMap.get('状态类型') ?? []
        const statusTypeSelecor = transformTypeToSeletor(statusTypes)
        setDictStatueType(statusTypeSelecor)

        /**
         * 初始化数据字典[权限类型]
         */
        const aclTypes: DictMapType[] = dictMap.get('权限点类型') ?? []
        const aclTypeSelecor = transformTypeToSeletor(aclTypes)
        setAclType(aclTypeSelecor)
      }
      initDictMap()
    }

    /**
     * 初始化权限模块数据
     */
    if (aclModuleSelector.length <= 1) {
      const initAclModule = async () => {
        const aclModuleSelector = await initAclModuleList()
        setAclModuleSeletor(aclModuleSelector)
      }
      initAclModule()
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
   * 初始化权限模块数据
   */
  const initAclModuleList = async (): Promise<OptionType[]> => {
    const aclModules = await aclModuleApi.aclModuleList({})
    const { code, data } = aclModules
    if (code !== 200) {
      return []
    }
    let aclModuleList: OptionType[] = data.map(({ surrogateId, name }) => ({
      value: surrogateId,
      label: name
    }))
    aclModuleList.push({
      value: '0',
      label: '-'
    })
    return aclModuleList
  }

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
