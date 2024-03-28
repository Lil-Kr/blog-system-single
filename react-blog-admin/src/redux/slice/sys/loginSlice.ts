import { LoginCheckType } from "@/types/sys"
import { CLT } from "@/utils/constant/constant"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// cookie
import cookie from 'react-cookies'

const loginState: LoginCheckType = {
  statue: false
}

const loginSlice = createSlice({
  name: 'login',
  initialState: loginState,
  reducers: {
    setLoginStatue: (state, {payload}: PayloadAction<{ [propName: string]: any }>) => {
      const { statue } = payload
      state.statue = statue

      const expirationDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      cookie.save(CLT, statue, {path:'/', expires: expirationDate})
    },
    clearLoginStatue: (state, {payload}: PayloadAction<{ [propName: string]: any }>) => {
      state. statue = ''
      cookie.remove(CLT, {})
    }
  }
})

export const { setLoginStatue } = loginSlice.actions
export const { reducer: loginReducer } = loginSlice