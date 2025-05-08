import { BasePageReq } from '@/types/base'
import { BaseApi } from '..'
import { Result, ResultPage } from '@/types/base/response'

export interface Diary {
  id: string
  title: string
  content: string
  creatorId: string
  operatorId: string
  creatorName: string
  operatorName: string
  createTime: string
  updateTime: string
}

export interface DiaryTableType extends Diary {
  key: string
}

/** ================= api type =================== */
export interface DiaryPageReq extends BasePageReq {}

export interface DiaryPageResp extends Diary {}

export interface DiaryAddReq {
  title: string
  content: string
}

export interface DiaryEditReq {
  id: string
  title: string
  content: string
}

export interface DiaryDelReq {
  id: string
}

/**
 * blog diary request API type
 */
export interface DiaryApi extends BaseApi {
  retrieveDiaryPageList(req: DiaryPageReq): Promise<ResultPage<DiaryPageResp>>
  add(req: DiaryAddReq): Promise<Result<string>>
  edit(req: DiaryEditReq): Promise<Result<string>>
  delete(req: DiaryDelReq): Promise<Result<string>>
}
