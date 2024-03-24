/**
 * 配置 persist, 持久化存储
 */
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { breadcrumbReducer } from "@/redux/modules/slice/global/breadcrumb"
import { tabReducer } from "@/redux/modules/slice/global/tabs"
import { globalSystemReducer, tokenReducer } from "@/redux/modules/slice"

// API config
import loginApi from '@/redux/apis/login/loginApi'

const rootPersistConfig = {
  /**
   * 储存的标识名
   */
  key: 'root',
  /**
   * 储存方式
   */
  storage: storage,
  /**
   * 指定需要持久化的 reducer 的 key
   */
  whitelist: ['breadcrumb', 'tab', 'globalSystem']
}

/**
 * root reducer
 */
const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  tab: tabReducer,
  globalSystem: globalSystemReducer,
  token: tokenReducer,
  [loginApi.reducerPath]: loginApi.reducer
})

const rootPersistReducer = persistReducer(rootPersistConfig, rootReducer)

export default rootPersistReducer