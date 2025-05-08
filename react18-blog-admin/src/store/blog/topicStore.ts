import { create } from 'zustand'
import { BlogTopicApi, TopiciTableType } from '@/types/apis/blog/topicType'
import blogTopicApi from '@/apis/blog/topic/topicApi'
import { TablePageInfoType } from '@/types/base'

/**
 * =================== topic page store ======================
 */
export type TopicState = {
  topicPageList: TopiciTableType[]
  tablePageInfo: TablePageInfoType
  tableLoading: boolean
}

export type TopicAction = {
  setTopicPageList: (topicPageList: TopiciTableType[]) => void
  setTableLoading: (tableLoading: boolean) => void
  setTablePageInfo: (tablePageInfo: TablePageInfoType) => void
}

const initTopicData = {
  topicPageList: [],
  tableLoading: false,
  tablePageInfo: {
    currentPageNum: 1,
    pageSize: 20,
    totalSize: 0
  }
}

const useBlogTopicStore = create<TopicState & TopicAction>()(set => ({
  ...initTopicData,
  setTopicPageList: (topicPageList: TopiciTableType[]) =>
    set(state => ({
      ...state,
      topicPageList
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

export { useBlogTopicStore }

/**
 * =================== topic Modal store ======================
 */
export type TopicModalState = {
  api: BlogTopicApi
  title: string
  action: string
  openModal: boolean
  inputDisabled: boolean
  modalStyle?: React.CSSProperties
  modalReq?: TopiciTableType
  data?: TopiciTableType
  update: () => void
}

export type TopicModalAction = {
  setTopicModalState: (topicModalState: TopicModalState) => void
  setOpenModal: (openModal: boolean) => void
}

const initTopicModalState = {
  api: blogTopicApi,
  title: '添加专题',
  action: 'create',
  openModal: false,
  inputDisabled: false,
  update: () => {}
}

const useBlogTopicModalStore = create<TopicModalState & TopicModalAction>()(set => ({
  ...initTopicModalState,
  setTopicModalState: (topicModalState: TopicModalState) =>
    set(state => ({
      ...state,
      ...topicModalState
    })),
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    }))
}))

export { useBlogTopicModalStore }
