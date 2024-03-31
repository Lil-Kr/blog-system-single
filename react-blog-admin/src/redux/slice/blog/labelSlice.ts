import { AuthType } from "@/types/sys"
import { CLT } from "@/utils/constant/constant"
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

// type 
import {LabelStateType} from '@/types/blog'

const labelState: LabelStateType.LabelState = {
  tableLoading: true,
  labels: [
    {
      key: '1774382499825324030',
      number: '001',
      name: 'Java',
      remark: '备注1'
    },
    {
      key: '1774382499825324031',
      number: '002',
      name: 'C#',
      remark: '备注2'
    },
    {
      key: '1774382499825324034',
      number: '003',
      name: '操作系统',
      remark: '备注3'
    },
  ],
}

const labelSlice = createSlice({
  name: 'blogLabel',
  initialState: labelState,
  reducers: {
    addLabel(state: LabelStateType.LabelState, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const { labels } = payload
      const newLabels = labels.map(({ id, surrogateIdStr, number, name, remark }) => ({
        key: surrogateIdStr,
        number,
        name,
        remark
      }))

      console.log('--> redux newLabels: ', newLabels)
      state.labels.push(...newLabels)
    },
    editLabel(state, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const { label } = payload
    },
    deleteLabel(state, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const { label } = payload
    },
    setTableLoading(state, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const { tableLoading } = payload
      state.tableLoading = tableLoading
    },
  }
})

export const { addLabel, editLabel, deleteLabel, setTableLoading } = labelSlice.actions
export const { reducer: blogLabelReducer } = labelSlice