import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/redux'
import { setAccessToken } from '@/redux/slice/sys/authSlice'
import { message } from 'antd'

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
	// baseURL: import.meta.env.VITE_APP_PROXY_API,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	// 设置超时时间(10s)
	timeout: 10000,
	// 跨域时候允许携带凭证
	withCredentials: true
})

axiosInstance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
    const token = store.getState().auth.token
		console.log('--> request intercept token', token)

		console.log('--> request intercept config', config)
		return config
	},
	(error: any) => {
		console.log('--> request intercept error:', error)
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		console.log('--> response interceptors response:', response)

		const { data, config, headers, request, status, statusText } = response
		console.log('--> response interceptors data:', data)

		const { code, msg, token, userInfo } = data
		console.log('--> response interceptors token:', token)

		if (status === 200) {
			if (code !== 0) {
				message.success(msg)
			}
			return response
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

const axiosBaseQuery = (pathInfo: any) => {
	const { baseUrl, url } = pathInfo
	// console.log('--> pathInfo:', pathInfo)
	// console.log('--> pathInfo.baseUrl:', baseUrl)
	// console.log('--> pathInfo.url:', url)
	return (requestInfo) => {
		const { url: endpoint, method, body, params } = requestInfo
		// console.log('--> requestInfo:', requestInfo)
		// console.log('--> requestInfo.endpoint:', endpoint)
		// console.log('--> requestInfo.method:', method)
		// console.log('--> requestInfo.params:', params)
		// console.log('--> requestInfo.body:', body)
		// return sendRequest(pathInfo, requestInfo)
		const reqUrl = baseUrl + url + endpoint

		switch (method.toLocaleLowerCase()) {
			case 'get':
				// console.log('--> 进入 get 请求')
				return axiosInstance.get(reqUrl, { params })
			case 'post':
				// console.log('--> 进入 post 请求')
				return axiosInstance.post(reqUrl, body)
			case 'put':
				// console.log('--> 进入 put 请求')
				return axiosInstance.put(reqUrl, body)
			case 'delete':
				// console.log('--> 进入 delete 请求')
				return axiosInstance.delete(reqUrl, { params })
			default:
				return axiosInstance.get(reqUrl, { params })
		}
	}
}

export { axiosBaseQuery }
