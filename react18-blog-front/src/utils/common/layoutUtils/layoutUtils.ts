import { MenuItemType } from '@/types/common'

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
    newStr += arr[i]
    keys.push(newStr)
  }
  // console.log('--> newArr:', newArr)
  return keys
}
