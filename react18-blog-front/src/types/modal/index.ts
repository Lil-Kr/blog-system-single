import { MutableRefObject } from 'react'

export interface IAction {
  action: string
  open: boolean
}

export interface IModalParams {
  title: string | ''
}

export interface IModalRequestAction<T> {
  api: T
}

export interface IModalProp<T> {
  mRef: MutableRefObject<
    | {
        open: (type: IAction, data: T) => void
      }
    | undefined
  >

  update: () => void
}

export namespace ModalType {
  export interface FullScreenModalType<T = any, D = any> {
    mRef: MutableRefObject<
      | {
          open: (requestParams: IModalRequestAction<T>, params: IModalParams, type: IAction, data: D) => void
        }
      | undefined
    >

    update?: () => void
  }
}
