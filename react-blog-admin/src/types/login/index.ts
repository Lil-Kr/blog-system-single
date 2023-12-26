/**
 * login in
 */
export namespace Login {
  export interface LoginFormType {
    username: string
    password: string
  }
  export interface AdminLoginFormType {
    login_account: string
    password: string
  }
  export interface ResLoginType {
    token: string
  }
}


export interface UserResType {
  data:any

}