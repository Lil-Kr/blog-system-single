/**
 * login in
 */
export namespace Login {
  export interface LoginFormType {
    username: string
    password: string
  }
  export interface AdminLoginFormType {
    account: string
    password: string
  }
  export interface ResLoginType {
    token: string
  }
}

export interface UserResType {
  data:any
}

export interface AuthType{
  token: string
}

export interface LoginCheckType {
  statue: boolean | string
}