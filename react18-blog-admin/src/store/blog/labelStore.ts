import labelApi from '@/apis/blog/label/labelApi'
import { LabelApi, LabelListTableType } from '@/types/apis/blog/labelType'
import { TablePageInfoType } from '@/types/base'
import { SelectProps } from 'antd/lib'
import { RowSelectionType } from 'antd/lib/table/interface'
import { create } from 'zustand'

/**
 * 标签管理页面状态管理
 */
interface LabelState {
  labelPageList: LabelListTableType[]
  labelList: SelectProps['options']
  tablePageInfo: TablePageInfoType
  rowKeys: React.Key[]
  rowSelectType: RowSelectionType
}

interface LabelAction {
  setLabelPageList: (blogPageTableList: LabelListTableType[]) => void
  setTablePageInfo: (tablePageInfo: TablePageInfoType) => void
  setRowKeys: (rowKeys: React.Key[]) => void
  setRowSelectType: (rowSelectType: RowSelectionType) => void
  setLabelList: (labelList: SelectProps['options']) => void
}

const initLabelDate = {
  labelPageList: [],
  labelList: [],
  tablePageInfo: {
    currentPageNum: 1,
    pageSize: 20,
    totalSize: 0
  },
  rowKeys: [],
  rowSelectType: 'checkbox' as RowSelectionType
}

const useLabelStore = create<LabelState & LabelAction>()(set => ({
  ...initLabelDate,
  setLabelPageList: (labelPageList: LabelListTableType[]) =>
    set(state => ({
      ...state,
      labelPageList
    })),
  setTablePageInfo: (tablePageInfo: TablePageInfoType) =>
    set(state => ({
      ...state,
      tablePageInfo
    })),
  setRowKeys: (rowKeys: React.Key[]) =>
    set(state => ({
      ...state,
      rowKeys
    })),
  setRowSelectType: (rowSelectType: RowSelectionType) =>
    set(state => ({
      ...state,
      rowSelectType
    })),
  setLabelList: (labelList: SelectProps['options']) =>
    set(state => ({
      ...state,
      labelList
    }))
}))

export { useLabelStore }

/**
 * ================== 标签管理modal框 ===============
 */
type LabelModalState = {
  api: LabelApi // 调用api
  title: string // Modal框标题
  action: string | 'create' | 'edit' | 'look' // Modal框操作类型
  openModal: boolean // 是否打开Modal框
  modalStyle: React.CSSProperties // Modal框样式
  inputDisabled: boolean // Modal框中的input是否禁用
  labelData?: LabelListTableType
}

type LabelModalAction = {
  setOpenModal: (openModal: boolean) => void
  setLabelState: (modalParams: LabelModalState) => void
  setAction: (action: string) => void
  setInputDisabled: (inputDisabled: boolean) => void
}

const intiLabelModalData = {
  api: labelApi,
  title: '添加标签',
  action: 'create',
  openModal: false,
  modalStyle: { maxWidth: '50vw' },
  inputDisabled: false
}

const useLabelModalStore = create<LabelModalState & LabelModalAction>()(set => ({
  ...intiLabelModalData,
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setLabelState: (modalParams: LabelModalState) =>
    set(state => ({
      ...state,
      ...modalParams
    })),
  setAction: (action: string) =>
    set(state => ({
      ...state,
      action
    })),
  setInputDisabled: (inputDisabled: boolean) =>
    set(state => ({
      ...state,
      inputDisabled
    }))
}))

export { useLabelModalStore }
