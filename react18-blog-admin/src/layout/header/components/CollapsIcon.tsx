import React from 'react'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const CollapsIcon = (props: { collapsed: boolean; setCollapsed: any }) => {
  let { collapsed, setCollapsed } = props

  return (
    <div className='trigger collapsed' onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? (
        <Button type='text' icon={<MenuUnfoldOutlined />} />
      ) : (
        <Button type='text' icon={<MenuFoldOutlined />} />
      )}
    </div>
  )
}

export default CollapsIcon
