import { GlobalState } from "@/types/common"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SizeType } from "antd/lib/config-provider/SizeContext"

const globalState: GlobalState = {
  token: '',
  userInfo: '',
  assemblySize: 'middle',
  language: 'zh',
  themeConfig: {
    primary: '#1890ff',
    isDark: false,
    weakOrGray: ''
  }
}

const globalSlice = createSlice({
  name: "global",
  initialState: globalState,
  reducers: {
    setAssemblySize(state: GlobalState, { payload }: PayloadAction<SizeType>) {
      state.assemblySize = payload
    },
    setLanguage(state: GlobalState, { payload }: PayloadAction<string>) {
      state.language = payload
    },
    setAccessToken(state: GlobalState, { payload }: PayloadAction<string>) {
      state.token = payload
    },
    clearAccessToken(state: GlobalState) {
      state.token = ''
    }
  }
})

export const { setAssemblySize, setLanguage, setAccessToken, clearAccessToken } = globalSlice.actions
export const { reducer: globalReducer } = globalSlice