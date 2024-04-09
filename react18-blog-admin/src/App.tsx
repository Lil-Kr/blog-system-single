import { useEffect, useState } from 'react'
import { Button, ConfigProvider, Space } from 'antd'
import { RouterView } from 'oh-router-react'
import { rootConfig, rootRouterConfig } from '@/router/config'
import useTheme from './hooks/useTheme'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import i18n from 'i18next'
import { useBreadcrumbStore, useSystemStore } from './store/global'
import { getBreadCrumbItems, getBrowserLang } from './utils/common'
import { BreadcrumbType } from './types/common/breadcrumbType'

function App() {
  const { language, assemblySize, setLanguage } = useSystemStore()
  const { setBreadcrumbMap } = useBreadcrumbStore()
  const [i18nLocale, setI18nLocale] = useState(zhCN)

  const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(rootConfig)

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

  useEffect(() => {
    // 全局使用国际化
    // i18n.changeLanguage(language || getBrowserLang())
    // i18n.changeLanguage(getBrowserLang())
    setLanguage(language || getBrowserLang())
    setAntdLanguage()
    setBreadcrumbMap(breadcrumbMap)
  }, [language])

  return (
    <>
      <ConfigProvider
        locale={i18nLocale}
        componentSize={assemblySize}
        // theme={{ // 设置统一主题风格
        //   token: {
        //     // Seed Token, 影响范围大
        //     colorPrimary: '#00b96b',
        //     borderRadius: 2,

        //     // 派生变量，影响范围小
        //     colorBgContainer: '#f6ffed'
        //   }
        // }}
      >
        <RouterView router={rootRouterConfig} />
      </ConfigProvider>
    </>
  )
}

export default App
