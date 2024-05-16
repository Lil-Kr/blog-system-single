import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <ThemeProvider attribute='class' defaultTheme='light' themes={['light', 'dark', 'purple-dark']}>
      <App />
    </ThemeProvider>
  </NextUIProvider>
)
