import React, { useEffect, useState } from 'react'
import Logo from './logo/Logo'
import { Breadcrumb, Button, Layout, Menu, MenuProps, Spin } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { MenuItemType, SubMenuType } from '@/types/common'
import { getMenuOpenKeysUtil } from '@/utils/common'
import { breadcrumbMap, menuItems, tabMap } from '@/routers'
import { useAppDispatch } from '@/redux'
import { setBreadcrumbMap,setTab } from '@/redux/slice'

const MenuLayout = (props) => {
	const { collapsed } = props

	const dispatch = useAppDispatch()
	const navigateTo = useNavigate()
	const { pathname } = useLocation()
	const [openKeys, setOpenKeys] = useState<string[]>([])
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
	const [loading, setLoading] = useState(false)

	const keys: string[] = getMenuOpenKeysUtil(pathname)
	// console.log('--> keys:', keys)
	useEffect(() => {
		setSelectedKeys([pathname])
		collapsed ? null : setOpenKeys(keys)
	}, [pathname, collapsed])

	// todo:后端加载菜单数据, 并渲染

	// set breadcrumb value
	dispatch(setBreadcrumbMap({ breadcrumbMap }))

	/**
	 * det default openkeys and active tab
	 */
	// const setDefaultOpenKeys = (params) => {
	// 	const { keys, pathname } = params
	// 	setOpenKeys(keys)
	// 	dispatch(setTabActive({ tabActive: pathname }))
	// }

	/**
	 * jump content page
	 * @param e
	 */
	const clickMenu = (e: SubMenuType) => {
		const { key, keyPath } = e
		// console.log('--> clickMenu -> key:', key)
		// console.log('--> clickMenu -> keyPath:', keyPath)
		// console.log('--> 菜单中获取tab信息:', tabMap.get(key))
		/**
		 * 将 router path 存入 redux中
		 */
		const tabInfo = tabMap.get(key)
		dispatch(setTab({ tab: tabInfo, tabActive: tabInfo }))
		// dispatch(setTabActive({ tabActive: key }))
		navigateTo(key)
	}

	/**
	 * handle open/close menu
	 * @param openKeys
	 */
	const handleOpenMenu = (openKeys: string[]) => {
		// console.log('--> handleOpenMenu -> openKeys:', openKeys)
		setOpenKeys(openKeys)
	}

	return (
		<>
			<Spin spinning={loading} tip="Loading...">
				<Logo collapsed={collapsed} />
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					// default open menu
					// defaultOpenKeys={defaultOpenKeys}
					items={menuItems}
					// 初始选中的菜单项 key 数组
					// defaultSelectedKeys={defaultSelectKeys}
					onClick={clickMenu}
					onOpenChange={handleOpenMenu}
				/>
			</Spin>
		</>
	)
}

export default MenuLayout
