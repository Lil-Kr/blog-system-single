/*
 *@Description: Description
 *@ModifyContent: ModifyContent
 *@Author: Lil-K
 *@Date: 2022-12-04 09:27:47
 *@LastEditTime: 2022-12-04 09:27:47
 *@Author: Lil-K
*/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { axiosBaseQuery } from '@/utils/http/axios'
import { LabelType } from '@/types/blog'

const { VITE_APP_PROXY_API } = import.meta.env

const blogLabelApi = createApi({
  // API 标识, 不能与其他Api或者reducer重复
  reducerPath: 'blogLabelApi',
  baseQuery: axiosBaseQuery({
    baseUrl: VITE_APP_PROXY_API,
    url: '/blog/label'
  }),
  endpoints(build) {
    return {
      labels: build.query({
        query(queryParam: LabelType.LabelQueryType) {
          // console.log('--> labels queryParam: ', queryParam)
          return {
            url: '/list',
            method: 'POST',
            body: queryParam
          }
        }
      })
    }
  }
})

export const { useLabelsQuery } = blogLabelApi
export default blogLabelApi