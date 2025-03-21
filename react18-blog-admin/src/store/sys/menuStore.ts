import { MenuType } from '@/types/apis/sys/menu/menuType'
import { MenuItemType, TabType } from '@/types/common'
import { create } from 'zustand'

interface MenuState {
  menuTree: MenuType[]
  menuItems: MenuItemType[]
  tabMap: Map<string, TabType>
}

type MenuAction = {
  setMenuTree: (menutree: MenuType[]) => void
  setMenuItems: (menuItems: MenuItemType[]) => void
  setTabMap: (tabMap: Map<string, TabType>) => void
}

const initMenuState = {
  menuTree: [],
  menuItems: [],
  tabMap: new Map<string, TabType>()
}

const useMenuTreeStore = create<MenuAction & MenuState>()(set => ({
  ...initMenuState,
  setMenuTree: (menutree: MenuType[]) =>
    set(state => {
      return {
        ...state,
        menutree: menutree
      }
    }),
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
    })
}))

export { useMenuTreeStore }
