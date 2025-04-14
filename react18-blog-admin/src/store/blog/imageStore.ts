import { create } from 'zustand'
import imageCategoryApi from '@/apis/image/imageCategoryApi'
import { ImageCategoryApi, ImageCategoryTableType } from '@/types/apis/image/imageType'
import { TablePageInfoType } from '@/types/base'
import { RowSelectionType } from 'antd/lib/table/interface'
import { ImageInfoUploadReq } from '@/apis/image/imageInfoApi'
import { IModalStyle } from '@/types/component/modal'
import { updateCenterAndZoom } from 'echarts/types/src/action/roamHelper.js'
import { UploadFile } from 'antd/lib'

/**
 * 图片分类状态管理
 */
type ImageCategoryState = {
  tableLoading: boolean
  tablePageInfo: TablePageInfoType
  selectionType: RowSelectionType
  imageCategoryPageList: ImageCategoryTableType[]
}

type ImageCategoryAction = {
  setTableLoading: (tableLoading: boolean) => void
  setTablePageInfo: (tablePageInfo: TablePageInfoType) => void
  setImageCategoryPageList: (imageCategoryPageList: ImageCategoryTableType[]) => void
}

const initImageCategoryData = {
  tableLoading: false,
  selectionType: 'checkbox' as RowSelectionType,
  tablePageInfo: { currentPageNum: 1, pageSize: 10, totalSize: 0 },
  imageCategoryPageList: []
}

const useImageCategoryStore = create<ImageCategoryState & ImageCategoryAction>()(set => ({
  ...initImageCategoryData,
  setTableLoading: (tableLoading: boolean) =>
    set(state => ({
      ...state,
      tableLoading
    })),
  setTablePageInfo: (tablePageInfo: TablePageInfoType) =>
    set(state => ({
      ...state,
      tablePageInfo
    })),
  setImageCategoryPageList: (imageCategoryPageList: ImageCategoryTableType[]) =>
    set(state => ({
      ...state,
      imageCategoryPageList
    }))
}))

export { useImageCategoryStore }

/**
 * 图片分类 Modal 状态管理
 */
export type ImageCategoryModalState = {
  api: ImageCategoryApi // 调用api
  title: string // Modal框标题
  action: string | 'create' | 'edit' | 'look' // Modal框操作类型
  openModal: boolean // 是否打开Modal框
  inputDisabled: boolean // Modal框中的input是否禁用usInfo: OptionType
  modalData?: ImageCategoryTableType // 传过去到Modal框的数据
  updateCallBack: () => void // Modal框关闭后的回调函数
}

export type ImageCategoryModalAction = {
  setOpenModal: (openModal: boolean) => void
  setImageCategoryModalState: (modalData: ImageCategoryModalState) => void
  setInputDisabled: (inputDisabled: boolean) => void
}

const initImageCategoryModalData = {
  api: imageCategoryApi,
  title: '添加标题',
  action: 'create',
  openModal: false,
  inputDisabled: false,
  updateCallBack: () => {}
}

const useImageCategoryModalStore = create<ImageCategoryModalState & ImageCategoryModalAction>()(set => ({
  ...initImageCategoryModalData,
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setImageCategoryModalState: (modalData: ImageCategoryModalState) =>
    set(state => ({
      ...state,
      ...modalData
    })),
  setInputDisabled: (inputDisabled: boolean) =>
    set(state => ({
      ...state,
      inputDisabled
    }))
}))

export { useImageCategoryModalStore }

/**
 * 图片管理Modal状态管理
 */
export type UploadImageType = {
  uid: string
  name: string
  progress: number
}

export interface UploadImageModalState {
  api: ImageCategoryApi
  openModal: boolean
  title: string
  action?: string
  modalReq: ImageInfoUploadReq
  previewOpen?: boolean
  previewImage?: string
  uploading?: boolean
  fileList: UploadFile[]
  uploadFiles?: UploadImageType[]
  update: () => void
}

export interface UploadImageModalAction {
  setUploadImageModalState: (modalData: UploadImageModalState) => void
  setOpenModal: (openModal: boolean) => void
  setFileList: (fileList: UploadFile[]) => void
  setPreviewOpen: (previewOpen: boolean) => void
  setPreviewImage: (previewImage: string) => void
  setUploading: (uploading: boolean) => void
  setUploadFiles: (uploadFiles: UploadImageType[]) => void
  clearModalData: () => void
}

const initUploadImageModalData = {
  api: {} as ImageCategoryApi,
  openModal: false,
  title: '',
  action: '',
  previewOpen: false,
  previewImage: '',
  uploading: false,
  fileList: [],
  uploadFiles: [],
  modalReq: { imageCategoryId: '' },
  update: () => {}
}

const useUploadImageModalStateStore = create<UploadImageModalState & UploadImageModalAction>()(set => ({
  ...initUploadImageModalData,
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setUploadImageModalState: (modalData: UploadImageModalState) =>
    set(state => ({
      ...state,
      ...modalData
    })),
  setFileList: (fileList: UploadFile[]) =>
    set(state => ({
      ...state,
      fileList
    })),
  setPreviewOpen: (previewOpen: boolean) =>
    set(state => ({
      ...state,
      previewOpen
    })),
  setPreviewImage: (previewImage: string) =>
    set(state => ({
      ...state,
      previewImage
    })),
  setUploading: (uploading: boolean) =>
    set(state => ({
      ...state,
      uploading
    })),
  setUploadFiles: (uploadFiles: UploadImageType[]) =>
    set(state => ({
      ...state,
      uploadFiles
    })),
  clearModalData: () =>
    set(state => ({
      ...state,
      ...initUploadImageModalData
    }))
}))

export { useUploadImageModalStateStore }
