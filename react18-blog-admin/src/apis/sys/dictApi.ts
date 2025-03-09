import { PREFIX_URL_SYS_DICT } from '@/config'
import { DictApi, DictDetailListReq, DictDetailResp } from '@/types/apis/sys/dict/dictType'
import { Result } from '@/types/base/response'
import { baseAxiosRequest } from '@/utils/http/request'

const dictApi: DictApi = {
  dictDetail(req: DictDetailListReq) {
    return baseAxiosRequest.post<Result<DictDetailResp>>(PREFIX_URL_SYS_DICT + '/dictDetail', req)
  }
}

export { dictApi }
