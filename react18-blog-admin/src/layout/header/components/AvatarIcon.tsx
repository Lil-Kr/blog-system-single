import React from 'react'
import { Avatar, Dropdown, MenuProps } from 'antd/lib'
import { useNavigate } from 'oh-router-react'
import avatar from '@/assets/images/icons/avatar.png'
import { useMessage } from '@/components/message/MessageProvider'
import { useAdminLoginStore } from '@/store/sys/adminStore'
import { resetPermissionRouters } from '@/router/dynamicRoutes'

const AvatarIcon = () => {
  const messageApi = useMessage()
  const { admin } = useAdminLoginStore()

  const navigateTo = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span className='dropdown-item'>{'关于我'}</span>
    },
    {
      key: '2',
      label: <span className='dropdown-item'>{'修改密码'}</span>
    },
    {
      key: '3',
      label: <span className='dropdown-item'>{'退出登录'}</span>
    }
  ]

  const handleMenuClick: MenuProps['onClick'] = event => {
    let key = event.key
    switch (key) {
      case '1': // 关于我
        messageApi?.info(key)
        break
      case '2':
        messageApi?.info(key)
        break
      case '3':
        logout()
        break
      default:
        messageApi?.info(key)
        break
    }
  }

  const aboutMe = () => {
    
  }

  /**
   * 退出登录
   */
  const logout = async () => {
    /**
     * 清空数据
     */
    resetPermissionRouters()
    navigateTo('/login')
  }

  const menuProps: MenuProps = {
    items,
    onClick: handleMenuClick
  }

  return (
    <>
      {/* <div>{admin.userName}</div> */}
      <Dropdown menu={menuProps} placement='bottom' trigger={['hover']} arrow={{ pointAtCenter: true }}>
        <Avatar size={'large'} src={avatar} />
      </Dropdown>
    </>
  )
}

export default AvatarIcon
