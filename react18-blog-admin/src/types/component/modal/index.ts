import { MutableRefObject } from 'react'
import { BaseApi } from '../../apis'
import { Rule } from 'antd/es/form'
import exp from 'constants'

export interface IAction {
  action: string
  open: boolean
}

export interface IModalParams {
  title: string | ''
}

export interface IModalRequestAction {
  api: BaseApi
}

export interface IModalStyle {
  style: React.CSSProperties
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
  export interface InputType {
    name: string
    label: string
    textValue: string
    style: object
    rules?: Rule[]
  }

  export interface FullScreenModalType<T = any> {
    mRef: MutableRefObject<
      | {
          open: (
            requestParams: IModalRequestAction,
            params: IModalParams,
            type: IAction,
            items: InputType[],
            data: T
          ) => void
        }
      | undefined
    >

    update?: () => void
  }

  export type innerComponentType = 'all-input' | 'image-upload'

  export interface BaseModalType<T = any> {
    mRef: MutableRefObject<
      | {
          open: (
            requestParams: IModalRequestAction,
            params: IModalParams,
            type: IAction,
            modalStyle: IModalStyle,
            items: InputType[],
            data: T
          ) => void
        }
      | undefined
    >
    innerComponent?: innerComponentType
    update: () => void
  }

  export interface SaveBlogModal<T = any> {
    mRef: MutableRefObject<
      | {
          open: (
            requestParams: IModalRequestAction,
            params: IModalParams,
            type: IAction
            // items: InputType[],
            // data: T
          ) => void
        }
      | undefined
    >

    update?: () => void
  }

  export interface ImageUploadModal<T = any> {
    mRef: MutableRefObject<
      | {
          open: (
            requestParams: IModalRequestAction,
            params: IModalParams,
            type: IAction,
            data: T
          ) => void
        }
      | undefined
    >

    update: () => void
  }
}
