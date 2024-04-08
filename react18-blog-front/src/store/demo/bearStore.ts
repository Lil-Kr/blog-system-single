import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface BearState {
  bears: number
  increase: (by: number) => void
  decrease: (by: number) => void
}

/**
 * 不需要持久化
 */
export const useBearStore = create<BearState>()(
  persist(
    set => ({
      bears: 0,
      increase: by => set(state => ({ bears: state.bears + by })),
      decrease: by => set(state => ({ bears: state.bears - by }))
    }),
    { name: 'bearStore' }
  )

  // set => ({
  //   bears: 0,
  //   increase: by => set(state => ({ bears: state.bears + by })),
  //   decrease: by => set(state => ({ bears: state.bears - by }))
  // })
)

const decreaseFunc = (state: BearState, by: number) => {
  state.bears = state.bears - by
  return state
}
