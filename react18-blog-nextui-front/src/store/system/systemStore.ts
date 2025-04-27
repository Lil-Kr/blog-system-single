import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SystemConfigState {
  language: string
}

interface SystemConfigAction {
  setLanguage: (language: string) => void
}

const initSystemConfig = {
  language: 'en'
}

const useSystemConfigStore = create<SystemConfigState & SystemConfigAction>()(
  persist(
    (set, get) => ({
      ...initSystemConfig,
      setLanguage: (language: string) =>
        set(state => {
          return { ...state, language }
        })
    }),
    { name: 'systemConfig' }
  )
)

export { useSystemConfigStore }
