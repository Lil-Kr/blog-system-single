import { ReactNode } from 'react'

export interface ListBoxItemType {
  id: string
  text: string
  url?: string
  extend?: {
    node: ReactNode
  }
}

export type CompType = 'link' | 'other'
