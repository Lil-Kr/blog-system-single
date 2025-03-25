import { OptionType } from '@/types/apis'
import { create } from 'zustand'

/**
 * 权限模块数据管理
 */
type AclModuleState = {
  aclModuleSelector: OptionType[]
  menusOptions: OptionType[]
  isMenu: boolean
}

type AclModuleActions = {
  setAclModuleSeletor: (aclModuleList: OptionType[]) => void
  setMenusOptions: (menusOptions: OptionType[]) => void
  setIsMenu: (isMenu: boolean) => void
}

const initData = {
  aclModuleSelector: [],
  menusOptions: [
    { value: '0', label: '否' },
    { value: '1', label: '是' }
  ],
  isMenu: false
}

const useAclModuleStore = create<AclModuleState & AclModuleActions>()(set => ({
  ...initData,
  setAclModuleSeletor: (aclModuleList: OptionType[]) =>
    set(state => ({
      ...state,
      aclModuleSelector: aclModuleList
    })),
  setMenusOptions: (menusOptions: OptionType[]) =>
    set(state => ({
      ...state,
      ...menusOptions
    })),
  setIsMenu: (isMenu: boolean) =>
    set(state => ({
      ...state,
      isMenu
    }))
}))

export { useAclModuleStore }
