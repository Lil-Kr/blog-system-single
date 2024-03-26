import { AuthType } from "@/types/sys"
import { USER_TOKEN_KEY } from "@/utils/constant/constant"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// cookie
import cookie from 'react-cookies'


const authState: AuthType = {
  token: '',
  isLogin: false
}

const authSlice = createSlice({
  name: 'token',
  initialState: authState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const {token, isLogin} = payload
      state.token = token
      state.isLogin = isLogin

      const expirationDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      cookie.save(USER_TOKEN_KEY, token, {path:'/', expires: expirationDate})
    },
    clearAccessToken(state) {
      state.token = ''
      state.isLogin = false
      cookie.remove(USER_TOKEN_KEY, {})
    }
  }
})

export const { setAccessToken, clearAccessToken } = authSlice.actions
export const { reducer: authReducer } = authSlice