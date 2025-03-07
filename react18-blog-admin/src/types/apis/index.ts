import { Result } from '../base/response'

export type BaseApi = {
  add?(params: any): Promise<Result<any>>
  edit?(params: any): Promise<Result<any>>
  // get?(params: any): Promise<Result<any>>
  delete?(params: any): Promise<Result<any>>
  deleteBatch?(params: any): Promise<Result<any>>
}
