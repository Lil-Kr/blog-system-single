import { ReactNode } from 'react'

type CardBaseDataType = {
  key: string | number
  svgIcon: ReactNode
  headTitle: ReactNode
  headRightContent?: {
    headMoreText: string
    moreUrl: string
  }
  content: ReactNode
}

export type { CardBaseDataType }
