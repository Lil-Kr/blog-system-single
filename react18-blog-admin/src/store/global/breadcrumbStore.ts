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
}

/**
 * useBreadcrumbStore
 */
const useBreadcrumbStore = create<BreadcrumbState & Actions>()(set => ({
  breadcrumbMap: new Map<string, BreadcrumbType[]>(),
  breadcrumbList: [],

  setBreadcrumbMap: (breadcrumbMap: Map<string, BreadcrumbType[]>) =>
    set(state => {
      return {
        ...state,
        breadcrumbMap: new Map(breadcrumbMap.entries())
      }
    })
}))

export default useBreadcrumbStore
