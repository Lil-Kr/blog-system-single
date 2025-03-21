import { OptionType } from '@/types/apis'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { create } from 'zustand'

/**
 * 字典详情状态管理
 */
type Actions = {
  setDictMap: (dictMap: Map<string, DictMapType[]>) => void
  setDictStatueType: (dictStatues: OptionType[]) => void
  setAclType: (aclTypes: OptionType[]) => void
  setRoleType: (roleTypes: OptionType[]) => void
}

type DictDetailState = {
  dictMap: Map<string, DictMapType[]>
  dictStatues: OptionType[]
  aclTypes: OptionType[]
  roleTypes: OptionType[]
}

const useDictDetailStore = create<DictDetailState & Actions>()(set => ({
  dictMap: new Map<string, DictMapType[]>(),
  dictStatues: [] as OptionType[],
  aclTypes: [] as OptionType[],
  roleTypes: [] as OptionType[],
  setDictMap: (dictMap: Map<string, DictMapType[]>) =>
    set(() => ({
      dictMap
    })),
  setDictStatueType: (dictStatues: OptionType[]) =>
    set(() => ({
      dictStatues
    })),
  setAclType: (aclTypes: OptionType[]) =>
    set(() => ({
      aclTypes: aclTypes
    })),
  setRoleType: (roleTypes: OptionType[]) =>
    set(() => ({
      roleTypes
    }))
}))

export { useDictDetailStore }

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
