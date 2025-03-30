import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import {
  LabelListReq,
  CreateLabelReq,
  EditLabelReq,
  DelLabelReq,
  LabelTableResq,
  LabelApi,
  LabelPageListReq
} from '@/types/apis/blog/labelType'
import { PREFIX_URL_BLOG_LABEL } from '@/config'

const labelApi: LabelApi = {
  retrieveLabelPageList(req: LabelPageListReq) {
    return baseAxiosRequest.post<ResultPage<LabelTableResq>>(PREFIX_URL_BLOG_LABEL + '/pageList', req)
  },
  retrieveLabelList(req: LabelListReq) {
    return baseAxiosRequest.post<ResultPage<LabelTableResq>>(PREFIX_URL_BLOG_LABEL + '/list', req)
  },
  add(req: CreateLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/add', req)
  },
  edit(req: EditLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/edit', req)
  },
  delete(req: DelLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/delete', req)
  },
  deleteBatch(req: DelLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/deleteBatch', req)
  }
}

export default labelApi
