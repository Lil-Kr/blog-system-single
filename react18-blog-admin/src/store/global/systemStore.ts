import { create } from 'zustand'
import { ThemeConfigProp } from '@/types/common'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useTranslation } from 'react-i18next'

type Actions = {
  setLanguage: (language: string) => void
  clearAllState: () => void
}

type GlobalState = {
  assemblySize?: SizeType
  language?: string
  themeConfig?: ThemeConfigProp
}

const initialState = {
  assemblySize: 'middle' as SizeType,
  language: 'zh',
  themeConfig: {
    primary: '#1890ff',
    isDark: false,
    weakOrGray: ''
  }
}

const useSystemStore = create<GlobalState & Actions>()(set => ({
  ...initialState,
  setLanguage: (language: string) =>
    set(state => ({
      ...state,
      language
    })),
  clearAllState: () =>
    set(state => ({
      ...state
    }))
}))

export default useSystemStore
