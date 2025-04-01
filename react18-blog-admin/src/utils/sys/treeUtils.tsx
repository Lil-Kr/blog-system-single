import { OptionType } from '@/types/apis'
import { AclModuleTreeResp, SysAclDto } from '@/types/apis/sys/acl/aclType'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { MenuTreeType } from '@/types/apis/sys/menu/permissionType'
import { SysOrgResp } from '@/types/apis/sys/org/orgType'
import { RoleAclTreeType } from '@/types/apis/sys/role/roleType'
import { CarryOutOutlined } from '@ant-design/icons'
import { TreeDataNode } from 'antd/lib'
import { RouterItemType } from '@/types/router/routeType'
import { componentMap, iconMap } from '@/router/config/configMappings'
import LazyLoad from '@/components/router/LazyLoad'

/**
 * transform org tree data
 * @param data
 * @returns
 */
export const transformOrgListToTreeData = (data: SysOrgResp[]): TreeDataNode[] => {
  return data.map(item => {
    const children = item.orgList ? transformOrgListToTreeData(item.orgList) : [] // 递归处理子节点
    return {
      key: item.surrogateId, // 使用 surrogateId 作为 key
      title: item.name, // 使用 name 作为 title
      icon: <CarryOutOutlined />, // 使用 CarryOutOutlined 作为图标
      children: children.length > 0 ? children : undefined // 如果没有子节点则不包含 children 属性
    }
  })
}

/**
 * 获取所有的组织id, 作为默认展开所有组织节点
 * @param data
 * @returns
 */
export const transformOrgTreeExpandeKeys = (data: SysOrgResp[]): string[] => {
  let surrogateIds: string[] = []
  data.forEach(item => {
    surrogateIds.push(item.surrogateId) // 获取当前节点的 surrogateId
    if (item.orgList && item.orgList.length) {
      surrogateIds = [...surrogateIds, ...transformOrgTreeExpandeKeys(item.orgList)] // 递归获取子节点的 surrogateId
    }
  })
  return surrogateIds
}

/**
 * 权限模块 转换为 antd Tree 组件数据结构
 * @param data
 * @returns
 */
export const transformToAclModuleTreeData = (data: AclModuleTreeResp[]): TreeDataNode[] => {
  return data.map(item => {
    const children = item.aclModuleDtoList ? transformToAclModuleTreeData(item.aclModuleDtoList) : [] // 递归处理子节点
    return {
      key: item.surrogateId, // 使用 surrogateId 作为 key
      title: item.name, // 使用 name 作为 title
      icon: <CarryOutOutlined />, // 使用 CarryOutOutlined 作为图标
      children: children.length > 0 ? children : undefined // 如果没有子节点则不包含 children 属性
    }
  })
}

/**
 * 收集所有的权限模块id, 作为默认展开所有节点用
 */
export const transformAclModuleTreeExpandeKeys = (data: AclModuleTreeResp[]): string[] => {
  let surrogateIds: string[] = []
  data.forEach(item => {
    surrogateIds.push(item.surrogateId) // 获取当前节点的 surrogateId
    if (item.aclModuleDtoList && item.aclModuleDtoList.length) {
      surrogateIds = [...surrogateIds, ...transformAclModuleTreeExpandeKeys(item.aclModuleDtoList)] // 递归获取子节点的 surrogateId
    }
  })
  return surrogateIds
}

/**
 *
 * @param aclModules
 * @returns
 */
interface EnhancedTreeType {
  key: string
  title: string
  children?: EnhancedTreeType[]
  checked?: boolean
  hasAcl?: boolean
  disabled?: boolean
  indeterminate?: boolean
}

/**
 * 将AclModuleTreeResp[]转换为EnhancedTreeType[]
 */
const convertAclModuleToEnhancedTree = (aclModules: AclModuleTreeResp[]): EnhancedTreeType[] => {
  return aclModules.map(module => ({
    key: module.surrogateId,
    title: module.name,
    checked: false, // 模块默认不选中
    hasAcl: true, // 模块默认有权限
    children: [
      // 处理权限点
      ...module.aclDtoList.map(acl => ({
        key: acl.surrogateId,
        title: acl.name,
        checked: acl.checked,
        hasAcl: acl.hasAcl
      })),
      // 递归处理子模块
      ...convertAclModuleToEnhancedTree(module.aclModuleDtoList)
    ]
  }))
}

/**
 * 增强版树形数据处理（直接接受AclModuleTreeResp[]）
 */
export const processAclModuleTreeData = (
  roleAclTreeData: AclModuleTreeResp[]
): {
  checkedKeys: string[]
  processedTree: EnhancedTreeType[]
} => {
  // 先转换为EnhancedTreeType格式
  const enhancedTree = convertAclModuleToEnhancedTree(roleAclTreeData)

  const checkedKeys: string[] = []
  const processedTree: EnhancedTreeType[] = JSON.parse(JSON.stringify(enhancedTree))

  const traverse = (
    nodes: EnhancedTreeType[]
  ): {
    allDisabled: boolean
    someChecked: boolean
    allChecked: boolean
  } => {
    let allDisabled = true
    let someChecked = false
    let allChecked = true

    nodes.forEach(node => {
      // 初始化节点状态
      node.disabled = node.hasAcl === false
      node.indeterminate = false

      // 处理子节点
      if (node.children && node.children.length > 0) {
        const childrenStatus = traverse(node.children)

        // 更新当前节点状态
        if (childrenStatus.someChecked) someChecked = true
        if (!childrenStatus.allChecked) allChecked = false
        if (!childrenStatus.allDisabled) allDisabled = false

        // 设置父节点的indeterminate状态
        if (childrenStatus.someChecked || node.checked) {
          node.indeterminate = !allChecked
        }
      }

      // 如果是叶子节点且选中
      if (node.checked && (!node.children || node.children.length === 0)) {
        checkedKeys.push(node.key)
        someChecked = true
      }

      // 如果所有子节点都被禁用，当前节点也应被禁用
      if (node.children && node.children.every(child => child.disabled)) {
        node.disabled = true
      }
    })

    return { allDisabled, someChecked, allChecked }
  }

  traverse(processedTree)

  return {
    checkedKeys,
    processedTree
  }
}

/**
 * 菜单转换
 */
const transformMenuTree = (menu: MenuTreeType[]): RouterItemType[] => {
  if (menu.length < 1) {
    return []
  }

  const res: RouterItemType[] = menu.map(({ key, title, path, uniqueSign, children }) => {
    const meta = {
      key: key,
      title: title,
      layout: false,
      icon: iconMap[uniqueSign as keyof typeof iconMap] || null
    }

    const element = componentMap[uniqueSign as keyof typeof componentMap]
      ? LazyLoad(componentMap[uniqueSign as keyof typeof componentMap])
      : undefined
    return {
      meta,
      path: path,
      element,
      children: children.length > 0 ? transformMenuTree(children) : []
    } as RouterItemType
  })

  return res
}

export { transformMenuTree }
