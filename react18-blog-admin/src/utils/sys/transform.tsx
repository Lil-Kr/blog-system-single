import { OptionType } from '@/types/apis'
import { AclPageListResp, AclTableListType } from '@/types/apis/sys/acl/aclType'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { OrgTableType, SysOrgListResp } from '@/types/apis/sys/org/orgType'
import { RoleTableType, SysRoleTableType } from '@/types/apis/sys/role/roleType'
import { UserPageListByOrgIdResp, UserTableType } from '@/types/apis/sys/user/userType'

/** =================== 组织信息-转换 =================== **/
/**
 * 将组织信息转换为下拉选择器选项
 * @param orgList
 * @returns
 */
const transformOrgListToSeletor = (orgList: SysOrgListResp[]): OptionType[] => {
  if (!orgList || orgList.length < 1) {
    return []
  }
  return orgList.map(({ surrogateId, name }) => ({
    value: surrogateId,
    label: name
  }))
}

const transformOrgListToTable = (orgList: SysOrgListResp[]): OrgTableType[] => {
  return orgList.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    ...rest
  }))
}

export { transformOrgListToSeletor, transformOrgListToTable }

/** =================== userList-后台用户信息-转换 =================== **/
const transformUserListToTable = (userList: UserPageListByOrgIdResp[]): UserTableType[] => {
  if (!userList || userList.length < 1) {
    return []
  }
  return userList.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    ...rest
  }))
}
export { transformUserListToTable }

/** =================== 角色信息-转换 =================== **/
/**
 * 转换角色信息列表, 用于角色列表展示
 * @param list
 * @returns
 */
const transformRoleListToTable = (list: SysRoleTableType[]): RoleTableType[] => {
  if (!list || list.length < 1) {
    return []
  }
  const mappingList = list.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    surrogateId,
    ...rest
  }))
  return mappingList
}
export { transformRoleListToTable }

/** =================== 权限列表-转换 =================== **/
/**
 * 转换角色信息列表, 用于角色列表展示
 * @param list
 * @returns
 */
const transformAclListToTable = (list: AclPageListResp[]): AclTableListType[] => {
  if (!list || list.length < 1) {
    return []
  }
  return list.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    surrogateId,
    ...rest
  }))
}
export { transformAclListToTable }

/** =================== 字典相关-转换 =================== **/
/**
 * 字典数据列表 -> 下拉选择器选项
 * @param statusDict
 * @returns
 */
const transformDictTypeToSeletor = (statusDict: DictMapType[]): OptionType[] => {
  const res: OptionType[] = statusDict.map(({ surrogateId, type, name }) => ({
    id: surrogateId,
    value: type.toString() ?? '',
    label: name,
    type: type.toString() ?? ''
  }))
  return res
}

/**
 * 字典数据列表 -> 下拉选择器选项, 附带type字段
 * @param statusDict
 * @returns
 */
const transformTypeToSeletorById = (statusDict: DictMapType[]): OptionType[] => {
  const res: OptionType[] = statusDict.map(({ surrogateId, name, type }) => ({
    id: surrogateId,
    value: surrogateId,
    label: name,
    type: type.toString()
  }))
  return res
}

export { transformDictTypeToSeletor, transformTypeToSeletorById }
