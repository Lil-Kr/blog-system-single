import { create } from 'zustand'
import { BreadcrumbState } from '@/types/common'
import { persist } from 'zustand/middleware'
import { BreadcrumbType } from '@/types/common/breadcrumbType'

type Actions = {
  setBreadcrumbMap: (breadcrumbMap: Map<string, BreadcrumbType[]>) => void
}

/**
 * useBreadcrumbStore
 */
const useBreadcrumbStore = create<BreadcrumbState & Actions>()(
  persist(
    set => ({
      breadcrumbMap: new Map<string, BreadcrumbType[]>(),
      breadcrumbList: [],

      setBreadcrumbMap: (breadcrumbMap: Map<string, BreadcrumbType[]>) =>
        set(state => setBreadcrumbMapFunc(state, breadcrumbMap))
    }),

    { name: 'breadcrumbStore' }
  )
)

const setBreadcrumbMapFunc = (state: BreadcrumbState & Actions, breadcrumbMap: Map<string, BreadcrumbType[]>) => {
  state.breadcrumbMap = breadcrumbMap
  return state
}

export default useBreadcrumbStore
