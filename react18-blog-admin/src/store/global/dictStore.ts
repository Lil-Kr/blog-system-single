import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { create } from 'zustand'

type Actions = {
  setDictMap: (dictMap: Map<string, DictMapType[]>) => void
}

interface DictDetailState {
  dictMap: Map<string, DictMapType[]>
}

const useDictDetailStore = create<DictDetailState & Actions>()(set => ({
  dictMap: new Map<string, DictMapType[]>(),

  setDictMap: (dictMap: Map<string, DictMapType[]>) =>
    set(() => ({
      dictMap
    }))
}))

export default useDictDetailStore
