/**
* @Description: response data structure
* @Author: Cy
* @Date: 2022-10-27
* @LastEditTime: 2022-10-27
*/
import { AxiosResponse } from "axios"

export interface ApiResp<T> {
  code: number
  msg: string
  data: T[] | T
}

export interface BaseResp {
  
}

export interface BaseRespDataType {
  code: number | string,
  msg: string,
  token: string,
  data?: any
}

export interface Response {
  code: number | string
  msg: string
  data: any | any[]
}

export interface ResponseType extends AxiosResponse {
  code: number | string
  msg: string
  data: any
}

