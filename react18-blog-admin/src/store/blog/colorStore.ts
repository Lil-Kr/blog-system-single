import { create } from 'zustand'

interface ColorState {
  colorHex: string
  setColorHex: (colorHex: string) => void
}

const colorInit = {
  colorHex: '#1677FF'
}

const useColorStore = create<ColorState>()((set, get) => ({
  ...colorInit,
  setColorHex: (colorHex: string) =>
    set(state => {
      return {
        ...state,
        colorHex
      }
    })
}))

export { useColorStore }
