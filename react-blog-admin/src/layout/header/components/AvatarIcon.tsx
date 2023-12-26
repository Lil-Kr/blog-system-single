import React from 'react'
import { Avatar, Dropdown, MenuProps } from 'antd'
import avatar from '@/assets/images/icons/avatar.png'

const AvatarIcon = () => {
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
			type: 'divider'
		},
		{
			key: '4',
			label: <span className="dropdown-item">退出登录</span>
		}
	]

	const handleMenuClick: MenuProps['onClick'] = (event) => {
		// message.info('Click on menu item.')
		// console.log('click', e)
		console.log('--> abc:', event)
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
