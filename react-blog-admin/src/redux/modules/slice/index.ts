/**
 * breadcrumbSlice
 */
import {setBreadcrumbMap, breadcrumbReducer} from '@/redux/modules/slice/global/breadcrumb'
export {setBreadcrumbMap, breadcrumbReducer}

/**
 * tabsSlice
 */
import {setTabList, setTab, removeTab, setTabActive, setTabs, tabReducer} from '@/redux/modules/slice/global/tabs'
export {setTabList, setTab, removeTab, setTabActive, setTabs, tabReducer}


/**
 * globalSystemSlice
 */
import {setAssemblySize, setLanguage, globalSystemReducer} from '@/redux/modules/slice/global/globalSystem'
export {setAssemblySize, setLanguage, globalSystemReducer}


/**======================== sys ================= */

/**
 * tokenSlice
 */
import {setAccessToken, clearAccessToken, tokenReducer} from '@/redux/modules/slice/sys/tokenSlice'
export {setAccessToken, clearAccessToken, tokenReducer}