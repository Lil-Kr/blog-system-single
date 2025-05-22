import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd/lib'
import { RouterView } from 'oh-router-react'
import zhCN from 'antd/lib/locale/zh_CN'
import { useSystemStore } from './store/global'
import MessageProvider from '@/components/message/MessageProvider'
import { Spin } from 'antd/lib'
import { resetPermissionRouters, rootRouterConfig } from '@/router/dynamicRoutes'
import { useTokenStore } from './store/login'
import { useAdminLoginStore } from './store/sys/adminStore'
import { SysUser } from './types/apis/sys/user/userType'
import { userApi } from './apis/sys'
import './locales/index' // 导入i18n配置

function App() {
  const { language, assemblySize } = useSystemStore()
  const [i18nLocale] = useState(zhCN)
  const { token } = useTokenStore()
  const { setAdmin } = useAdminLoginStore()

  /**
   * 全局使用主题
   */
  // useTheme()

  /**
   * 设置 antd 语言国际化
   */
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
  }, [token])

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
        locale={i18nLocale} // 必填参数，用来设置国际化语言
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
