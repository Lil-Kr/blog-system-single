import React from 'react'
import { Avatar, Dropdown, MenuProps, message } from 'antd'
import { useNavigate } from 'oh-router-react'
import avatar from '@/assets/images/icons/avatar.png'

// zustand
import useLoginAdminStore from '@/store/login'
import { useMenuStore, useTabsStore } from '@/store/global'

const AvatarIcon = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { removeToken } = useLoginAdminStore()
  const { resetTabs } = useTabsStore()
  const { restMenuState } = useMenuStore()
  const navigateTo = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: <span className='dropdown-item'>关于我</span>
    },
    {
      key: '3',
      label: <span className='dropdown-item'>修改密码</span>
    },
    {
      key: '4',
      label: <span className='dropdown-item'>退出登录</span>
    }
  ]

  const loginoutFunc = async () => {
    /**
     * remove token
     */
    removeToken()
    resetTabs()
    restMenuState()
    navigateTo('/admin/login')
  }

  const handleMenuClick: MenuProps['onClick'] = event => {
    let key = event.key
    switch (key) {
      case '1':
        messageApi.info(key)
        break
      case '2': // 关于我
        messageApi.info(key)
        break
      case '3':
        messageApi.info(key)
        break
      case '4':
        loginoutFunc()
        // messageApi.success('')
        break
      default:
        messageApi.info(key)
        break
    }
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  return (
    <>
      <Dropdown menu={menuProps} placement='bottom' arrow trigger={['click']}>
        <Avatar size='large' src={avatar} />
      </Dropdown>
    </>
  )
}

export default AvatarIcon
