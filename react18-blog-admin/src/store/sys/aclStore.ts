import { aclApi, aclModuleApi } from '@/apis/sys'
import { OptionType } from '@/types/apis'
import { create } from 'zustand'
import { AclApi, AclModalType, AclModuleApi, AclModuleTableType, AclTableListType } from '@/types/apis/sys/acl/aclType'

/**
 * 权限模块modal框
 */
export type AclModuleModalState = {
  api: AclModuleApi // 调用api
  title: string // Modal框标题
  action: string | 'create' | 'edit' | 'look' // Modal框操作类型
  openModal: boolean // 是否打开Modal框
  modalStyle: React.CSSProperties // Modal框样式
  inputDisabled: boolean // Modal框中的input是否禁用
  modalSelector?: {
    // 当modal框中的selector组件变化时, 实时更新
    parentAclModuleInfo: OptionType
    statusInfo: OptionType
  }
  data?: AclModuleTableType // 传过去到Modal框的数据
}

type AclModuleAction = {
  setAclModule: (data: AclModuleTableType) => void
  setAclModuelState: (modalParams: AclModuleModalState) => void
  setOpenModal: (openModal: boolean) => void
  setInputDisabled: (inputDisabled: boolean) => void
  setModalSelector: (parentAclModuleInfo: OptionType, statusInfo: OptionType) => void
}

const aclModuleInit = {
  api: aclModuleApi,
  title: '添加权限模块',
  action: 'create',
  openModal: false,
  modalStyle: { maxWidth: '100vw' },
  inputDisabled: false,
  data: {} as AclModuleTableType,
  modalSelector: { parentAclModuleInfo: { label: '', value: '' }, statusInfo: { label: '', value: '' } }
}

const useAclModuleModalStore = create<AclModuleAction & AclModuleModalState>()(set => ({
  ...aclModuleInit,
  setAclModule: (data: AclModuleTableType) =>
    set(state => ({
      ...state,
      data
    })),
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setAclModuelState: (modalParams: AclModuleModalState) =>
    set(state => ({
      ...state,
      ...modalParams
    })),
  setInputDisabled: (inputDisabled: boolean) =>
    set(state => ({
      ...state,
      inputDisabled
    })),
  setModalSelector: (parentAclModuleInfo: OptionType, statusInfo: OptionType) =>
    set(state => ({
      ...state,
      modalSelector: {
        parentAclModuleInfo,
        statusInfo
      }
    }))
}))

export { useAclModuleModalStore }

/**
 * 权限点modal框
 */
type AclModalState = {
  api: AclApi // 调用api
  title: string // Modal框标题
  action: string | 'create' | 'edit' | 'look' // Modal框操作类型
  openModal: boolean // 是否打开Modal框
  modalStyle: React.CSSProperties // Modal框样式
  inputDisabled: boolean // Modal框中的input是否禁用
  data?: AclModalType // 传过去到Modal框的数据
  modalSelector?: {
    aclModuleInfo: OptionType
    statusInfo: OptionType
    aclTypeInfo: OptionType
  }
  isMenu: boolean
  isBtn: boolean
}

type AclModalAction = {
  setAclModalState: (modalParams: AclModalState) => void
  setAclModal: (data: AclTableListType) => void
  setOpenModal: (openModal: boolean) => void
  setInputDisabled: (inputDisabled: boolean) => void
  setModalSelector: (aclModuleInfo: OptionType, statusInfo: OptionType, aclTypeInfo: OptionType) => void
  setIsMenu: (isMenu: boolean) => void
  setIsBtn: (isBtn: boolean) => void
}

const initAclModal = {
  api: aclApi,
  title: '添加权限点',
  action: 'create',
  openModal: false,
  modalStyle: { maxWidth: '100vw' },
  inputDisabled: false,
  data: {} as AclTableListType,
  modalSelector: {
    aclModuleInfo: { label: '', value: '' },
    statusInfo: { label: '', value: '' },
    aclTypeInfo: { label: '', value: '' }
  },
  isMenu: false,
  isBtn: false
}

const useAclModalStore = create<AclModalState & AclModalAction>()(set => ({
  ...initAclModal,
  setAclModalState: (modalParams: AclModalState) =>
    set(state => ({
      ...state,
      ...modalParams
    })),
  setAclModal: (data: AclTableListType) =>
    set(state => ({
      ...state,
      data
    })),
  setOpenModal: (openModal: boolean) =>
    set(state => ({
      ...state,
      openModal
    })),
  setInputDisabled: (inputDisabled: boolean) =>
    set(state => ({
      ...state,
      inputDisabled
    })),
  setModalSelector: (aclModuleInfo: OptionType, statusInfo: OptionType, aclTypeInfo: OptionType) =>
    set(state => ({
      ...state,
      modalSelector: {
        aclModuleInfo,
        statusInfo,
        aclTypeInfo
      }
    })),
  setIsMenu: (isMenu: boolean) =>
    set(state => ({
      ...state,
      isMenu
    })),
  setIsBtn: (isBtn: boolean) =>
    set(state => ({
      ...state,
      isBtn
    }))
}))
export { useAclModalStore }
