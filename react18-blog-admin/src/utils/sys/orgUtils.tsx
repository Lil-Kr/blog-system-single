import { SysOrgResp } from '@/types/apis/sys/org/orgType'
import { CarryOutOutlined } from '@ant-design/icons'
import { TreeDataNode } from 'antd/lib'

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
