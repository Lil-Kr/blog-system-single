import { PREFIX_URL_SYS_DICT } from '@/config'
import {
  DictAddReq,
  DictApi,
  DictDelReq,
  DictDetailAddReq,
  DictDetailDeleteReq,
  DictDetailEditReq,
  DictDetailListReq,
  DictDetailResp,
  DictEditReq,
  DictMapType,
  DictPageListReq,
  DictPageListResp,
  PageDictDetailReq,
  PageDictDetailResp
} from '@/types/apis/sys/dict/dictType'
import { Result, ResultPage } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const dictApi: DictApi = {
  add(req: DictAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_DICT + '/add', req)
  },
  edit(req: DictEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_DICT + '/edit', req)
  },
  delete(req: DictDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_DICT + '/delete', req)
  },
  retrieveDictPageList(req: DictPageListReq) {
    return baseAxiosRequest.post<ResultPage<DictPageListResp>>(PREFIX_URL_SYS_DICT + '/pageList', req)
  },
  dictDetail(req: DictDetailListReq) {
    return baseAxiosRequest.post<Result<DictDetailResp>>(PREFIX_URL_SYS_DICT + '/dictDetailList', req)
  },
  retrievePageDictDetailList(req: PageDictDetailReq) {
    return baseAxiosRequest.post<ResultPage<PageDictDetailResp>>(PREFIX_URL_SYS_DICT + '/pageDictDetailList', req)
  },
  addDictDetail(req: DictDetailAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_DICT + '/addDetail', req)
  },
  editDictDetail(req: DictDetailEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_DICT + '/editDetail', req)
  },
  deleteDictDetail(req: DictDetailDeleteReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_DICT + '/deleteDetail', req)
  },
  dictDetailMapping() {
    return baseAxiosRequest.get<Result<Map<string, DictMapType[]>>>(PREFIX_URL_SYS_DICT + '/dictDetailMapping', {})
  }
}

export { dictApi }
