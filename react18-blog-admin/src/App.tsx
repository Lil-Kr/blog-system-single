import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import { RouterView } from 'oh-router-react'
import { rootConfig, rootRouterConfig } from '@/router/config'
import useTheme from './hooks/useTheme'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
// import i18n from 'i18next'
import { useBreadcrumbStore, useSystemStore } from './store/global'
import { getBreadCrumbItems, getBrowserLang } from './utils/common'
import { BreadcrumbType } from './types/common/breadcrumbType'
import MessageProvider from '@/components/message/MessageProvider'

function App() {
  const { language, assemblySize, setLanguage } = useSystemStore()
  const { setBreadcrumbMap } = useBreadcrumbStore()
  const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(rootConfig)

  const [i18nLocale, setI18nLocale] = useState(zhCN)

  useEffect(() => {
  console.log('--> import.meta.env.BASE_URL:', import.meta.env.BASE_URL)
    const fetchDictList = async () => {
      try {
        // 全局使用国际化
        // i18n.changeLanguage(language || getBrowserLang())
        // i18n.changeLanguage(getBrowserLang())
        setLanguage(language || getBrowserLang())
        setAntdLanguage()
        setBreadcrumbMap(breadcrumbMap)
      } catch (error) {
        console.log('--> error:', JSON.stringify(error))
      }
    }

    fetchDictList()
  }, [language])

  /**
   * 全局使用主题
   */
  useTheme()

  /**
   * 设置 antd 语言国际化
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
