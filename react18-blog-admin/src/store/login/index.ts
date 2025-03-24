import { create } from 'zustand'

// cookie
import cookie from 'react-cookies'
import { CLT } from '@/config'
import { LoginTpye as LoginState } from '@/types/apis/sys/user/userType'
import { persist } from 'zustand/middleware'

type TokenActions = {
  setToken: (token: string, loginStatue: boolean) => void
  clearToken: () => void
  resetToken: () => void
}

type LoginState = {
  lastActiveTime: number
  token: string
  loginStatue: boolean
}

const initToken = {
  lastActiveTime: Date.now(),
  token: '',
  loginStatue: false
}

const useTokenStore = create<LoginState & TokenActions>()(
  persist(
    (set, get) => ({
      ...initToken,
      setToken: (token: string, loginStatue: boolean) =>
        set(state => {
          return {
            ...state,
            token,
            loginStatue,
            lastActiveTime: Date.now()
          }
        }),
      clearToken: () =>
        set(state => {
          return {
            ...state,
            token: '',
            loginStatue: false
          }
        }),
      resetToken: () =>
        set(state => {
          return {
            ...state,
            lastActiveTime: Date.now()
          }
        })
    }),
    { name: 'auth-token' }
  )
)

export { useTokenStore }
