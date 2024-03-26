/**
 * 配置 persist, 持久化存储
 */
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer, createTransform } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { breadcrumbReducer } from "@/redux/slice/global/breadcrumb"
import { tabReducer } from "@/redux/slice/global/tabs"
import { globalSystemReducer, authReducer } from "@/redux/slice"
// API
import loginApi from '@/redux/apis/login/loginApi'

/**
 * transform
 * can be encrypt and other operation....
 */
const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    // return { ...inboundState, mySet: [...inboundState.mySet] };
    console.log('--> before transform state: ', key)
  },
  // transform state being rehydrated
  (outboundState, key) => {
    console.log('--> transform state: ', key)
    // convert mySet back to a Set.
    // return { ...outboundState, mySet: new Set(outboundState.mySet) };
  },
  // define which reducers this transform gets called for.
  { 
    whitelist: [''] 
  }
)

/**
 * root config
 */
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

const authPersistConfig = {
  key: 'auth',
  storage: storage
}

/**
 * root reducer
 */
const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  tab: tabReducer,
  globalSystem: globalSystemReducer,
  auth: authReducer,
  [loginApi.reducerPath]: loginApi.reducer
})

const rootPersistReducer = persistReducer(rootPersistConfig, rootReducer)

export default rootPersistReducer