import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux'
import { setLanguage } from '@/redux/slice/global/globalSystem'
import { Dropdown, MenuProps } from 'antd'

const LanguageChange = () => {
	const { language } = useAppSelector((state: RootState) => state.globalSystem)
	const dispatch = useAppDispatch()

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <span>简体中文</span>,
			onClick: () => dispatch(setLanguage('zh')),
			disabled: language === 'zh'
		},
		{
			key: '2',
			label: <span>English</span>,
			onClick: () => dispatch(setLanguage('en')),
			disabled: language === 'en'
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

	// const handleMenuClick = () => {}

	return (
		<>
			<Dropdown menu={menuProps} placement="bottom" trigger={['click']} arrow={true}>
				<i className="icon-style iconfont icon-zhongyingwen"></i>
			</Dropdown>
		</>
	)
}

export default LanguageChange
