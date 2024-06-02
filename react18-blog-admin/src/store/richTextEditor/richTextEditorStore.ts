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
 * =========== Tinymce Store ===========
 */
interface TinymceState {
  tinyMceContents: string
  isTinymceEditorReady: boolean
  tinymecStatus: number
  setTinymecStatus: (tinymecStatus: number, contents: string) => void
  setTinyMCEContents: (contents: string) => void
  setTinymceEditorReady: (isTinymceEditorReady: boolean) => void
}

const tinymceInit = {
  tinymecStatus: 0, // 0: create, 1: edit
  tinyMceContents: '',
  isTinymceEditorReady: false
}

const useTinymceStore = create<TinymceState>()((set, get) => ({
  ...tinymceInit,

  setTinymecStatus: (tinymecStatus: number, contents: string) =>
    set(state => {
      return {
        ...state,
        tinyMceContents: contents,
        tinymecStatus
      }
    }),
  setTinyMCEContents: (tinyMceContents: string) =>
    set(state => {
      return {
        ...state,
        tinyMceContents
      }
    }),
  setTinymceEditorReady: (isTinymceEditorReady: boolean) =>
    set(state => {
      return {
        ...state,
        isTinymceEditorReady
      }
    })
}))

export { useTinymceStore }
