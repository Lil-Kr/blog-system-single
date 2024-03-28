/**
 * breadcrumbSlice
 */
import {setBreadcrumbMap, breadcrumbReducer} from '@/redux/slice/global/breadcrumb'
export {setBreadcrumbMap, breadcrumbReducer}

/**
 * tabsSlice
 */
import {setTabList, setTab, removeTab, setTabActive, setTabs, tabReducer} from '@/redux/slice/global/tabs'
export {setTabList, setTab, removeTab, setTabActive, setTabs, tabReducer}


/**
 * globalSystemSlice
 */
import {setAssemblySize, setLanguage, globalSystemReducer} from '@/redux/slice/global/globalSystem'
export {setAssemblySize, setLanguage, globalSystemReducer}


/**======================== sys ================= */

/**
 * authSlice
 */
import {setAccessToken, clearAccessToken, authReducer} from '@/redux/slice/sys/authSlice'
export {setAccessToken, clearAccessToken, authReducer}


/**
 * loginSlice
 */
import { setLoginStatue, loginReducer } from '@/redux/slice/sys/loginSlice'
export { setLoginStatue, loginReducer } 