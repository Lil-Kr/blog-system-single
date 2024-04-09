import React, { useState } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Dropdown, Flex, Layout, Space } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import CollapsIcon from './components/CollapsIcon'
import LanguageChange from './components/LanguageChange'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import AvatarIcon from './components/AvatarIcon'

// css
import styles from './index.module.scss'
import { TabType } from '@/types/common'

const { Header } = Layout

const HeaderLayout = () => {
  return (
    <Header className={styles.layoutHeader} style={{ padding: 0 }}>
      <div className='header-lf'>
        {/* collaps icon */}
        <CollapsIcon />
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
