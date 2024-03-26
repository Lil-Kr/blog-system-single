import { GlobalState } from "@/types/common"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SizeType } from "antd/lib/config-provider/SizeContext"

const globalSystemState: GlobalState = {
  userInfo: '',
  assemblySize: 'middle',
  language: 'zh',
  themeConfig: {
    primary: '#1890ff',
    isDark: false,
    weakOrGray: ''
  }
}

const globalSystemSlice = createSlice({
  name: 'globalSystem',
  initialState: globalSystemState,
  reducers: {
    setAssemblySize(state: GlobalState, { payload }: PayloadAction<SizeType>) {
      state.assemblySize = payload
    },
    setLanguage(state: GlobalState, { payload }: PayloadAction<string>) {
      state.language = payload
    }
  }
})

export const { setAssemblySize, setLanguage } = globalSystemSlice.actions
export const { reducer: globalSystemReducer } = globalSystemSlice