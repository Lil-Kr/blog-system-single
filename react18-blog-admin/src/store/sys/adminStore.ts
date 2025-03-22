import { SysUser } from '@/types/apis/sys/user/userType'
import { create } from 'zustand'

/**
 * =========================== 存储后台用户登录后的信息 ===========================
 */
interface AdminLoginState {
  admin: SysUser
}

interface AdminLoginActions {
  setAdmin: (admin: SysUser) => void
}
// 初始化数据
const initAdminState = {
  admin: {} as SysUser
}

const useAdminLoginStore = create<AdminLoginState & AdminLoginActions>()(set => ({
  ...initAdminState,
  setAdmin: (admin: SysUser) =>
    set(state => {
      return {
        ...state,
        admin
      }
    })
}))

export { useAdminLoginStore }

/**
 * =========================== 用户管理(admin) 页面数据 store ===========================
 */
interface AdminState {}
