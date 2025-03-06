import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_SYS_ORG } from '@/config'
import {
  SysOrgAllResp,
  SysOrgApi,
  SysOrgEditReq,
  SysOrgListAllReq,
  SysOrgReq,
  SysOrgResp,
  SysOrgSaveReq
} from '@/types/apis/sys/org/org'
import { Result, ResultPage } from '@/types/base/response'

const sysOrgApi: SysOrgApi = {
  retrieveOrgList() {
    return baseAxiosRequest.post<Result<SysOrgResp[]>>(PREFIX_URL_SYS_ORG + '/orgTreeList', {})
  },
  pageChildOrgList(req: SysOrgReq) {
    return baseAxiosRequest.post<ResultPage<SysOrgResp>>(PREFIX_URL_SYS_ORG + '/pageChildOrgList', req)
  },
  pageOrgList(req: SysOrgReq) {
    return baseAxiosRequest.post<ResultPage<SysOrgResp>>(PREFIX_URL_SYS_ORG + '/pageOrgList', req)
  },
  orgAllList(req: SysOrgListAllReq) {
    return baseAxiosRequest.post<Result<SysOrgAllResp[]>>(PREFIX_URL_SYS_ORG + '/list', req)
  },
  save(params: SysOrgSaveReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ORG + '/add', params)
  },
  edit(params: SysOrgEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_SYS_ORG + '/edit', params)
  },
  // delete(params: DelCategoryReq) {
  //   return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_CATEGORY + '/delete', params)
  // }
}

export default sysOrgApi
