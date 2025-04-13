import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_SYS_ORG } from '@/config'
import {
  SysOrgListResp,
  SysOrgApi,
  SysOrgDelReq,
  SysOrgEditReq,
  SysOrgListAllReq,
  SysOrgReq,
  SysOrgResp,
  SysOrgSaveReq
} from '@/types/apis/sys/org/orgType'
import { Result, ResultPage } from '@/types/base/response'

const orgApi: SysOrgApi = {
  retrieveOrgTreeList() {
    return baseAxiosRequest.post<Result<SysOrgResp[]>>(PREFIX_URL_SYS_ORG + '/orgTreeList', {})
  },
  pageOrgList(req: SysOrgReq) {
    return baseAxiosRequest.post<ResultPage<SysOrgResp>>(PREFIX_URL_SYS_ORG + '/pageList', req)
  },
  orgAllList(req: SysOrgListAllReq) {
    return baseAxiosRequest.post<Result<SysOrgListResp[]>>(PREFIX_URL_SYS_ORG + '/list', req)
  },
  add(req: SysOrgSaveReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ORG + '/add', req)
  },
  edit(req: SysOrgEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ORG + '/edit', req)
  },
  delete(req: SysOrgDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_SYS_ORG + '/delete', req)
  }
}

export default orgApi
