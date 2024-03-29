import { useEffect, useState } from 'react'
import { Button, Spin, ConfigProvider } from 'antd'
import { onRouteBefore, routers, routersConfig } from '@/routers'
import { useRoutes } from 'react-router-dom'

import { RootState, useAppSelector, useAppDispatch } from './redux'
import { getBrowserLang } from './utils/common'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import i18n from 'i18next'
import { setLanguage } from './redux/slice/global/globalSystem'
import useTheme from './hooks/useTheme'
import RouterWaiter from 'react-router-waiter'

// console.log('--> import.meta.env:', import.meta.env)
// console.log('--> import.meta.env.MODE:', import.meta.env.MODE)
// console.log('--> import.meta.env.VITE_APP_BASE_API:', import.meta.env.VITE_APP_BASE_API)
// console.log('--> process.env.NODE_ENV:', process.env.NODE_ENV)

// console.log('--> loadEnv:', loadEnv)

const Router = () => {
	const elements = useRoutes(routers)
	return elements
}

const App = () => {
	const dispatch = useAppDispatch()
	const { language, assemblySize } = useAppSelector((state: RootState) => state.globalSystem)
	const [i18nLocale, setI18nLocale] = useState(zhCN)

	/**
	 * 全局使用主题
	 */
	useTheme()

	/**
	 * 设置 antd 语言国际化
	 */
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言, 没有默认语言就设置成浏览器默认语言
		if (language && language == 'zh') return setI18nLocale(zhCN)
		if (language && language == 'en') return setI18nLocale(enUS)
		if (getBrowserLang() == 'zh') return setI18nLocale(zhCN)
		if (getBrowserLang() == 'en') return setI18nLocale(enUS)
	}

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang())
		dispatch(setLanguage(language || getBrowserLang()))
		setAntdLanguage()
	}, [language])

	return (
		<>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
        
        {/* <RouterWaiter routes={routersConfig} onRouteBefore={onRouteBefore}>
        </RouterWaiter> */}
          <Router />
			</ConfigProvider>
		</>
	)
}

export default App
