import { PREFIX_BASE_URL } from '@/config'
import { message } from 'antd'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_PROXY_API,
  baseURL: PREFIX_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeoutErrorMessage: '请求超时',
  // 设置超时时间(10s)
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: AxiosError) => {
    console.log('--> request intercept error:', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('--> response interceptors response:', response)

    const { data, config, headers, request, status, statusText } = response
    console.log('--> response interceptors data:', data)

    // todo: 每次请求成功都重新set token Cookie
    const { code, msg, token, userInfo } = data
    console.log('--> response interceptors token:', token)

    if (status === 200) {
      const { data } = response
      return data
    } else {
      message.error('网络连接异常,请稍后再试!')
      return response
    }
  },
  // 请求 -> 响应失败
  (error: AxiosError) => {
    const { response } = error
    console.log('--> error:', error)
    console.log('--> error.response:', response)
    if (response) {
      // 请求已发出, 但是不在2xx的范围
      // console.log('--> 请求已发出, 但是不在2xx的范围 -> response.code:', response.data.status)
      message.error(`${response.status} ->  ${response.statusText}`)

      // const errorResp = Promise.reject(response.data)
      // console.log('--> errorResp:', errorResp)
      const respData = { code: response.status, msg: response.statusText, data: '' }
      return respData
    } else {
      message.error('网络连接异常, 请稍后再试!')
    }
  }
)

const baseAxiosRequest = {
  get<T>(url: string, params?: object): Promise<T> {
    return axiosInstance.get(url, { params })
  },
  post<T>(url: string, body?: object): Promise<T> {
    return axiosInstance.post(url, body)
  },
  put<T>(url: string, body?: object): Promise<T> {
    return axiosInstance.put(url, body)
  },
  delete<T>(url: string, params?: object): Promise<T> {
    return axiosInstance.delete(url, { params })
  }
}

export { baseAxiosRequest }
