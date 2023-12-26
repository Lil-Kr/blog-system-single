import React from 'react'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const CollapsIcon = (props) => {
  let { collapsed, setCollapsed } = props

  return (
    <div className="trigger collapsed" onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )
}

export default CollapsIcon
