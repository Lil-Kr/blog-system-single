import { baseAxiosRequest } from '@/utils/http/request'
import { PREFIX_URL_BLOG_CATEGORY } from '@/config'
import { Result } from '@/types/base/response'

export interface CategoryApi {
  frontCategoryCountList(): Promise<Result<CategoryVO[]>>
  // save(params: CreateLabelReq): Promise<Result<string>>
  // edit(params: EditLabelReq): Promise<Result<string>>
  // delete(params: DelLabelReq): Promise<Result<string>>
  // deleteBatch(params: DelLabelReq): Promise<Result<string>>
}

export interface CategoryVO {
  categoryId: string
  categoryName: string
  categoryCount: number
}

const categoryApi: CategoryApi = {
  frontCategoryCountList() {
    return baseAxiosRequest.get<Result<CategoryVO[]>>(PREFIX_URL_BLOG_CATEGORY + '/frontCategoryCountList')
  }
}

export default categoryApi
