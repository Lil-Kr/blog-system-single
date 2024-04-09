import React from 'react'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useMenuStore } from '@/store/global'

const CollapsIcon = () => {
  const { collapsed, setMenuStyleCollapsed } = useMenuStore()

  const onChange = () => {
    setMenuStyleCollapsed(!collapsed)
  }

  return (
    <div className='trigger collapsed' onClick={onChange}>
      {collapsed ? (
        <Button type='text' icon={<MenuUnfoldOutlined />} />
      ) : (
        <Button type='text' icon={<MenuFoldOutlined />} />
      )}
    </div>
  )
}

export default CollapsIcon
