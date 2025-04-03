import { Result, ResultPage } from '@/types/base/response'
import { BaseApi, OptionType } from '@/types/apis/'
import { BaseEntityPageType } from '@/types/base'

export interface TableDictType extends Dict {
  key?: string
}

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
  type: number
  remark: string
}

/** ==================== dict map type ================= */
export interface DictMapType extends DictDetail {
  parentName: string
}

/** ==================== dict req resp ================= */

export interface DictAddReq {
  name: string
}

export interface DictEditReq {
  surrogateId: string
  name: string
  remark?: string
}

export interface DictDelReq {
  surrogateId: string
}

export interface DictPageListReq extends BaseEntityPageType {
  name?: string
}

export interface DictPageListResp extends Dict {}

/** ==================== dict detail ================= */

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: TableDictDetailType
  index: number
}

export interface TableDictDetailType {
  key: string
  surrogateId?: string | null
  parentId: string
  name: string
  type: number
  remark: string
}

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

export interface PageDictDetailReq extends BaseEntityPageType {
  dictId: string
  name?: string
  type?: number
}

export interface PageDictDetailResp extends DictDetail {}

export interface DictDetailAddReq {
  parentId: string
  name: string
  type: number
  remark?: string
}

export interface DictDetailEditReq {
  surrogateId: string
  parentId: string
  name: string
  type: number
  remark?: string
}

export interface DictDetailDeleteReq {
  surrogateId: string
}

export interface DictApi extends BaseApi {
  add(req: DictAddReq): Promise<Result<string>>
  edit(req: DictEditReq): Promise<Result<string>>
  delete(req: DictDelReq): Promise<Result<string>>
  retrieveDictPageList(req: DictPageListReq): Promise<ResultPage<DictPageListResp>>
  dictDetail(req: DictDetailListReq): Promise<Result<DictDetailResp>>
  retrievePageDictDetailList(req: PageDictDetailReq): Promise<ResultPage<PageDictDetailResp>>
  addDictDetail(req: DictDetailAddReq): Promise<Result<string>>
  editDictDetail(req: DictDetailEditReq): Promise<Result<string>>
  deleteDictDetail(req: DictDetailDeleteReq): Promise<Result<string>>
  dictDetailMapping(): Promise<Result<Map<string, DictMapType[]>>>
}
