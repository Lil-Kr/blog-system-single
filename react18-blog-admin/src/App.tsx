import { useState } from 'react'

import { Button, ConfigProvider, Space } from 'antd'
import { RouterView } from 'oh-router-react'
import { rootRouterConfig } from '@/router/config'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <ConfigProvider
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
