import i18n from 'i18next'
import enUsTrans from './modules/en'
import zhCnTrans from './modules/zh'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: enUsTrans
  },
  zh: {
    translation: zhCnTrans
  }
}

i18n
  .use(initReactI18next) // 将 i18n 绑定到 React
  .init({
    resources,
    debug: false,
    lng: 'en', // 默认语言
    fallbackLng: 'zh', // 回退语言
    interpolation: {
      escapeValue: false // React 已经安全处理了
    }
  })

export default i18n
