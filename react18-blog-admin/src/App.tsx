import { useEffect, useState } from 'react'
import { Button, ConfigProvider, message, Space } from 'antd'
import { RouterView } from 'oh-router-react'
import { rootConfig, rootRouterConfig } from '@/router/config'
import useTheme from './hooks/useTheme'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
// import i18n from 'i18next'
import { useBreadcrumbStore, useSystemStore } from './store/global'
import { getBreadCrumbItems, getBrowserLang } from './utils/common'
import { BreadcrumbType } from './types/common/breadcrumbType'
import useDictDetailStore from './store/global/dictStore'
import { dictApi } from './apis/sys/dictApi'
import { DictMapType } from '@/types/apis/sys/dict/dictType'

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const { language, assemblySize, setLanguage } = useSystemStore()
  const { setBreadcrumbMap } = useBreadcrumbStore()
  const [i18nLocale, setI18nLocale] = useState(zhCN)
  const breadcrumbMap: Map<string, BreadcrumbType[]> = getBreadCrumbItems(rootConfig)

  // 初始化字典数据状态
  const { setDictMap } = useDictDetailStore()

  useEffect(() => {
    const fetchDictList = async () => {
      try {
        // 全局使用国际化
        // i18n.changeLanguage(language || getBrowserLang())
        // i18n.changeLanguage(getBrowserLang())
        setLanguage(language || getBrowserLang())
        setAntdLanguage()
        setBreadcrumbMap(breadcrumbMap)
        const dictMap: Map<string, DictMapType[]> = await initDictList()
        setDictMap(dictMap)
      } catch (error) {
        console.log('--> error:', JSON.stringify(error))
      }
    }

    fetchDictList()
  }, [language])

  /**
   * 初始化字典数据
   */
  const initDictList = async (): Promise<Map<string, DictMapType[]>> => {
    const dictTree = await dictApi.dictDetailTree()
    const { code, data } = dictTree
    if (code !== 200) {
      return new Map<string, DictMapType[]>()
    }
    return new Map(Object.entries(data))
  }

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
        {contextHolder}
        <RouterView router={rootRouterConfig} />
      </ConfigProvider>
    </>
  )
}

export default App
