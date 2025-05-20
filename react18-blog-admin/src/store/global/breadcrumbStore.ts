import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'
import { BreadcrumbType } from '@/types/common/breadcrumbType'

/**
 * 面包屑store
 */

interface BreadcrumbState {
  breadcrumbMap?: Map<string, BreadcrumbType[]>
  breadcrumbList?: string[]
}

interface Actions {
  setBreadcrumbMap: (breadcrumbMap: Map<string, BreadcrumbType[]>) => void
  resetBreadcrumbMap: () => void
}

const initBreadcrumbState: BreadcrumbState = {
  breadcrumbMap: new Map<string, BreadcrumbType[]>(),
  breadcrumbList: []
}

/**
 * useBreadcrumbStore
 */
const useBreadcrumbStore = create<BreadcrumbState & Actions>()(set => ({
  ...initBreadcrumbState,
  setBreadcrumbMap: (breadcrumbMap: Map<string, BreadcrumbType[]>) =>
    set(state => {
      return {
        ...state,
        breadcrumbMap: new Map(breadcrumbMap.entries())
      }
    }),
    resetBreadcrumbMap: () => {
      set(initBreadcrumbState)
    }
}))

export default useBreadcrumbStore
