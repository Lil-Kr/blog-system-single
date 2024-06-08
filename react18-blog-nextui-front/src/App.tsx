import { useState } from 'react'
import { rootConfig, rootRouterConfig } from '@/router/config'
import { RouterView } from 'oh-router-react'

function App() {
  return (
    <>
      <RouterView router={rootRouterConfig} />
    </>
  )
}
export default App
