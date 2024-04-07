import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface BearState {
  bears: number
  increase: (by: number) => void
  decrease: (by: number) => void
}

export const useBearStore = create<BearState>()(
  persist(
    set => ({
      bears: 0,
      increase: by => set(state => ({ bears: state.bears + by })),
      decrease: by => set(state => ({ bears: state.bears - by }))
    }),
    { name: 'bearStore' }
  )
)
