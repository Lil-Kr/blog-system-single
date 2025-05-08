import { baseAxiosRequest } from '@/utils/http/request'
import { Result, ResultPage } from '@/types/base/response'
import { PREFIX_URL_BLOG_DIARY } from '@/config'
import { DiaryAddReq, DiaryApi, DiaryDelReq, DiaryEditReq, DiaryPageReq, DiaryPageResp } from '@/types/apis/blog/diary'

const diaryApi: DiaryApi = {
  retrieveDiaryPageList(req: DiaryPageReq) {
    return baseAxiosRequest.post<ResultPage<DiaryPageResp>>(PREFIX_URL_BLOG_DIARY + '/pageList', req)
  },
  add(req: DiaryAddReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_DIARY + '/add', req)
  },
  edit(req: DiaryEditReq) {
    return baseAxiosRequest.post<Result<string>>(PREFIX_URL_BLOG_DIARY + '/edit', req)
  },
  delete(req: DiaryDelReq) {
    return baseAxiosRequest.delete<Result<string>>(PREFIX_URL_BLOG_DIARY + `/delete/${req.id}`, {})
  }
}

export default diaryApi
