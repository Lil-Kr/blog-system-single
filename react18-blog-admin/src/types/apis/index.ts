import { Result } from '../base/response'
import { SysAclModule } from './sys/acl/aclType'
import { DictMapType } from './sys/dict/dictType'

type BaseApi = {
  add?(params: any): Promise<Result<any>>
  edit?(params: any): Promise<Result<any>>
  // get?(params: any): Promise<Result<any>>
  delete?(params: any): Promise<Result<any>>
  deleteBatch?(params: any): Promise<Result<any>>
}

type OptionType = {
  value?: string
  label?: string
}

type SelectOptionType = {
  selectKeys: string[]
  aclModule: SysAclModule
  value?: string
  label?: string
}

type SelectTreeNodeType = {
  key: string
  name: string
}

export type { BaseApi, OptionType, SelectTreeNodeType, SelectOptionType }
