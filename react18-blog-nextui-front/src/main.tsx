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
    <ThemeProvider attribute='class' defaultTheme='purple-dark' themes={['light', 'dark', 'purple-dark']}>
      <App />
    </ThemeProvider>
  </HeroUIProvider>
)
