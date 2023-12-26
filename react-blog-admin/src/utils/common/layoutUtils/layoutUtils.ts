import { MenuItemType } from "@/types/common";



/**
 * 获取默认展开列表信息
 * @param items 菜单配置信息
 * @param pathname 当前路由path
 * @returns 返回选中菜单的所有父节点信息
 */
// export const getMenuOpenKeysUtil = (items: MenuItemType[], pathname: string) => {
//   let keyStr: string = ''
//   for (let i = 0; i <= items.length - 1; i++) {
//     // root level
//     const { key, icon, label, children } = items[i]
//     if (key === pathname) {
//       keyStr += keyStr
//     }
//     if (!children || children.length <= 0) {
//       continue
//     }
//     // handle children
//     findChildrenItem(children, key, pathname)
//   }
//   let keys: string[] = keyStr.split('.')
//   // 保留所有父节点
//   if (keys && keys.length >= 2) {
//     keys.pop()
//   }
//   return keys
// }

// /**
//  * 递归查询菜单的key, 并拼接
//  * @param childrens 子菜单信息
//  * @param flage 
//  * @param pathname 
//  */
// function findChildrenItem(childrens: MenuItemType[], flage, pathname: string) {
//   if (!childrens || childrens.length <= 0) {
//     return
//   }
//   for (let i = 0; i < childrens.length; i++) {
//     // 处理当前层级
//     const { key, icon, label, children } = childrens[i]
//     // 添加一个标识, 拼接上一层的key
//     flage = flage + '.' + key
//     // 递归终止条件
//     if (key === pathname) {
//       keyStr += flage
//       return
//     }
//     findChildrenItem(childrens[i].children, flage, pathname)
//   }
// }

/**
 * get default menu openKey by cur router path
 * @param pathname 
 * @returns all selected parent openKey
 */
export const getMenuOpenKeysUtil = (pathname: string) => {
  let newStr: string = ''
  let keys: string[] = []
  let arr = pathname.split('/').map(i => '/' + i)
  // console.log('--> arr:', arr)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i];
    keys.push(newStr);
  }
  // console.log('--> newArr:', newArr)
  return keys
}