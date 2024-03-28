import React, { useEffect, useRef, useState } from 'react'
import { Tabs } from 'antd'
// import { useLocation, useNavigate } from 'react-router-dom'
import {useNavigate, useLocation} from 'oh-router-react'
import { RootState, useAppSelector, useAppDispatch } from '@/redux'
import { removeTab, setTabActive } from '@/redux/slice/global/tabs'
import { TabType } from '@/types/common/tabType'

const { TabPane } = Tabs
// css
import './index.scss'

const TabsLayout = () => {
	const dispatch = useAppDispatch()
	const navigateTo = useNavigate()
	const { pathname } = useLocation()
	/**
	 * 从 redux 读取最后一次打开的所有 tab, 并初始化展开的 tab
	 */
	const { tabsList, tabActive } = useAppSelector((state: RootState) => state.tab)
	// console.log('--> tabsList:', tabsList)
	// console.log('--> tabActive:', tabActive)

	// 初始化 首页
	const [items, setItems] = useState(tabsList)
	// const newTabIndex = useRef(0)
	const [activeKey, setActiveKey] = useState(tabActive.key)

	useEffect(() => {
		addTabs()
		setActiveKey(tabActive.key)
	}, [pathname])

	const onChange = (newActiveKey: string) => {
		dispatch(setTabActive({ tabActive: { key: newActiveKey, path: newActiveKey } }))
		setActiveKey(newActiveKey)
		navigateTo(newActiveKey)
	}

	/**
	 * 添加tab信息
	 */
	const addTabs = () => {
		setItems(tabsList)
	}

	const remove = (targetKey: string) => {
		// console.log('--> remove -> 当前的tabs信息:', tabsList)
		// console.log('--> 将要关闭的tab:', targetKey)

		/**
		 * 计算出删除 tab 位置的前一个tab的所引
		 */
		let delIndex = 0
		let curIndex = 0
		tabsList.forEach(function (item, index, arr) {
			// 获取待删除的tab index
			if (item.key === targetKey) {
				delIndex = index
			}
			// 获取当前选中的tab index
			if (item.key === pathname) {
				curIndex = index
			}
		})
		// console.log('--> delIndex:', delIndex)
		// console.log('--> curIndex:', curIndex)

		const newTabs = tabsList.filter((item) => item.key !== targetKey)
		// console.log('--> newTabs:', newTabs)

		let selectedIndex = 0
		if (delIndex > curIndex) {
			selectedIndex = curIndex
		} else if (delIndex < curIndex) {
			selectedIndex = curIndex - 1
		} else {
			selectedIndex = newTabs.length - 1
		}
		// console.log('--> :selectedIndex', selectedIndex)

		let newActiveTab: TabType = newTabs[selectedIndex]
		// console.log('--> newActiveTab:', newActiveTab)

		setItems(newTabs)
		setActiveKey(newActiveTab.key)
		navigateTo(newActiveTab.key)
		return { newTabs, newActiveTab }
	}

	const onEdit = (targetKey: string, action: 'add' | 'remove') => {
		if (action === 'add') {
			addTabs()
		} else {
			const { newTabs, newActiveTab } = remove(targetKey)
			// remove(targetKey)
			dispatch(removeTab({ tabsList: newTabs, tabActive: newActiveTab }))
		}
	}
	return (
		<div className="tabs">
			<Tabs
				hideAdd
				type="editable-card"
				onChange={onChange}
				activeKey={activeKey}
				onEdit={onEdit}
				items={items}
			></Tabs>
			<TabPane>sssss</TabPane>
		</div>
	)
}

export default TabsLayout
