import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import 'virtual:svg-icons-register'
// 导入国际化配置
import '@/locales'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      value={{
        light: 'light',
        dark: 'dark',
        'purple-dark': 'purple-dark'
      }}
      themes={['light', 'dark', 'purple-dark']} // 合法的主题列表
    >
      <App />
    </ThemeProvider>
  </HeroUIProvider>
)
