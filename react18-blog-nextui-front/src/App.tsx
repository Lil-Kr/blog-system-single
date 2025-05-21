import { rootRouterConfig } from '@/router/config'
import { RouterView } from 'oh-router-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSystemConfigStore } from './store/system/systemStore'

function App() {
  const { i18n } = useTranslation()
  const { language } = useSystemConfigStore()
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])
  return (
    <>
      <RouterView router={rootRouterConfig} />
    </>
  )
}
export default App
