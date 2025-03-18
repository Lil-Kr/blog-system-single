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
}

type DictDetailState = {
  dictMap: Map<string, DictMapType[]>
  dictStatues: OptionType[]
  aclTypes: OptionType[]
}

const useDictDetailStore = create<DictDetailState & Actions>()(set => ({
  dictMap: new Map<string, DictMapType[]>(),
  dictStatues: [] as OptionType[],
  aclTypes: [] as OptionType[],
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
    }))
}))

export { useDictDetailStore }

/**
 * 权限模块数据管理
 */
type AclModuleState = {
  aclModuleSelector: OptionType[]
}

type AclModuleActions = {
  setAclModuleSeletor: (aclModuleList: OptionType[]) => void
}

const useAclModuleStore = create<AclModuleState & AclModuleActions>()(set => ({
  aclModuleSelector: [],
  setAclModuleSeletor: (aclModuleList: OptionType[]) =>
    set(state => ({
      ...state,
      aclModuleSelector: aclModuleList
    }))
}))

export { useAclModuleStore }
