import { USER_TOKEN_KEY } from "@/utils/constant/constant"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// cookie
import cookie from 'react-cookies'


const tokenState = {
  token: ''
}

const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenState,
  reducers: {
    setAccessToken(state, { payload: token }: PayloadAction<string>) {
      state.token = token
      cookie.save(USER_TOKEN_KEY, token)
    },
    clearAccessToken(state) {
      cookie.remove(USER_TOKEN_KEY, {})
    }

  }
})

export const { setAccessToken, clearAccessToken } = tokenSlice.actions
export const { reducer: tokenReducer } = tokenSlice