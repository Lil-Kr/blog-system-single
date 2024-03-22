import React from 'react'
import { Avatar, Dropdown, MenuProps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import avatar from '@/assets/images/icons/avatar.png'
import { Response } from '@/types/http/respType'
import { useLogoutMutation } from '@/redux/apis/login/loginApi'
import { USER_TOKEN_KEY } from '@/utils/constant/constant'

// cookie
import cookie from 'react-cookies'

const AvatarIcon = () => {
	const navigateTo = useNavigate()

  const [
		logoutFn,
		{
			data: logoutResp,
			isSuccess: isLogoutSuccess,
			isError: isLogoutError,
			isUninitialized: isLogoutUninitialized
		}
	] = useLogoutMutation()

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <span className="dropdown-item">首页</span>
		},
		{
			key: '2',
			label: <span className="dropdown-item">个人信息</span>
		},
		{
			key: '3',
			label: <span className="dropdown-item">修改密码</span>
		},
		{
			key: '4',
			label: <span className="dropdown-item">退出登录</span>
		}
	]

	const handleMenuClick: MenuProps['onClick'] = (event) => {
    let key = event.key
    switch (key) {
      case '1':
        message.info(key)
        break;
      case '2':
        message.info(key)
        break;
      case '3':
        message.info(key)
        break;
      case '4':
        logoutFn({}).then((res: Response) => {
          console.log('--> 登陆成功返回的参数 res: ', res)
          if (res.data.code == 200) {
            cookie.remove(USER_TOKEN_KEY)
            navigateTo('/login')
          } else {
            message.warn(res.msg)
          }
        })
        break;
      default:
        message.info(key)
        break;
    }
  }

	const menuProps = {
		items,
		onClick: handleMenuClick
	}

	return (
		<>
			<Dropdown menu={menuProps} placement="bottom" arrow trigger={['click']}>
				<Avatar size="large" src={avatar} />
			</Dropdown>
		</>
	)

}

export default AvatarIcon
