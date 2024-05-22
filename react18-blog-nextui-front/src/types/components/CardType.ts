import { ReactNode } from 'react'

type CardBaseDataType = {
  key: string | number
  headTitle: string
  headMoreText: string
  moreUrl: string
  svgIcon: ReactNode
  content: ReactNode
}

export type { CardBaseDataType }
