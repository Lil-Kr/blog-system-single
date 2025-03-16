import { PREFIX_BASE_URL } from '@/config'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { getGlobalMessage } from '@/components/message/MessageProvider'

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
  timeout: 30000,
  // 跨域时候允许携带凭证
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: AxiosError) => {
    const messageApi = getGlobalMessage()
    messageApi?.error(error.message)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config, headers, request, status, statusText } = response
    const messageApi = getGlobalMessage()
    if (status === 200) {
      const { data } = response
      // todo: 每次请求成功都重新 set token cookie
      const { code, msg } = data

      if (code >= 500) {
        messageApi?.error(msg)
        return response
      } else if (code >= 400 && code < 500) {
        messageApi?.warning(msg)
        return response
      } else {
        return data
      }
    } else {
      messageApi?.error('网络异常')
      return response
    }
  },
  // 请求 -> 响应失败
  (error: AxiosError) => {
    const { response } = error
    const messageApi = getGlobalMessage()
    if (response) {
      // 请求已发出, 但是不在2xx的范围
      // 请求已发出, 但是不在2xx的范围 -> response.code:', response.data.status
      // const errorResp = Promise.reject(response.data)
      messageApi?.error(`${response.status} ->  ${response.statusText}`)

      const respData = { code: response.status, msg: response.statusText, data: '' }
      return respData
    } else {
      messageApi?.error('网络连接异常, 请稍后再试!')
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
  postUpload<T>(url: string, body?: object, config?: object | {}): Promise<T> {
    return axiosInstance.post(url, body, config)
  },
  put<T>(url: string, body?: object): Promise<T> {
    return axiosInstance.put(url, body)
  },
  delete<T>(url: string, params?: object): Promise<T> {
    return axiosInstance.delete(url, { params })
  }
}

export { baseAxiosRequest }
