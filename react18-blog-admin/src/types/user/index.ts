/**
 * login in
 */
export namespace LoginTpye {
  export interface LoginFormType {
    account: string
    password: string
  }
  export interface LoginRespType {
    token: string
  }
}
