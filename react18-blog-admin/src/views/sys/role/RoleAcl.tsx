import React, { useCallback, useEffect, useState } from 'react'
import { Tree, Button, Flex, TreeDataNode, TreeProps } from 'antd/lib'
// import type { TreeDataNode, TreeProps } from 'antd'
import { useRoleAclStore } from '@/store/sys/roleStore'
import roleApi from '@/apis/sys/roleApi'
import { AclModuleTreeResp } from '@/types/apis/sys/acl/aclType'
import { transformRoleAclTreeToAntdTree, transformSelectedKeys } from '@/utils/sys/treeUtils'
import { UpdateRoleAclsReq } from '@/types/apis/sys/role/roleType'
import { message } from 'antd'

const RoleAcl = ({ roleId }: { roleId: string }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  // role-acl store
  const { roleAclsTree, setRoleAclsTree, checkedAclsKeys, setCheckedAclsKeys } = useRoleAclStore()

  const treeData: TreeDataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true
            },
            {
              title: 'leaf',
              key: '0-0-0-1'
            }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }]
        }
      ]
    }
  ]

  useEffect(() => {
    if (roleId) {
      initRoleAclTree()
    }
  }, [roleId])

  /**
   * 当roleId 变化时, 重新获取当前角色对应的权限点
   */
  const initRoleAclTree = useCallback(async () => {
    const roleAclTreeData = roleAclTree()
    const res = transformRoleAclTreeToAntdTree(await roleAclTreeData)
    setRoleAclsTree(res)

    const selectKeys = transformSelectedKeys(res)
    // console.log('--> selectKeys tree 数据:', selectKeys)
    // console.log('--> 处理后的树结构:', res)
    setCheckedAclsKeys(selectKeys)
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
    // console.log('展开/收起树时触发', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
  }

  /**
   * 返回选中节点的key
   * @param checkedKeysValue
   */
  const onCheck: TreeProps['onCheck'] = checkedKeysValue => {
    // console.log('onCheck', checkedKeysValue)
    setCheckedAclsKeys(checkedKeysValue as React.Key[])
  }

  // const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
  //   console.log('onSelect', info)
  //   console.log('--> selectedKeysValue:', selectedKeysValue)
  //   setSelectedKeys(selectedKeysValue)
  // }

  /**
   * 更新角色-权限点关系
   */
  const saveRoleAcls = async () => {
    const updateRoleAclsReq: UpdateRoleAclsReq = {
      roleId: roleId,
      aclIdList: checkedAclsKeys as string[]
    }

    const res = await roleApi.updateRoleAcls({ ...updateRoleAclsReq })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    message.success(msg)
    initRoleAclTree()
  }

  return (
    <div className='role-acl'>
      <Flex vertical={true} gap={10}>
        <Tree
          key={'user-role-acl'}
          showIcon={false}
          checkable={true}
          blockNode={true}
          onExpand={onExpand} // 展开树时触发
          expandedKeys={expandedKeys}
          autoExpandParent={true} // 控制是否严格每层依次展开
          onCheck={onCheck} // 勾选时触发
          treeData={roleAclsTree} // 当前用户对应角色所拥有的权限点
          // treeData={treeData} // 当前用户对应角色所拥有的权限点
          checkedKeys={checkedAclsKeys}
          // onSelect={onSelect} // 点击时触发
          // selectedKeys={selectedKeys}
        />
        <Button style={{ width: '5%' }} onClick={saveRoleAcls}>
          {'保存'}
        </Button>
      </Flex>
    </div>
  )
}

export default RoleAcl
