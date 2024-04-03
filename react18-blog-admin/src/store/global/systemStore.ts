import { GlobalState } from '@/types/common'
import { create } from 'zustand'

type Actions = {
  setLanguage: (language: string) => void
}

const useSystemStore = create<GlobalState & Actions>(set => ({
  /**
   * init data
   */
  assemblySize: 'middle',
  language: 'zh',
  themeConfig: {
    primary: '#1890ff',
    isDark: false,
    weakOrGray: ''
  },
  setLanguage: (language: string) => set(state => setLanguageFunc(state, language))
}))

const setLanguageFunc = (state: GlobalState & Actions, language: string) => {
  state.language = language
  return state
}

export default useSystemStore
