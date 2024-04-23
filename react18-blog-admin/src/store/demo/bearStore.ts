import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()(
  // persist(
  //   set => ({
  //     bears: 0,
  //     increase: by => set(state => ({ bears: state.bears + by }))
  //   }),
  //   { name: 'bearStore' }
  // )

  set => ({
    bears: 0,
    increase: by => set(state => ({ bears: state.bears + by }))
  })
)
