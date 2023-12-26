/**
* @Description: response data structure
* @Author: Cy
* @Date: 2022-10-27
* @LastEditTime: 2022-10-27
*/
import { AxiosResponse } from "axios";

export interface BaseRespDataType {
  code: number | string,
  msg: string,
  token: string,
  data?: any
}

export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

export interface ResponseType extends AxiosResponse {
  code: number | string
  data: any
  msg: string
}