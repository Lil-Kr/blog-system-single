import { PREFIX_BASE_BACKEND_URL } from '@/config'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getGlobalMessage } from '@/components/message/MessageProvider'
import { useTokenStore } from '@/store/login'
import { ImageUploadReq } from '@/apis/image/imageInfoApi'

const AUTO_LOGOUT_TIME = 2 * 60 * 60 * 1000 // 2 hour

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: PREFIX_BASE_BACKEND_URL,
  headers: {
    Accept: 'application/json'
    // 'Content-Type': 'application/json'
  },
  timeoutErrorMessage: '请求超时',
  // 设置超时时间(10s)
  timeout: 30000,
  // 跨域时候允许携带凭证
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token, lastActiveTime, loginStatue, clearToken } = useTokenStore.getState()
    // if (!loginStatue) {
    //   config.headers = {
    //     ...config.headers,
    //     authorization: token
    //   }
    //   return config
    // }

    // if (Date.now() - lastActiveTime > AUTO_LOGOUT_TIME) {
    //   clearToken()
    //   return Promise.reject(new Error('登录超时, 请重新登录'))
    // }

    //
    // if (!config.headers?.['Content-Type']) {
    //   config.headers = {
    //     ...config.headers,
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }
    // if (config.data instanceof FormData) {
    //   config.headers['Content-Type'] = 'multipart/form-data'
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
        return Error(msg)
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
      // 请求已发出, 但是不在2xx的范围 -> response.code:', response.data.status
      messageApi?.error(`${response.status} ->  ${response.statusText}`)
      const respData = { code: response.status, msg: response.statusText, data: '' }
      return respData
    } else {
      messageApi?.error('网络连接异常, 请稍后再试!')
      return Promise.reject(error)
    }
  }
)

const baseAxiosRequest = {
  get<T>(url: string, params?: object): Promise<T> {
    return axiosInstance.get(url, { params })
  },
  post<T>(url: string, body?: object): Promise<T> {
    return axiosInstance.post(url, body, { headers: { 'Content-Type': 'application/json' } })
  },
  put<T>(url: string, body?: object): Promise<T> {
    return axiosInstance.put(url, body, { headers: { 'Content-Type': 'application/json' } })
  },
  delete<T>(url: string, req?: object): Promise<T> {
    return axiosInstance.delete(url, { params: req })
  },
  postUpload<T>(url: string, body?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post(url, body, { ...config })
  }
}

export { baseAxiosRequest }
