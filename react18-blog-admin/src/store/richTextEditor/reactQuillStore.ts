import { create } from 'zustand'

/**
 * =========== ReactQuill ===========
 */
interface ReactQuillState {
  contents: string
  setContents: (contents: string) => void
}

const reactQuillInit = {
  contents: 'write something .....'
}

const useReactQuillStore = create<ReactQuillState>()((set, get) => ({
  ...reactQuillInit,
  setContents: (contents: string) =>
    set(state => {
      return {
        ...state,
        contents
      }
    })
}))

export { useReactQuillStore }

/**
 * =========== Tinymce ===========
 */

interface TinymceState {
  contents: string
  setContents: (contents: string) => void
}

const tinymceInit = {
  contents: ''
}

const useTinymceStore = create<TinymceState>()((set, get) => ({
  ...tinymceInit,
  setContents: (contents: string) =>
    set(state => {
      return {
        ...state,
        contents
      }
    })
}))

export { useTinymceStore }
