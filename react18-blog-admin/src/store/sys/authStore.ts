import { MenuItemType, TabType } from '@/types/common'
import { MenuTreeType } from '@/types/apis/sys/menu/permissionType'
import { create } from 'zustand'

/**
 * =========================== 用户菜单-按钮权限 ===========================
 */
interface PermissionsState {
  menuItems: MenuItemType[]
  tabMap: Map<string, TabType>

  // 存储按钮权限
  btnSignSet: Set<string>
}

interface PermissionsAction {
  // setMenuTree: (menutree: MenuTreeType[]) => void
  setMenuItems: (menuItems: MenuItemType[]) => void
  setTabMap: (tabMap: Map<string, TabType>) => void
  setBtnSign: (btnSignList: string[]) => void
  resetPermissions: () => void
}

const initMenuState = {
  menuItems: [],
  tabMap: new Map<string, TabType>(),
  btnSignSet: new Set<string>()
}

const usePermissionsStore = create<PermissionsAction & PermissionsState>()(set => ({
  ...initMenuState,
  setMenuItems: (menuItems: MenuItemType[]) =>
    set(state => ({
      ...state,
      menuItems: menuItems
    })),
  setTabMap: (tabMap: Map<string, TabType>) =>
    set(state => {
      return {
        ...state,
        tabMap: tabMap
      }
    }),
    setBtnSign: (btnSignList: string[]) =>
    set(state => {
      return {
        ...state,
        btnSignSet: new Set<string>(btnSignList)
      }
    }),
    resetPermissions: () => {
      set(initMenuState)
    }
}))

export { usePermissionsStore }
