import { useState } from 'react'
import { rootConfig, rootRouterConfig } from '@/router/config'
import { RouterView } from 'oh-router-react'

function App() {
  // const darkMode = useDarkMode(false)
  return (
    <>
      {/* <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background`}>
      </main> */}
      <RouterView router={rootRouterConfig} />
    </>
  )
}
export default App
