import React, { useState } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Flex, Layout, Space } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import CollapsIcon from './components/CollapsIcon'
import LanguageChange from './components/LanguageChange'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import AvatarIcon from './components/AvatarIcon'

import styles from './index.module.scss'
import { useBreadcrumbStore } from '@/store/global'

const { Header } = Layout

const HeaderLayout = (props: { collapsed: boolean; setCollapsed: any }) => {
  let { collapsed, setCollapsed } = props
  return (
    <Header className={styles.layoutHeader} style={{ padding: 0 }}>
      <div className='header-lf'>
        {/* collaps icon */}
        <CollapsIcon collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* breadcrumb nav */}
        <BreadcrumbNav />
      </div>
      <div className='header-ri'>
        <LanguageChange />
        <Theme />
        <Fullscreen />
        <AvatarIcon />
      </div>
    </Header>
  )
}

export default HeaderLayout
