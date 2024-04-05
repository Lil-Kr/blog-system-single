import React, { useState } from 'react'
import { Layout } from 'antd'
const { Sider } = Layout

// css

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  // console.log('--> 主框架页面 首先加载')
  return (
    <div className='mainLayoutWarpper'>
      <Layout>
      </Layout>
    </div>
  )
}

export default MainLayout
