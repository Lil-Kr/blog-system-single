import { b } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'
import { create } from 'zustand'

interface LoginLoadingState {
  loginLoading: boolean
}

interface LoginLoadingAction {
  setLoginLoading: (load: boolean) => void
}

const initLoginLoading = {
  loginLoading: false
}

const useLoadingStore = create<LoginLoadingState & LoginLoadingAction>(set => ({
  ...initLoginLoading,
  setLoginLoading: (load: boolean) =>
    set(state => ({
      ...state,
      load
    }))
}))

export default useLoadingStore
