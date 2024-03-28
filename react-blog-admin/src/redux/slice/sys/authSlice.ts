import { AuthType } from "@/types/sys"
import { CLT } from "@/utils/constant/constant"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// cookie
import cookie from 'react-cookies'

const authState: AuthType = {
  token: ''
}

const authSlice = createSlice({
  name: 'token',
  initialState: authState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<{ [propName: string]: any }>) {
      const {token} = payload
      state.token = token
      
      const expirationDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      cookie.save(CLT, token, {path:'/', expires: expirationDate})
    },
    clearAccessToken(state, { payload }: PayloadAction<{ [propName: string]: any }>) {
      cookie.remove(CLT, {path: '/'})
    }
  }
})

export const { setAccessToken, clearAccessToken } = authSlice.actions
export const { reducer: authReducer } = authSlice