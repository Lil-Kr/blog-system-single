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

import { Login } from '@/types/login'

const { VITE_APP_PROXY_API } = import.meta.env

const loginApi = createApi({
  // API 标识, 不能与其他Api或者reducer重复
  reducerPath: 'loginApi',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: VITE_APP_PROXY_API + '/sys'
  // }),
  baseQuery: axiosBaseQuery({
    baseUrl: VITE_APP_PROXY_API,
    url: '/admin'
  }),
  endpoints(build) {
    return {
      login: build.mutation({
        query(loginInfo: Login.AdminLoginFormType) {
          return {
            url: '/login',
            method: 'PUT',
            body: loginInfo
          }
        }
      }),
      register: build.mutation({
        query(registerInfo) {
          return {
            url: '/register',
            method: 'POST',
            body: registerInfo
          }
        }
      }),
    }
  }
})

export const { useLoginMutation, useRegisterMutation } = loginApi
export default loginApi