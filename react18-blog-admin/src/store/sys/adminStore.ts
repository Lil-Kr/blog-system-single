import { SysUser } from '@/types/apis/sys/user/userType'
import { create } from 'zustand'

interface AdminState {
  admin: SysUser
}

interface AdminActions {
  setAdmin: (admin: SysUser) => void
}

const initAdminState = {
  admin: {} as SysUser
}

const useAdminStore = create<AdminState & AdminActions>()(set => ({
  ...initAdminState,
  setAdmin: (admin: SysUser) =>
    set(state => {
      return {
        ...state,
        admin
      }
    })
}))

export { useAdminStore }
