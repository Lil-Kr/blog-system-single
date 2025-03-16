import { AclModuleTreeResp, SysAclDto } from '@/types/apis/sys/acl/aclType'
import { SysOrgResp } from '@/types/apis/sys/org/orgType'
import { RoleAclTreeType } from '@/types/apis/sys/role/roleType'
import { CarryOutOutlined } from '@ant-design/icons'
import { TreeDataNode } from 'antd/lib'
import { DataNode } from 'antd/lib/tree'

/**
 * transform org tree data
 * @param data
 * @returns
 */
export const transformToTreeData = (data: SysOrgResp[]): TreeDataNode[] => {
  return data.map(item => {
    const children = item.orgList ? transformToTreeData(item.orgList) : [] // 递归处理子节点
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
 * 将当前用户对应角色的权限点tree 转换为 antd-tree 组件所需的 treeData 格式
 * @param list
 */
export const transformRoleAclTreeToAntdTree = (aclModules: AclModuleTreeResp[]): RoleAclTreeType[] => {
  return aclModules.map(module => ({
    key: module.surrogateId, // 设定 key
    title: module.name, // 设定 title
    children: [
      // 先处理权限点 (aclDtoList)
      ...module.aclDtoList.map((acl: SysAclDto) => ({
        key: acl.surrogateId,
        title: acl.name,
        checked: acl.checked, // 设置 checked 属性
        hasAcl: acl.hasAcl
      })),
      // 递归处理子模块 (aclModuleDtoList)
      ...transformRoleAclTreeToAntdTree(module.aclModuleDtoList)
    ]
  }))
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
 * 将需要选中的keys 转换为 antd-tree 组件所需的 checkedKeys 格式
 */
export const transformSelectedKeys = (treeList: RoleAclTreeType[]): string[] => {
  if (treeList.length === 0) return []
  const selectedKeys: string[] = []

  const traverse = (treeList: RoleAclTreeType[]) => {
    treeList.forEach(tree => {
      // 如果是叶子节点且选中, 添加到 selectedKeys
      if (tree.checked === true && (!tree.children || tree.children.length === 0)) {
        selectedKeys.push(tree.key as string)
      }
      if (tree.hasAcl === false) {
        tree.disableCheckbox = true
      } else {
        tree.disableCheckbox = false
      }

      // 如果有子节点, 继续递归遍历
      if (tree.children && tree.children.length > 0) {
        traverse(tree.children)
      }
    })
  }

  traverse(treeList)
  return selectedKeys
}
