import { ReactNode } from 'react'

export interface LinkBaseType {
  key: string | number
  text?: string
  textColor?: string
  url?: string
  extend?: ReactNode
}

export interface LinkArchiveType extends LinkBaseType {
  date: string
  depict: string
}
