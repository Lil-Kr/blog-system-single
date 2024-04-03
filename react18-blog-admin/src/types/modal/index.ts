import { MutableRefObject } from "react"

export interface IAction {
  action: string
  open: boolean
}

export interface IModalProp<T> {
  mRef: MutableRefObject<{open: (type: IAction, data: T) => void} | undefined>
  update: () => void
}
