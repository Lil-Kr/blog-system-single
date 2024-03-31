import exp from "constants"
import { ApiResp } from "../http/respType"
import { BaseReqType } from "../http/reqType"

export namespace LabelType {
  export interface LabelFormType {
    number?: number | string
    name: string
    remark?: string
  }

  export interface LabelQueryType extends LabelRespType {
    pageNumb?:number
    pageSize?:number
  }

  export interface LabelRespType {
    id?:number
    surrogateId?: number | bigint
    number?: number | string
    name?: string
    remark?: string
    delete?: number
    creatorId?: number
    modifierId?: number
    createTime?: string
    updateTime?: string
  }
  
  export interface LabelList extends ApiResp<LabelRespType> {
    data: LabelRespType[]
  }
}

export namespace LabelStateType {

  export interface LabelState {
    tableLoading: boolean
    labels: LabelShowTableType[]
  }

  export interface LabelShowTableType extends BaseReqType {
    key: bigint | number | string
    number: string | number
    name: string
    remark: string
  }

  export interface LabelType extends BaseReqType {
    id?:number
    surrogateId?: number | bigint
    number?: number | string
    name?: string
    remark?: string
  }


}