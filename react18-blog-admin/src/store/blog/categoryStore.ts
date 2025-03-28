import blogCategoryApi from '@/apis/blog/category/categoryApi'
import { BlogCategoryApi, CategoryTableType } from '@/types/apis/blog/category'
import { TablePageInfoType } from '@/types/base'
import { create } from 'zustand'

/**
 * =================== category page store ======================
 */
interface CategoryStates {
  categoryPageList: CategoryTableType[]
  tablePageInfo: TablePageInfoType
  tableLoading: boolean
}

interface CategoryActions {
  setCategoryPageList: (categoryPageList: CategoryTableType[]) => void
  setTablePageInfo: (tablePageInfo: TablePageInfoType) => void
  setTableLoading: (tableLoading: boolean) => void
}

export const initCategoryData = {
  categoryPageList: [],
  tablePageInfo: {
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  },
  tableLoading: false
}

const useCategoryStore = create<CategoryStates & CategoryActions>()(set => ({
  ...initCategoryData,
  setCategoryPageList: (categoryPageList: CategoryTableType[]) =>
    set(state => {
      return {
        ...state,
        categoryPageList
      }
    }),
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

export { useCategoryStore }

/**
 * =================== category Modal store ======================
 */
type CategoryModalState = {
  api: BlogCategoryApi
  title: string
  action: string
  openModal: boolean
  inputDisabled: boolean
  modalStyle: React.CSSProperties
  req?: CategoryTableType
  data?: CategoryTableType
  update?: () => void
}

type CategoryModalAction = {
  setCategoryModal: (data: CategoryModalState) => void
  setOpenModal: (openModal: boolean) => void
  setRequestParams: (data: CategoryTableType) => void
}

const initCategoryModalData = {
  api: blogCategoryApi,
  title: '添加分类',
  action: 'create',
  openModal: false,
  inputDisabled: false,
  modalStyle: { maxWidth: '50vw' },
  data: {} as CategoryTableType
}

const useCategoryModalStore = create<CategoryModalState & CategoryModalAction>()(set => ({
  ...initCategoryModalData,
  setOpenModal: (openModal: boolean) =>
    set(state => {
      return {
        ...state,
        openModal
      }
    }),
  setCategoryModal: (data: CategoryModalState) =>
    set(state => {
      return {
        ...state,
        ...data
      }
    }),
  setRequestParams: (data: CategoryTableType) =>
    set(state => {
      return {
        ...state,
        data: { ...data }
      }
    })
}))

export { useCategoryModalStore }
