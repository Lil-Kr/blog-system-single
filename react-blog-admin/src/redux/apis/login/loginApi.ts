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

import { Login } from '@/types/sys'

const { VITE_APP_PROXY_API } = import.meta.env

const loginApi = createApi({
  // API 标识, 不能与其他Api或者reducer重复
  reducerPath: 'loginApi',
  baseQuery: axiosBaseQuery({
    baseUrl: VITE_APP_PROXY_API,
    url: '/sys/user'
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
      logout: build.mutation({
        query() {
          return {
            url: '/logout',
            method: 'DELETE'
          }
        }
      }),
    }
  }
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = loginApi
export default loginApi