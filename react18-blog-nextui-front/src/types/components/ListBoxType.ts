import { ReactNode } from 'react'

export type ListBoxItemType = {
  id: string
  text: string
  url?: string
  extend?: {
    node: ReactNode
  }
}

export type compType = 'link' | 'other'
