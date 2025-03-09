import { Result, ResultPage } from '@/types/base/response'
import { BaseApi, OptionType } from '@/types/apis/'
import { BaseEntityPageType } from '@/types/base'
import { ExpandOutlined } from '@ant-design/icons'

export interface Dict {
  id: string
  surrogateId: string
  name: string
  remark: string
  deleted: number
  operator: string
  operateIp: string
  createTime: string
  updateTime: string
}

export interface DictDetail {
  surrogateId: string
  parentId: string
  name: string
  type: string
  remark: string
}

/** ==================== dict detail ================= */

export interface DictDetailListReq {
  dictSurrogateId: string
}

export interface DictDetailResp {
  id: string
  surrogateId: string
  parentId: string
  name: string
  type: string
  remark: string
  deleted: number
  operator: string
  operateIp: string
  createTime: string
  updateTime: string
  dictDetailVOList: DictDetail[]
}

export interface DictApi extends BaseApi {
  // add(req: AclAddReq): Promise<Result<string>>
  dictDetail(req: DictDetailListReq): Promise<Result<DictDetailResp>>
  // edit(req: AclModuleEditReq): Promise<Result<string>>
}
