import { HOME_NAME, HOME_ROUTER_URL } from '@/config'
import { TabType } from '@/types/common'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** ================= Menus ================= **/

interface GlobaMenuState {
  collapsed: boolean
  setMenuStyleCollapsed: (collapsed: boolean) => void
  selectedKeys: string[]
  setSelectedMenusKeys: (selectedKeys: string[]) => void
  openKeys: string[]
  setOpenMenuKeys: (openKeys: string[]) => void
  restMenuState: () => void
}

const menuInitialState = {
  collapsed: false,
  selectedKeys: [],
  openKeys: []
}

/**
 * 菜单全局store, 用于控制菜单的折叠状态, 选中项等全局状态
 */
const useMenuStore = create<GlobaMenuState>()(
  persist(
    (set, get) => ({
      ...menuInitialState,
      setMenuStyleCollapsed: (collapsed: boolean) => set(state => ({ collapsed: (state.collapsed = collapsed) })),
      setSelectedMenusKeys: (selectedKeys: string[]) =>
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

const useTabsStore = create<GlobalTabsState>()(
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
    { name: 'useTabsStore' }
  )
)

export { useTabsStore }

/** ========================== 登录成功后的loading ========================== **/

interface LoginLoadingState {
  loginLoading: boolean
}

interface LoginLoadingAction {
  setLoginLoading: (load: boolean) => void
}

const initLoginLoading = {
  loginLoading: false
}

const useLoadingStore = create<LoginLoadingState & LoginLoadingAction>(set => ({
  ...initLoginLoading,
  setLoginLoading: (load: boolean) =>
    set(state => ({
      ...state,
      load
    }))
}))

export { useLoadingStore }

/** ================================== 全局样式 ================================== **/

interface GlobalStyleState {
  btnSize: SizeType
  linkSize: SizeType
  tableSize: SizeType
  inputSize: SizeType
  formSize: SizeType
  loginFormSize: SizeType
}

interface GlobalStyleAction {
  setBtnSize: (btnSize: SizeType) => void
  setLinkSize: (linkSize: SizeType) => void
  setTableSize: (tableSize: SizeType) => void
  setInputSize: (inputSize: SizeType) => void
  setFormSize: (formSize: SizeType) => void
  setLoginFormSize: (loginFormSize: SizeType) => void
}

const initGlobalStyleData = {
  btnSize: 'small' as SizeType,
  linkSize: 'small' as SizeType,
  tableSize: 'small' as SizeType,
  inputSize: 'small' as SizeType,
  formSize: 'small' as SizeType,
  loginFormSize: 'large' as SizeType
}

const useGlobalStyleStore = create<GlobalStyleState & GlobalStyleAction>()(set => ({
  ...initGlobalStyleData,
  setBtnSize: (btnSize: SizeType) =>
    set(state => {
      return {
        ...state,
        btnSize
      }
    }),
  setLinkSize: (linkSize: SizeType) =>
    set(state => {
      return {
        ...state,
        linkSize
      }
    }),
  setTableSize: (tableSize: SizeType) =>
    set(state => {
      return {
        ...state,
        tableSize
      }
    }),
  setInputSize: (inputSize: SizeType) =>
    set(state => {
      return {
        ...state,
        inputSize
      }
    }),
  setFormSize: (formSize: SizeType) =>
    set(state => {
      return {
        ...state,
        formSize
      }
    }),
  setLoginFormSize: (loginFormSize: SizeType) =>
    set(state => {
      return {
        ...state,
        loginFormSize
      }
    })
}))

export { useGlobalStyleStore }
