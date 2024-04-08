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

  // (set, get) => ({
  //   ...menuInitialState,
  //   setMenuStyleCollapsed: (collapsed: boolean) => set(state => ({ collapsed: (state.collapsed = collapsed) })),
  //   setSelectedKeys: (selectedKeys: string[]) =>
  //     set(state => ({ selectedKeys: (state.selectedKeys = selectedKeys) })),
  //   setOpenMenuKeys: (openKeys: string[]) => set(state => ({ openKeys: (state.openKeys = openKeys) })),
  //   restMenuState: () => {
  //     set(menuInitialState)
  //   }
  // }),
)

export { useMenuStore }

/** ================================== tabs ================================== **/

interface GlobalTabsState {
  tabActive: TabType
  historyOpenTabs: TabType[]
  setTabActive: (tabActive: TabType) => void
  setTabActive2: (tabActive: TabType) => void
  pushHistoryOpenTabs: (tabActive: TabType) => void
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
          state.tabActive = tabActive
          let tempHistorys = get().historyOpenTabs
          let tempArr = tempHistorys.find(item => item.key === tabActive.key)
          if (!tempArr) {
            state.historyOpenTabs.push(tabActive)
          }
          return state
        }),
      setTabActive2: (tabActive: TabType) => set(state => ({ tabActive: (state.tabActive = tabActive) })),
      pushHistoryOpenTabs: (tabActive: TabType) =>
        set(state => {
          let tempHistorys = get().historyOpenTabs
          let tempArr = tempHistorys.filter(item => item.key === tabActive.key)
          if (tempArr.length <= 0) {
            state.historyOpenTabs.push(tabActive)
          }
          return state
        }),
      removeTab: (tabActive: TabType, newTabs: TabType[]) =>
        set(state => {
          state.tabActive = tabActive

          // let tempHistorys = get().historyOpenTabs
          // let tempArr = tempHistorys.filter(item => item.key !== tabActive.key)
          // console.log('--> 移除tab后剩余的tab:tempArr  ', tempArr)

          state.historyOpenTabs = newTabs
          return state
        }),
      resetTabs: () => {
        set(tabsInitialState)
      }
    }),
    { name: 'tabsStoreTest' }
  )
)

export { useTabsStoreTest }
