/**
 * definition tabs slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TabsState } from "@/types/common"
import { TabType } from "@/types/common/tabType"
import { HOME_NAME, HOME_ROUTER_URL } from "@/config"

const tabState: TabsState = {
  tabActive: { key: HOME_ROUTER_URL, path: HOME_ROUTER_URL, label: HOME_NAME, closable: false },
  tabsList: [{ key: HOME_ROUTER_URL, path: HOME_ROUTER_URL, label: HOME_NAME, closable: false }]
}

const tabSlice = createSlice({
  name: "tab", // 自动生成action中的type
  initialState: tabState,
  reducers: {
    setTabList(state: TabsState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      state.tabsList = payload.tabsList
    },
    setTabActive(state: TabsState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const { tabActive } = payload
      // state.tabActive = payload.tabActive
      // console.log('--> 当前活跃的tab:', payload.tabActive)
      state.tabActive = tabActive
    },
    setTab(state: TabsState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const tab = state.tabsList.find((item) => item.key === payload.tab.key)
      if (!tab) {
        state.tabsList.push(payload.tab)
      }
      state.tabActive = payload.tabActive
    },
    setTabs(state: TabsState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      // console.log('--> reducer -> setTabs', payload)
      state.tabsList = payload.tabs
      state.tabActive = payload.tabActive
    },
    removeTab(state: TabsState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const { tabsList, tabActive } = payload
      state.tabActive = tabActive
      state.tabsList = tabsList
    }
  }
})

export const { setTabList, setTab, removeTab, setTabActive, setTabs } = tabSlice.actions
export const { reducer: tabReducer } = tabSlice