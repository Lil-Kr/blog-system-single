import React from 'react'
import { Avatar, Dropdown, MenuProps, message } from 'antd'
import { useNavigate } from 'oh-router-react'
import avatar from '@/assets/images/icons/avatar.png'
// zustand
import { useTokenStore } from '@/store/login'
import { useMenuStore, useTabsStore } from '@/store/global'
import { useMessage } from '@/components/message/MessageProvider'
import { useAdminStore } from '@/store/sys/adminStore'
import { useRouterStore } from '@/store/router/routerStore'

const AvatarIcon = () => {
  const messageApi = useMessage()
  const { admin } = useAdminStore()
  const { clearToken } = useTokenStore()
  const { restMenuState } = useMenuStore()
  const { resetTabs } = useTabsStore()

  const navigateTo = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: <span className='dropdown-item'>{'关于我'}</span>
    },
    {
      key: '3',
      label: <span className='dropdown-item'>{'修改密码'}</span>
    },
    {
      key: '4',
      label: <span className='dropdown-item'>{'退出登录'}</span>
    }
  ]

  /**
   * 退出登录
   */
  const logout = async () => {
    /**
     * 清空数据
     */
    clearToken()
    restMenuState()
    resetTabs()
    navigateTo('/login')
  }

  const handleMenuClick: MenuProps['onClick'] = event => {
    let key = event.key
    switch (key) {
      case '1':
        messageApi?.info(key)
        break
      case '2': // 关于我
        messageApi?.info(key)
        break
      case '3':
        messageApi?.info(key)
        break
      case '4':
        logout()
        break
      default:
        messageApi?.info(key)
        break
    }
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  return (
    <>
      <div>{admin.userName}</div>
      <Dropdown menu={menuProps} placement='bottom' arrow trigger={['click']}>
        <Avatar size='large' src={avatar} />
      </Dropdown>
    </>
  )
}

export default AvatarIcon
