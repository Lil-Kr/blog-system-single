import { ReactNode } from 'react'

type CardBaseDataType = {
  key: string | number
  svgIcon: ReactNode
  headTitle: ReactNode
  headRightContent?: {
    headMoreText: ReactNode
    moreUrl: string
  }
  content: ReactNode
}

export type { CardBaseDataType }
