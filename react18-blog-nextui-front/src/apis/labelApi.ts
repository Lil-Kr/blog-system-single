import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_BLOG_CATEGORY, PREFIX_URL_BLOG_LABEL } from '@/config'
import { Result } from '@/types/base/response'

export interface LabelApi {
  frontLabelList(): Promise<Result<LabelVO[]>>
  // save(params: CreateLabelReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

export interface LabelVO {
  id: string
  surrogateId: string
  number: string
  name: string
  color: string
  colorText: string
}

const labelApi: LabelApi = {
  frontLabelList() {
    return baseAxiosRequest.get<Result<LabelVO[]>>(PREFIX_URL_BLOG_LABEL + '/frontLabelList')
  }
}

export default labelApi
