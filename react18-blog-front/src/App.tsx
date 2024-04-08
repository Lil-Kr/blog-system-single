import { Button, ConfigProvider, Space, theme } from 'antd'
import { RouterView } from 'oh-router-react'
import { useBearStore } from '@/store/demo/bearStore'
import { rootConfig, rootRouterConfig } from '@/router/config'

function App() {
  // const { bears, increase, decrease } = useBearStore()
  console.log('--> APP 也要渲染')
  return (
    <>
      <ConfigProvider
        // locale={i18nLocale}
        // componentSize={assemblySize}
        theme={{
          components: {
            Layout: {
              /* 这里是你的组件 token */
              bodyBg: '#d48806',
              footerBg: '#7cb305'
            },
            Menu: {
              activeBarHeight: 1,
              activeBarWidth: 1000
            }
          }
          // 暗黑主题
          // algorithm: theme.darkAlgorithm,
          // 设置统一主题风格
          // token: {
          //   // Seed Token, 影响范围大
          //   colorPrimary: '#00b96b',
          //   borderRadius: 2,

          //   // 派生变量，影响范围小
          //   colorBgContainer: '#00b96b'
          // }
        }}
      >
        <RouterView router={rootRouterConfig} />
      </ConfigProvider>
    </>
  )
}

export default App
