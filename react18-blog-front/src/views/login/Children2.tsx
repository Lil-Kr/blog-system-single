import { useBearStore } from '@/store/demo/bearStore'
import { Button, Menu } from 'antd'
import React from 'react'

const Children2 = () => {
  const { bears } = useBearStore()

  console.log('--> 刷新子页面 Children-2')
  // const handleIncrease = () => {
  //   console.log('--> 点击子页面按钮')
  //   increase(1)
  // }

  // const handleDecrease = () => {
  //   decrease(1)
  // }

  return (
    <div>
      {/* <Button onClick={() => increase(1)}>+</Button>
      <Button onClick={() => decrease(1)}>-</Button> */}
      {/* <p>{bears}</p> */}

      <Menu
        theme='dark'
        mode='inline'
        triggerSubMenuAction='click'
        openKeys={['/main/home']}
        selectedKeys={[]} // 当前选中的菜单项 key 数组
        // selectedKeys={['/main/blog/index']} // 当前选中的菜单项 key 数组
        // default open menu
        // defaultOpenKeys={defaultOpenKeys}
        items={[]}
        // 初始选中的菜单项 key 数组
        // defaultSelectedKeys={defaultSelectKeys}
        onClick={() => {}}
        // onOpenChange={openKeys => setOpenMenuKeys(openKeys)}
        onOpenChange={() => {}}
      />
      <p>{`Children-2: ` + bears}</p>
    </div>
  )
}

export default Children2
