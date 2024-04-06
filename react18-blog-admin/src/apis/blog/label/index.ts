import { baseAxiosRequest } from '@/utils/http/request'
import { LabelType } from '@/types/entity/blog/labelType'
import { Result, ResultPage } from '@/types/base/response'
import { LabelReqParams, CreateLabelReq, EditLabelReq, DelLabelReq, LabelVO, LabelApi } from '@/types/apis/blog/label'
import { PREFIX_URL_BLOG_LABEL } from '@/config'

const labelApi: LabelApi = {
  getLabelList(params: LabelReqParams) {
    return baseAxiosRequest.post<ResultPage<LabelVO>>(PREFIX_URL_BLOG_LABEL + '/list', { params })
  },
  save(params: CreateLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/save', params)
  },
  edit(params: EditLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/edit', params)
  },
  delete(params: DelLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/delete', params)
  },
  deleteBatch(params: DelLabelReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/deleteBatch', params)
  }
}

export default labelApi
