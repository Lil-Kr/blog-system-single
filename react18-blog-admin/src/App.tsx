import Router from 'oh-router'
import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import { RouterView } from 'oh-router-react'
import useTheme from './hooks/useTheme'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { useSystemStore } from './store/global'
import MessageProvider from '@/components/message/MessageProvider'
import { getBrowserLang } from './utils/common'
import { dynamicRoutes } from './router/dynamicRoutes'

function App() {
  const { language, assemblySize, setLanguage } = useSystemStore()
  const [i18nLocale, setI18nLocale] = useState(zhCN)
  const { rootRouterConfig } = dynamicRoutes()
  // const [rootConfig, setRootConfig] = useState<RouterItemType[]>([])
  // const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(rootConfig)
  // const { rootRouterConfig } = useRouterStore()
  // const { menuItems, tabMap } = useMenuTreeStore()
  // const { menuTree, loading } = useMenu()
  // console.log('--> rootRouterConfig:', rootRouterConfig.getRoutes())
  // const { rootRouterConfig } = dynamicRoutes()

  // useEffect(() => {
  //   const fetchDictList = async () => {
  //     try {
  //       // 全局使用国际化
  //       // i18n.changeLanguage(language || getBrowserLang())
  //       // i18n.changeLanguage(getBrowserLang())
  //       setLanguage(language || getBrowserLang())
  //       setAntdLanguage()
  //     } catch (error) {
  //       console.log('--> error:', JSON.stringify(error))
  //     }
  //   }
  //   fetchDictList()
  // }, [language])

  /**
   * 全局使用主题
   */
  useTheme()

  /**
   * 设置 antd 语言国际化
   * // todo: 国际化配置
   */
  const setAntdLanguage = () => {
    // 如果 状态管理器 中有默认语言就设置成 状态管理器 的默认语言, 没有默认语言就设置成浏览器默认语言
    if (language && language == 'zh') return setI18nLocale(zhCN)
    if (language && language == 'en') return setI18nLocale(enUS)
    if (getBrowserLang() == 'zh') return setI18nLocale(zhCN)
    if (getBrowserLang() == 'en') return setI18nLocale(enUS)
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
          <RouterView router={rootRouterConfig} />
        </MessageProvider>
      </ConfigProvider>
    </>
  )
}

export default App
