import { create } from 'zustand'
import { TabsState, TabType } from '@/types/common'
import { HOME_NAME, HOME_ROUTER_URL } from '@/config'
import { persist, createJSONStorage } from 'zustand/middleware'

type Actions = {
  pushTabList: (tabsList: TabType[]) => void
  setTabActive: (tabActive: TabType) => void
  setTab: (tabActive: TabsState) => void
  // setTabs: (tabActive: TabsState) => void
  removeTab: (tabActive: TabsState) => void
}

/**
 * useTabsStore
 */
const useTabsStore = create<TabsState & Actions>()(
  persist(
    (set, get) => ({
      /**
       * init data
       */
      tabActive: { key: HOME_ROUTER_URL, path: HOME_ROUTER_URL, label: HOME_NAME, closable: false },
      tabList: [{ key: HOME_ROUTER_URL, path: HOME_ROUTER_URL, label: HOME_NAME, closable: false }],

      pushTabList: (tabList: TabType[]) => set(state => pushTabListFunc(state, tabList)),
      setTabActive: (tabActive: TabType) => set(state => setTabActiveFunc(state, tabActive)),
      setTab: (tabState: TabsState) => set(state => setTabFunc(state, tabState)),
      // setTabs: (tabState: TabsState) => set(state => setTabsFunc(state, tabState)),
      removeTab: (tabState: TabsState) => set(state => setRemoveTabFunc(state, tabState))
    }),
    { name: 'tabsStore' }
  )
)

const pushTabListFunc = (state: TabsState & Actions, tabList: TabType[]) => {
  state.tabList = tabList
  return state
}

const setTabActiveFunc = (state: TabsState & Actions, tabActive: TabType) => {
  state.tabActive = tabActive
  return state
}

/**
 * 目前只使用了
 * @param state
 * @param tabState
 * @returns
 */
const setTabFunc = (state: TabsState & Actions, tabState: TabsState) => {
  /**
   * 这个过滤是打开过的就不重复打开tab, 可以直接跳转到对应tab
   * filter already open-ed tabs, if this new tab was open-ed, so don`t push into list
   */
  const tab = useTabsStore.getState().tabList.find(item => item.key === tabState.tabActive!.key)
  /**
   * if tab is null, then this new tab never open, so push into list
   */
  if (!tab) {
    state.tabList.push(tabState.tabActive!)
  }
  state.tabActive = tabState.tabActive!
  return state
}

// const setTabsFunc = (state: TabsState & Actions, tabState: TabsState) => {
//   const { tabList, tabActive } = tabState

//   state.tabList = tabList ?? []
//   state.tabActive = tabActive!
//   return state
// }

const setRemoveTabFunc = (state: TabsState & Actions, tabState: TabsState) => {
  const { tabList, tabActive } = tabState

  state.tabList = tabList ?? []
  state.tabActive = tabActive!
  return state
}

export default useTabsStore
