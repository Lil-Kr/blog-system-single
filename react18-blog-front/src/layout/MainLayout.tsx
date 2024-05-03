import React, { useState } from 'react'
import { Flex, Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
const { Sider } = Layout

import { Headers } from '@/layout/header'
import { ContentLayout } from './contentLayout'

// css
import mainLayout from '@/layout/css/index.module.scss'

const MainLayout = () => {
  return (
    <Layout className={mainLayout.mainLayoutWarpper}>
      <Flex gap='middle' vertical={true}>
        <Headers />
        <ContentLayout />
      </Flex>
    </Layout>
  )
}

export default MainLayout
