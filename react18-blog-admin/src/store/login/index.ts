import { create } from 'zustand'

// cookie
import cookie from 'react-cookies'
import { CLT } from '@/config'
import { LoginTpye as LoginState } from '@/types/apis/sys/user/userType'
import { persist } from 'zustand/middleware'

/**
 * create 函数中必须指定泛型类型, 这样组件中通过 hook 获取到的对象才能更新其中状态值
 *
 * 1. 通过 hook 获取函数
 *  const { loginData, setToken } = useLoginAdminStore()
 *
 *  // 拿到自定义的值
 *  const token = useLoginAdminStore(state => state.loginData.token)
 */

// type Actions = {
//   setCookie: (token: string) => void
//   removeToken: () => void
// }

// const useLoginAdminStore = create<LoginTpye.LoginRespType & Actions>(set => ({
//   /**
//    * init data
//    */
//   token: '',
//   setCookie: (token: string) => set(state => setTokenFunc(state, token)),
//   removeToken: () => set(state => removeTokenFunc(state))
// }))

/**
 *
 */
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

// /**
//  * set token to cookie {CLT}
//  * @param state
//  * @param token
//  * @returns
//  */
// const setTokenFunc = (state: LoginTpye.LoginRespType & Actions, token: string) => {
//   const expirationDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
//   cookie.save(CLT, token, { path: '/', expires: expirationDate })
//   return state
// }

// /**
//  * remove token {CLT}
//  * @param state
//  * @returns
//  */
// const removeTokenFunc = (state: LoginTpye.LoginRespType & Actions) => {
//   cookie.remove(CLT, { path: '/' })
//   return state
// }

export { useTokenStore }
