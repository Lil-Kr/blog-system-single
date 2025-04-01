import { create } from 'zustand'
import { TreeDataNode } from 'antd/lib'
import { OrgTableType, SysOrgListResp, SysOrgApi } from '@/types/apis/sys/org/orgType'
import { TablePageInfoType } from '@/types/base'
import { Key } from 'antd/lib/table/interface'
import { OptionType } from '@/types/apis'
import { orgApi } from '@/apis/sys'

/**
 * =================== org page store ======================
 */
interface OrgStates {
  orgTree: TreeDataNode[] | []
  orgPageList: OrgTableType[] | []
  tablePageInfo: TablePageInfoType
  expandedKeys: Key[] // 控制默认张开所有树节点
  selectedKeys: Key[] // 默认选中的节点
  selectorInfo: OptionType // 存储下拉框组件的值
  tableLoading: boolean
}

interface OrgActions {
  setOrgTree: (orgTree: TreeDataNode[]) => void
  setOrgPageList: (orgPageList: OrgTableType[]) => void
  setTablePageInfo: (tablePageInfo: TablePageInfoType) => void
  setExpandedKeys: (expandedKeys: Key[]) => void
  setSelectedKeys: (selectedKeys: string[]) => void
  setSelectorInfo: (selectorInfo: OptionType) => void
  setTableLoading: (tableLoading: boolean) => void
}

export const initOrgData = {
  orgTree: [],
  orgPageList: [],
  tablePageInfo: {
    currentPageNum: 1,
    pageSize: 20,
    totalSize: 0
  },
  expandedKeys: [],
  selectedKeys: [],
  selectorInfo: {
    value: '',
    label: ''
  },
  tableLoading: false
}

const useOrgStore = create<OrgStates & OrgActions>()(set => ({
  ...initOrgData,
  setOrgTree: (orgTree: TreeDataNode[]) =>
    set(state => {
      return {
        ...state,
        orgTree
      }
    }),
  setOrgPageList: (orgPageList: OrgTableType[]) =>
    set(state => {
      return {
        ...state,
        orgPageList
      }
    }),
  setTablePageInfo: (tablePageInfo: TablePageInfoType) =>
    set(state => {
      return {
        ...state,
        tablePageInfo
      }
    }),
  setExpandedKeys: (expandedKeys: Key[]) =>
    set(state => {
      return {
        ...state,
        expandedKeys
      }
    }),
  setSelectedKeys: (selectedKeys: string[]) =>
    set(state => {
      return {
        ...state,
        selectedKeys
      }
    }),
  setSelectorInfo: (selectorInfo: OptionType) =>
    set(state => {
      return {
        ...state,
        selectorInfo
      }
    }),
  setTableLoading: (tableLoading: boolean) =>
    set(state => ({
      ...state,
      tableLoading
    }))
}))

export { useOrgStore }

/**
 * =================== org Modal store ======================
 */
interface OrgModalState {
  api: SysOrgApi
  title: string
  action: string
  openModal: boolean
  modalStyle: React.CSSProperties
  inputDisabled: boolean
  req?: OrgTableType
  orgSelectorInfo: OptionType[]
  selectedOrgValue?: string // 存放下拉框组件的值, [上级组织]
  selectedStatueValue?: string // 存放下拉框组件的值, [状态]
}

interface OrgModalAction {
  setOrgModalState: (modalReq: OrgModalState) => void
  setOpenModal: (openModal: boolean) => void
  setOrgSelectorInfo: (orgSelectorInfo: OptionType[]) => void
  setInputDisabled: (inputDisabled: boolean) => void
  setSelectedOrgValue: (selectedOrgValue: string) => void
  setSelectedStatueValue: (selectedStatueValue: string) => void
}

const initOrgModalData = {
  api: orgApi,
  title: '添加',
  action: 'create',
  openModal: false,
  modalStyle: { maxWidth: '40vw' },
  inputDisabled: false,
  req: {} as OrgTableType,
  orgSelectorInfo: [],
  selectedOrgValue: '',
  selectedStatueValue: ''
}

const useOrgModalStore = create<OrgModalState & OrgModalAction>()(set => ({
  ...initOrgModalData,
  setOrgModalState: (modalReq: OrgModalState) =>
    set(state => ({
      ...state,
      ...modalReq
    })),
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setOrgSelectorInfo: (orgSelectorInfo: OptionType[]) =>
    set(state => ({
      ...state,
      orgSelectorInfo
    })),
  setInputDisabled: (inputDisabled: boolean) =>
    set(state => ({
      ...state,
      inputDisabled
    })),
  setSelectedOrgValue: (selectedOrgValue: string) =>
    set(state => ({
      ...state,
      selectedOrgValue
    })),
  setSelectedStatueValue: (selectedStatueValue: string) =>
    set(state => ({
      ...state,
      selectedStatueValue
    }))
}))

export { useOrgModalStore }
