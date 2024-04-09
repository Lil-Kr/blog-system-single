import { HOME_NAME, HOME_ROUTER_URL } from '@/config'
import { TabType } from '@/types/common'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** ================= Menus ================= **/

interface GlobaMenuState {
  collapsed: boolean
  selectedKeys: string[]
  openKeys: string[]
  setMenuStyleCollapsed: (collapsed: boolean) => void
  setSelectedKeys: (selectedKeys: string[]) => void
  setOpenMenuKeys: (openKeys: string[]) => void
  restMenuState: () => void
}

const menuInitialState = {
  collapsed: false,
  selectedKeys: [],
  openKeys: []
}

const useMenuStore = create<GlobaMenuState>()(
  persist(
    (set, get) => ({
      ...menuInitialState,
      setMenuStyleCollapsed: (collapsed: boolean) => set(state => ({ collapsed: (state.collapsed = collapsed) })),
      setSelectedKeys: (selectedKeys: string[]) =>
        set(state => ({ selectedKeys: (state.selectedKeys = selectedKeys) })),
      setOpenMenuKeys: (openKeys: string[]) => set(state => ({ openKeys: (state.openKeys = openKeys) })),
      restMenuState: () => {
        set(menuInitialState)
      }
    }),
    { name: 'useMenuStore' }
  )
)

export { useMenuStore }

/** ================================== tabs ================================== **/

interface GlobalTabsState {
  tabActive: TabType
  historyOpenTabs: TabType[]
  setTabActive: (tabActive: TabType) => void
  removeTab: (tabActive: TabType, newTabs: TabType[]) => void
  resetTabs: () => void
}

// define the initial state
const tabsInitialState = {
  tabActive: { key: HOME_ROUTER_URL, path: HOME_ROUTER_URL, label: HOME_NAME, closable: false },
  historyOpenTabs: [{ key: HOME_ROUTER_URL, path: HOME_ROUTER_URL, label: HOME_NAME, closable: false }]
}

const useTabsStoreTest = create<GlobalTabsState>()(
  persist(
    (set, get) => ({
      ...tabsInitialState,
      setTabActive: (tabActive: TabType) =>
        set(state => {
          let exsit = state.historyOpenTabs.some(item => item.key === tabActive.key)
          if (!exsit) {
            return {
              ...state,
              tabActive,
              historyOpenTabs: [...state.historyOpenTabs, tabActive]
            }
          } else {
            return { ...state, tabActive }
          }
        }),
      removeTab: (tabActive: TabType, newTabs: TabType[]) =>
        set(state => {
          return { ...state, tabActive, historyOpenTabs: newTabs }
        }),
      resetTabs: () => {
        set(tabsInitialState)
      }
    }),
    { name: 'tabsStoreTest' }
  )
)

export { useTabsStoreTest }
