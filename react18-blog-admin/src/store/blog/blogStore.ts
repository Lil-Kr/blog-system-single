import { BlogContentApi, BlogContentTableType } from '@/apis/blog/content/blogContentApi'
import { OptionType } from '@/types/apis'
import { TablePageInfoType } from '@/types/base'
import { SelectProps } from 'antd/lib'
import { create } from 'zustand'

interface BlogState {
  blogPageTableList: BlogContentTableType[]
  tablePageInfo: TablePageInfoType
  tableLoading: boolean
}

interface BlogAction {
  setBlogPageList: (blogPageTableList: BlogContentTableType[]) => void
  setTablePageInfo: (tablePageInfo: TablePageInfoType) => void
  clearBlogPageList: () => void
}

const initBlogData = {
  blogPageTableList: [],
  tablePageInfo: {
    currentPageNum: 1,
    pageSize: 20,
    totalSize: 0
  },
  tableLoading: false
}

const useBlogStore = create<BlogState & BlogAction>()(set => ({
  ...initBlogData,
  setBlogPageList: (blogPageTableList: BlogContentTableType[]) =>
    set(state => ({
      ...state,
      blogPageTableList: blogPageTableList
    })),
  setTablePageInfo: (tablePageInfo: TablePageInfoType) =>
    set(state => {
      return {
        ...state,
        tablePageInfo
      }
    }),
  clearBlogPageList: () =>
    set(state => ({
      ...state,
      blogPageTableList: []
    }))
}))

export { useBlogStore }

/**
 * =================== blog Modal store ======================
 */
// 从列表打开Modal时, 绑定到Modal的参数类型
export interface BlogContentModalType {
  key?: string
  surrogateId?: string
  title?: string
  imgUrl?: string
  introduction?: string
  blogLabelList?: SelectProps['options']
  categoryInfo?: OptionType
  topicInfo?: OptionType
  original?: string
  recommend?: string
  publishStatue?: string // 发布状态
  publishTime?: string
  contentText?: string
}

// Modal 保存数据时传递的参数类型
export interface BlogContentModalSaveReq {
  surrogateId?: string
  title?: string
  introduction?: string
  original?: string
  recommend?: string
  status?: string
  categoryId?: string
  labelIds?: string[]
  topicId?: string
  imgUrl?: string
  contentText?: string
}

export type BlogMoadlState = {
  api: BlogContentApi
  openModal: boolean
  title: string
  action: string
  inputDisabled: boolean
  modalReq?: BlogContentModalType
  saveReq?: BlogContentModalSaveReq
  update: () => void
  openImageModal: boolean
  imageModaltitle: string
  uploadImageRichEditor?: string[]
}

export type BlogMoadlAction = {
  setBlogModalData: (blogModalData: BlogMoadlState) => void
  setOpenModal: (openModal: boolean) => void
  setSaveReq: (req: BlogContentModalSaveReq) => void
  setBlogContent: (content: string) => void
  setOpenImageModal: (openImageModal: boolean) => void
  setUploadImageRichEditor: (url: string) => void
  clearSaveReq: () => void
}

const initBlogModalData: BlogMoadlState = {
  api: {} as BlogContentApi,
  openModal: false,
  title: '创建博客',
  action: 'create',
  inputDisabled: false,
  update: () => {},
  openImageModal: false,
  imageModaltitle: '',
  uploadImageRichEditor: []
}

const useBlogModalStore = create<BlogMoadlState & BlogMoadlAction>()(set => ({
  ...initBlogModalData,
  setBlogModalData: (blogModalData: BlogMoadlState) =>
    set(state => ({
      ...state,
      ...blogModalData
    })),
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setOpenImageModal: (openImageModal: boolean) =>
    set(state => ({
      ...state,
      openImageModal
    })),
  setSaveReq: (req: BlogContentModalSaveReq) =>
    set(state => ({
      ...state,
      saveReq: req
    })),
  setBlogContent: (content: string) =>
    set(state => ({
      ...state,
      saveReq: {
        ...state.saveReq,
        contentText: content
      }
    })),
  setUploadImageRichEditor: (url: string) =>
    set(state => {
      // let uploadImageRichEditor: string[] = state.uploadImageRichEditor
      // uploadImageRichEditor.push(url)
      return {
        ...state,
        uploadImageRichEditor: [...(state.uploadImageRichEditor ?? []), url]
      }
    }),
  clearSaveReq: () =>
    set(state => ({
      ...state,
      saveReq: {}
    }))
}))

export { useBlogModalStore }
