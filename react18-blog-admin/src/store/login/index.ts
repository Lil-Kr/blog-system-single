import { LoginTpye } from '@/types/user'
import { stat } from 'fs'
import { create } from 'zustand'

// cookie
import cookie from 'react-cookies'
import { CLT } from '@/config'

/**
 * create 函数中必须指定泛型类型, 这样组件中通过 hook 获取到的对象才能更新其中状态值
 *
 * 1. 通过 hook 获取函数
 *  const { loginData, setToken } = useLoginAdminStore()
 *
 *  // 拿到自定义的值
 *  const token = useLoginAdminStore(state => state.loginData.token)
 *
 */

type Actions = {
  setToken: (token: string) => void
  removeToken: () => void
}

const useLoginAdminStore = create<LoginTpye.LoginRespType & Actions>(set => ({
  /**
   * init data
   */
  token: '',
  setToken: (token: string) => set(state => setTokenFunc(state, token)),
  removeToken: () => set(state => removeTokenFunc(state))
}))

/**
 * set token to cookie {CLT}
 * @param state
 * @param token
 * @returns
 */
const setTokenFunc = (state: LoginTpye.LoginRespType & Actions, token: string) => {
  const expirationDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  cookie.save(CLT, token, { path: '/', expires: expirationDate })
  return state
}

/**
 * remove token {CLT}
 * @param state
 * @returns
 */
const removeTokenFunc = (state: LoginTpye.LoginRespType & Actions) => {
  cookie.remove(CLT, { path: '/' })
  return state
}

export default useLoginAdminStore
