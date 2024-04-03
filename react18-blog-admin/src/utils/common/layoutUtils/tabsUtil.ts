/**
 * Tabs util
 */

import { HOME_ROUTER_URL } from '@/config'
import { BreadcrumbType } from '@/types/common/breadcrumbType'
import { TabType } from '@/types/common/tabType'

/**
 * 将 面包屑 转换为 ant tab 需要的结构
 * k => ['','','',]
 * k => [{}, {}, {}]
 * @param breadcrumbMap
 * @returns
 */
const getTabsMap = (breadcrumbMap: Map<string, BreadcrumbType[]>): Map<string, TabType> => {
  let tabs: Map<string, TabType> = new Map()
  breadcrumbMap.forEach((value, key, arr) => {

    tabs.set(key, { key, path: key, label: value.pop()!.title, closable: HOME_ROUTER_URL === key ? false : true })
  })
  return tabs
}

/**
 * ====================== oh-router ======================
 */
// const getTabsMap2 = (breadcrumbMap: Map<string, string[]>): Map<string, TabType> => {
//   let tabs: Map<string, TabType> = new Map()
//   breadcrumbMap.forEach((value, key, arr) => {
//     tabs.set(key,{ key, path:key, label:value.pop(), closable:(HOME_ROUTER_URL === key) ? false : true })
//   })
//   return tabs
// }

export { getTabsMap }
