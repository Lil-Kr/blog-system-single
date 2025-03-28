import { OptionType } from '@/types/apis'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { create } from 'zustand'

/**
 * 字典详情状态管理
 */
type DictDetailState = {
  dictMap: Map<string, DictMapType[]>
  dictStatues: OptionType[]
  aclTypes: OptionType[]
  roleTypes: OptionType[]
  blogTypes: OptionType[]
  blogTopics: OptionType[]
  blogPublisStatue: OptionType[]
  switchStatue: OptionType[]
}

type Actions = {
  setDictMap: (dictMap: Map<string, DictMapType[]>) => void
  setDictStatueType: (dictStatues: OptionType[]) => void
  setAclType: (aclTypes: OptionType[]) => void
  setRoleType: (roleTypes: OptionType[]) => void
  setBlogType: (blogTypes: OptionType[]) => void
  setBlogTopic: (blogTopics: OptionType[]) => void
  setBlogPublisStatue: (blogPublisStatue: OptionType[]) => void
  setSwitchStatue: (switchStatue: OptionType[]) => void
}

const initDictDitailData = {
  dictMap: new Map<string, DictMapType[]>(),
  dictStatues: [] as OptionType[],
  aclTypes: [] as OptionType[],
  roleTypes: [] as OptionType[],
  blogTypes: [] as OptionType[],
  blogTopics: [] as OptionType[],
  blogPublisStatue: [] as OptionType[],
  switchStatue: [] as OptionType[]
}

const useDictDetailStore = create<DictDetailState & Actions>()(set => ({
  ...initDictDitailData,
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
    })),
  setBlogType: (blogTypes: OptionType[]) =>
    set(() => ({
      blogTypes
    })),
  setBlogTopic: (blogTopics: OptionType[]) =>
    set(() => ({
      blogTopics
    })),
  setBlogPublisStatue: (blogPublisStatue: OptionType[]) =>
    set(() => ({
      blogPublisStatue
    })),
  setSwitchStatue: (switchStatue: OptionType[]) =>
    set(() => ({
      switchStatue
    }))
}))

export { useDictDetailStore }
