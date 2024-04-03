import React from 'react'
import { Avatar, Dropdown, MenuProps, message } from 'antd'
import { useNavigate } from 'oh-router-react'
import avatar from '@/assets/images/icons/avatar.png'
import userApi from '@/apis/user'

// zustand
import useLoginAdminStore from '@/store/login'

const AvatarIcon = () => {
  const { removeToken } = useLoginAdminStore()
  const navigateTo = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span className='dropdown-item'>首页</span>
    },
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
    const logoutRes = await userApi.logout()
    const { code, data, msg } = logoutRes
    if (code === 200) {
      /**
       * remove token
       */
      removeToken()
      // 跳转
      navigateTo('/login')
      message.success(msg)
    } else {
      message.error(msg)
      navigateTo('/login')
    }
  }

  const handleMenuClick: MenuProps['onClick'] = event => {
    let key = event.key
    switch (key) {
      case '1':
        message.info(key)
        break
      case '2': // 关于我
        message.info(key)
        break
      case '3':
        message.info(key)
        break
      case '4':
        break
      default:
        message.info(key)
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