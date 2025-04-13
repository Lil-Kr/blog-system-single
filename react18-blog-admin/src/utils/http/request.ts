import { PREFIX_BASE_BACKEND_URL } from '@/config'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { getGlobalMessage } from '@/components/message/MessageProvider'
import { useTokenStore } from '@/store/login'

const AUTO_LOGOUT_TIME = 2 * 60 * 60 * 1000 // 2 hour

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: PREFIX_BASE_BACKEND_URL,
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
    const { token, lastActiveTime, loginStatue, clearToken } = useTokenStore.getState()
    // if (!loginStatue) {
    //   config.headers['authorization'] = token
    //   return config
    // }

    // if (Date.now() - lastActiveTime > AUTO_LOGOUT_TIME) {
    //   clearToken()
    //   return Promise.reject(new Error('登录超时, 请重新登录'))
    // }

    config.headers['authorization'] = token
    return config
  },
  (error: AxiosError) => {
    const messageApi = getGlobalMessage()
    messageApi?.error(error.message)
    return Promise.reject(error)
  }
)

/**
 * 统一拦截: response
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config, headers, request, status, statusText } = response
    const messageApi = getGlobalMessage()
    const { resetToken } = useTokenStore.getState()
    if (status === 200) {
      resetToken()
      const { data } = response
      const { code, msg } = data

      if (code >= 500) {
        messageApi?.error(msg)
        throw Error(msg)
      } else if (code >= 400 && code < 500) {
        messageApi?.warning(msg)
        throw Error(msg)
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
  put<T>(url: string, body?: object): Promise<T> {
    return axiosInstance.put(url, body)
  },
  delete<T>(url: string, params?: object): Promise<T> {
    return axiosInstance.delete(url, { params })
  },
  postUpload<T>(url: string, body?: object, config?: object | {}): Promise<T> {
    return axiosInstance.post(url, body, config)
  }
}

export { baseAxiosRequest }
