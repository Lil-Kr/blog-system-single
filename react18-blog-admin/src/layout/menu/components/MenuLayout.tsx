import { Menu, Spin } from 'antd'
import { useNavigate, useLocation } from 'oh-router-react'
import { SubMenuType } from '@/types/common'
import { menuItems, tabMap } from '@/router'
import { useMenuStore, useTabsStoreTest } from '@/store/global/globalLayoutStore'
import Logo from './logo/Logo'

const MenuLayout = () => {
  const { setTabActive, removeTab } = useTabsStoreTest()
  const {  selectedKeys, openKeys, setSelectedKeys, setOpenMenuKeys } = useMenuStore()
  const navigateTo = useNavigate()

  /**
   * jump content page
   * @param e
   */
  const clickMenu = (e: SubMenuType) => {
    const { key, keyPath } = e
    /**
     * 选中菜单
     */
    const tabInfo = tabMap.get(key)
    setTabActive(tabInfo!)

    /**
     * pathname
     */
    navigateTo(key)
  }

  /**
   * handle open/close menu
   * @param openKeys
   */
  const handleOpenMenu = (openKeys: string[]) => {
    setOpenMenuKeys(openKeys)
  }

  return (
    <>
      <Spin spinning={false} tip='Loading...'>
        <Logo />
        <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          openKeys={openKeys}
          selectedKeys={selectedKeys} // 当前选中的菜单项 key 数组
          // selectedKeys={['/main/blog/index']} // 当前选中的菜单项 key 数组
          // default open menu
          // defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          // 初始选中的菜单项 key 数组
          // defaultSelectedKeys={defaultSelectKeys}
          onClick={clickMenu}
          // onOpenChange={openKeys => setOpenMenuKeys(openKeys)}
          onOpenChange={handleOpenMenu}
        />
      </Spin>
    </>
  )
}

export default MenuLayout
