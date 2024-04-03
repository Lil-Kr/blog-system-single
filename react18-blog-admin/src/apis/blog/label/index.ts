import { baseAxiosRequest } from '@/utils/http/request'
import { LabelType } from '@/types/blog/labelType'
import { Result } from '@/types/base/response'
import { LabelReqParams, CreateLabel, EditLabel, DelLabel } from '@/types/apis/blog'
import { PREFIX_URL_BLOG_LABEL } from '@/constant'

export default {
  getLabelList(params: LabelReqParams) {
    return baseAxiosRequest.post<Result<LabelType[]>>(PREFIX_URL_BLOG_LABEL + '/list', { params })
  },
  save(params: CreateLabel) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/save', params)
  },
  edit(params: EditLabel) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/edit', params)
  },
  delete(params: DelLabel) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/delete', params)
  },
  deleteBatch(params: DelLabel) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_LABEL + '/deleteBatch', params)
  }
}
