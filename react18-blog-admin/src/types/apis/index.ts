import { Result } from '../base/response'
import { DictMapType } from './sys/dict/dictType'

export type BaseApi = {
  add?(params: any): Promise<Result<any>>
  edit?(params: any): Promise<Result<any>>
  // get?(params: any): Promise<Result<any>>
  delete?(params: any): Promise<Result<any>>
  deleteBatch?(params: any): Promise<Result<any>>
}

export type OptionType = {
  value?: string
  label?: string
}

export interface SelectOptionType {
  selectKeys: string[]
  aclModuleId: string
  value?: string
  label?: string
}

export type SelectTreeNodeType = {
  key: string
  name: string
}

export const transformTypeToSeletor = (statusDict: DictMapType[]): OptionType[] => {
  const res: OptionType[] = statusDict.map(({ type, name }) => ({
    value: type.toString() ?? '',
    label: name
  }))
  return res
}
