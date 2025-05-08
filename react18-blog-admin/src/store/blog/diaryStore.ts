import diaryApi from '@/apis/blog/diary/diaryApi'
import { DiaryApi, DiaryTableType } from '@/types/apis/blog/diary'
import { TablePageInfoType } from '@/types/base'
import { RowSelectionType } from 'antd/lib/table/interface'
import { create } from 'zustand'

interface DiaryState {
  diaryPageList: DiaryTableType[]
  tablePageInfo: TablePageInfoType
  tableLoading: boolean
}

interface DiaryAction {
  setDiaryPageList: (diaryPageList: DiaryTableType[]) => void
  setTablePageInfo: (tablePageInfo: TablePageInfoType) => void
  setTableLoading: (tableLoading: boolean) => void
}

const initDiaryDate = {
  diaryPageList: [],
  tablePageInfo: {
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  },
  tableLoading: false
}

const useDiaryStore = create<DiaryState & DiaryAction>()(set => ({
  ...initDiaryDate,
  setDiaryPageList: (diaryPageList: DiaryTableType[]) =>
    set(state => ({
      ...state,
      diaryPageList
    })),
  setTablePageInfo: (tablePageInfo: TablePageInfoType) =>
    set(state => {
      return {
        ...state,
        tablePageInfo
      }
    }),
  setTableLoading: (tableLoading: boolean) =>
    set(state => {
      return {
        ...state,
        tableLoading
      }
    })
}))

export { useDiaryStore }

/**
 * =================== diary Modal store ======================
 */
type DiaryModalState = {
  api: DiaryApi // 调用api
  title: string // Modal框标题
  action: string | 'create' | 'edit' | 'look' // Modal框操作类型
  openModal: boolean // 是否打开Modal框
  inputDisabled: boolean // Modal框中的input是否禁用
  diaryData?: DiaryTableType
  update: () => void
}

type DiaryModalAction = {
  setOpenModal: (openModal: boolean) => void
  setDiaryState: (modalParams: DiaryModalState) => void
  setAction: (action: string) => void
  setInputDisabled: (inputDisabled: boolean) => void
}

const intiDiaryModalData = {
  api: diaryApi,
  title: '',
  action: '',
  openModal: false,
  inputDisabled: false,
  update: () => {}
}

const useDiaryModalStore = create<DiaryModalState & DiaryModalAction>()(set => ({
  ...intiDiaryModalData,
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setDiaryState: (modalParams: DiaryModalState) =>
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

export { useDiaryModalStore }
