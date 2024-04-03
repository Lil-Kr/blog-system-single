import { LoginTpye } from '@/types/user'
import { create } from 'zustand'

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
const useLoginAdminStore = create<{
  loginData: { token: string }
  setToken: (loginState: LoginTpye.LoginRespType) => void
}>(set => ({
  /**
   * init data
   */
  loginData: {
    token: '初始化数据'
  },
  setToken: (loginData: LoginTpye.LoginRespType) => set({ loginData })
}))

export default useLoginAdminStore
