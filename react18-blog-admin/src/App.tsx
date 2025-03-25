import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import { RouterView } from 'oh-router-react'
import useTheme from './hooks/useTheme'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { useSystemStore } from './store/global'
import MessageProvider from '@/components/message/MessageProvider'
import { getBrowserLang } from './utils/common'
import { Spin } from 'antd/lib'
import { resetPermissionRouters, rootRouterConfig } from '@/router/dynamicRoutes'
import { useTokenStore } from './store/login'
import { useAdminLoginStore } from './store/sys/adminStore'
import { SysUser } from './types/apis/sys/user/userType'
import { userApi } from './apis/sys'
import { useTranslation } from 'react-i18next'
import './locales/index' // 导入i18n配置

function App() {
  const { language, assemblySize, setLanguage } = useSystemStore()
  const [i18nLocale, setI18nLocale] = useState(zhCN)
  const { token } = useTokenStore()
  const { setAdmin } = useAdminLoginStore()
  const { i18n, t } = useTranslation()

  /**
   * 全局使用主题
   */
  useTheme()

  /**
   * 设置 antd 语言国际化
   */
  // const setAntdLanguage = () => {
  //   // 如果 状态管理器 中有默认语言就设置成 状态管理器 的默认语言, 没有默认语言就设置成浏览器默认语言
  //   if (language && language == 'zh') {
  //     setI18nLocale(zhCN)
  //     i18n.changeLanguage('zh')
  //     localStorage.setItem('language', 'zh')
  //     return
  //   }
  //   if (language && language == 'en') {
  //     setI18nLocale(enUS)
  //     i18n.changeLanguage('en')
  //     localStorage.setItem('language', 'en')
  //     return
  //   }

  //   const browserLang = getBrowserLang()
  //   if (browserLang == 'zh') {
  //     setI18nLocale(zhCN)
  //     i18n.changeLanguage('zh')
  //     localStorage.setItem('language', 'zh')
  //     return
  //   }
  //   if (browserLang == 'en') {
  //     setI18nLocale(enUS)
  //     i18n.changeLanguage('en')
  //     localStorage.setItem('language', 'en')
  //     return
  //   }
  // }

  useEffect(() => {
    // token有效时执行
    if (token && token !== '') {
      const initPermissionData = async () => {
        resetPermissionRouters(token)
        const admin = await retrieveAdmin()
        setAdmin(admin)
      }
      initPermissionData()
    }

    // const setI18nConfig = () => {
    //   try {
    //     // 全局使用国际化
    //     const currentLang = language || localStorage.getItem('language') || getBrowserLang()
    //     setLanguage(currentLang)
    //     // setAntdLanguage()
    //   } catch (error) {
    //     console.log('--> error:', JSON.stringify(error))
    //   }
    // }
    // setI18nConfig()
  }, [language, token])

  /**
   * 获取用户信息
   */
  const retrieveAdmin = async (): Promise<SysUser> => {
    const res = await userApi.get()
    const { code, data } = res
    if (code !== 200) {
      return {} as SysUser
    }
    return data
  }

  return (
    <>
      <ConfigProvider
        locale={i18nLocale}
        componentSize={assemblySize}
        theme={{
          components: {
            Layout: {
              // siderBg: '#ffbb96'
            }
          }
          // 设置统一主题风格
          //   token: {
          //     // Seed Token, 影响范围大
          //     colorPrimary: '#00b96b',
          //     borderRadius: 2,
          //     // 派生变量, 影响范围小
          //     colorBgContainer: '#f6ffed'
          //   }
        }}
      >
        <MessageProvider>
          <RouterView
            router={rootRouterConfig}
            splash={
              <div
                style={{
                  height: '100vh',
                  width: '100vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Spin size='large' />
              </div>
            }
          />
        </MessageProvider>
      </ConfigProvider>
    </>
  )
}

export default App
