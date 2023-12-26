/**
 * createSlice: create reducer`s slice
 */
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { persistStore } from 'redux-persist'
import rootPersistReducer from '@/redux/modules/persist'

// API config
import loginApi from '@/redux/apis/login/loginApi'

const store = configureStore({
  reducer: rootPersistReducer,
  /**
   * 让缓存生效
   * @param curryGetDefaultMiddleware
   * @returns 
   */
  middleware: curryGetDefaultMiddleware => curryGetDefaultMiddleware({ serializableCheck: false }).concat(loginApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
  // devTools: true
})

setupListeners(store.dispatch)

export default store

/**
 * create persist store
 */
export const persistor = persistStore(store)

export const state = store.getState()

// 利用 typeof 推断出 dispatch 的类型
export type AppDispatch = typeof store.dispatch

// Redux 应用的状态
export type RootState = ReturnType<typeof store.getState>

// 以下两行，都是为了让 TypeScript 能够推断出状态的类型; 往后, 我们会在整个应用中重复使用这两个成员
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
