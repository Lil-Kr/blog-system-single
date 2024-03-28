/**
 * definition breadcrumb slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BreadcrumbState } from "@/types/common/breadcrumbType"

const breadcrumbState: BreadcrumbState = {
  breadcrumbMap: new Map<string, string[]>(),
  breadcrumbList: []
}

const breadcrumbSlice = createSlice({
  name: "breadcrumb", // 自动生成action中的type
  initialState: breadcrumbState,
  reducers: {
    setBreadcrumbMap(state: BreadcrumbState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const { breadcrumbMap } = payload
      console.log('--> redux breadcrumbMap', breadcrumbMap)
      state.breadcrumbMap = breadcrumbMap
    }
  }
})

export const { setBreadcrumbMap } = breadcrumbSlice.actions
export const { reducer: breadcrumbReducer } = breadcrumbSlice