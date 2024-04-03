export interface Result<T = any>{
  code: number | string
  msg: string
  data: T
}

export interface ResultPage<T = any> {
  code: number | string
  msg: string
  data: T
}
