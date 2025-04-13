import React, { useCallback, useEffect, useState } from 'react'
import { Tree, Button, Flex, TreeProps } from 'antd/lib'
import { useRoleAclStore } from '@/store/sys/roleStore'
import roleApi from '@/apis/sys/roleApi'
import { AclModuleTreeResp } from '@/types/apis/sys/acl/aclType'
import { transformAclModuleTreeExpandeKeys, processAclModuleTreeData } from '@/utils/sys/treeUtils'
import { UpdateRoleAclsReq } from '@/types/apis/sys/role/roleType'
import { useMessage } from '@/components/message/MessageProvider'
import { UpdateRoleAclsBtnAcl } from './auth/authButton'

const RoleAcl = ({ roleId }: { roleId: string }) => {
  const messageApi = useMessage()
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  // role-acl store
  const { roleAclsTree, setRoleAclsTree, checkedAclsKeys, setCheckedAclsKeys } = useRoleAclStore()

  useEffect(() => {
    if (roleId) {
      initRoleAclTree()
    }
  }, [roleId])

  /**
   * 当roleId 变化时, 重新获取当前角色对应的权限点
   */
  const initRoleAclTree = useCallback(async () => {
    const roleAclTreeData = await roleAclTree()
    // 设置角色权限点树结构
    const { checkedKeys, processedTree } = processAclModuleTreeData(roleAclTreeData)
    setRoleAclsTree(processedTree)

    // 默认展开所有节点
    const allExpandedKeys = transformAclModuleTreeExpandeKeys(roleAclTreeData)
    setExpandedKeys(allExpandedKeys)

    // 设置哪些权限点需要被默认打勾
    setCheckedAclsKeys(checkedKeys)
  }, [roleId])

  /**
   * 获取当前用户对应角色所拥有的权限点tree
   * @returns
   */
  const roleAclTree = async (): Promise<AclModuleTreeResp[]> => {
    if (!roleId) {
      return []
    }
    const res = await roleApi.roleAclTree({ roleId: roleId })
    return res.code === 200 ? res.data : ([] as AclModuleTreeResp[])
  }

  /**
   * 展开/收起树时触发
   * @param expandedKeysValue
   */
  const onExpand: TreeProps['onExpand'] = expandedKeysValue => {
    setExpandedKeys(expandedKeysValue)
  }

  /**
   * 返回选中节点的key
   * @param checkedKeysValue
   */
  const onCheck: TreeProps['onCheck'] = checkedKeysValue => {
    setCheckedAclsKeys(checkedKeysValue as React.Key[])
  }

  /**
   * 更新角色-权限点关系
   */
  const updateRoleAcls = async () => {
    const updateRoleAclsReq: UpdateRoleAclsReq = {
      roleId: roleId,
      aclIdList: checkedAclsKeys as string[]
    }

    const res = await roleApi.updateRoleAcls({ ...updateRoleAclsReq })
    const { code, msg } = res
    if (code >= 500) {
      return
    }
    messageApi.success(msg)
    await initRoleAclTree()
  }

  return (
    <div className='role-acl'>
      <Flex vertical={true} gap={10}>
        <Tree
          key={'user-role-acl'}
          showIcon={false}
          checkable={true}
          blockNode={true}
          height={800}
          onExpand={onExpand} // 展开树时触发
          expandedKeys={expandedKeys}
          autoExpandParent={true} // 控制是否严格每层依次展开
          onCheck={onCheck} // 勾选时触发
          treeData={roleAclsTree} // 当前用户对应角色所拥有的权限点
          checkedKeys={checkedAclsKeys}
          // onSelect={onSelect} // 点击时触发
          // selectedKeys={selectedKeys}
        />
        <Flex justify={'flex-start'} align={'center'} gap={'middle'}>
          <UpdateRoleAclsBtnAcl text='更新权限' onClick={updateRoleAcls} />
        </Flex>
      </Flex>
    </div>
  )
}

export default RoleAcl
