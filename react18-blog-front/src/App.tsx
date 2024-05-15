import { Button, ConfigProvider, Space, theme } from 'antd'
import { RouterView } from 'oh-router-react'
import { useBearStore } from '@/store/demo/bearStore'
import { rootConfig, rootRouterConfig } from '@/router/config'

function App() {
  return (
    <>
      <ConfigProvider
        // locale={i18nLocale}
        // componentSize={assemblySize}
        theme={{
          components: {
            Layout: {
              /* 这里是你的组件 token */
              // bodyBg: '#ffd666',
              /** Header **/
              // headerBg: '#ffffff',
              // headerHeight: 80,
              /** foot **/
              footerBg: '#eaff8f'
            },
            Card: {
              // headerBg:'red',
              // headerFontSizeSM: 20
              // colorBgContainer: 'red'
              // tabsMarginBottom: 10,
              // actionsLiMargin: '120px 0'
            },
            Menu: {
              activeBarHeight: 1,
              activeBarWidth: 1000
            }
          },

          /**
           * 设置统一主题风格 - 默认主题
           * theme.darkAlgorithm,
           * theme.compactAlgorithm
           */
          algorithm: theme.compactAlgorithm,
          token: {
            fontSize: 20
            // Seed Token, 影响范围大
            // colorPrimary: '#00b96b',
            // borderRadius: 2,
            // fontFamily: 'Apple Color Emoji',
            // colorBorder:'#7cb305'
            // 派生变量, 影响范围小
            // colorBgContainer: '#00b96b'
          }
        }}
      >
        <RouterView router={rootRouterConfig} />
      </ConfigProvider>
    </>
  )
}

export default App
