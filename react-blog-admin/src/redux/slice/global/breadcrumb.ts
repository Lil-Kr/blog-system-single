/**
 * definition breadcrumb slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BreadcrumbState } from "@/types/common/breadcrumbType"

const breadcrumbState: BreadcrumbState = {
  breadcrumbMap: null,
  breadcrumbList: []
}

const breadcrumbSlice = createSlice({
  name: "breadcrumb", // 自动生成action中的type
  initialState: breadcrumbState,
  reducers: {
    setBreadcrumbMap(state: BreadcrumbState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      // const { payload } = action
      // console.log('--> redux - state:', state)
      // console.log('--> redux - breadcrumb:', payload)
      state.breadcrumbMap = payload.breadcrumbMap
      // state.breadcrumbList = payload.breadcrumbList
    }
  }
})

export const { setBreadcrumbMap } = breadcrumbSlice.actions
export const { reducer: breadcrumbReducer } = breadcrumbSlice