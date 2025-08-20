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

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // defalut language
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false // 不转义特殊字符
  }
})

export default i18n
