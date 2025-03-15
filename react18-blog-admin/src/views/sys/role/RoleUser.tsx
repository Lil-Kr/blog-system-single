import React, { useEffect, useState } from 'react'
import { Flex, Switch, Table, TableColumnsType, Tag, Transfer, TransferProps } from 'antd/lib'
import { Button, message } from 'antd'
import { RoleUserTableType, TableTransferProps } from '@/types/apis/sys/role/roleType'
import TableTransfer from './TableTransfer'
import { useRoleAclStore } from '@/store/sys/roleStore'
import roleApi from '@/apis/sys/roleApi'

const columns: TableColumnsType<RoleUserTableType> = [
  {
    key: 'account',
    dataIndex: 'account',
    title: '账号',
    width: '10%'
  },
  {
    key: 'userName',
    dataIndex: 'userName',
    title: '昵称',
    width: '20%'
  },
  {
    key: 'remark',
    dataIndex: 'remark',
    title: '备注',
    width: '30%'
  },
  {
    key: 'createTime',
    dataIndex: 'createTime',
    title: '创建时间',
    width: '20%'
  },
  {
    key: 'updateTime',
    dataIndex: 'updateTime',
    title: '修改时间',
    width: '20%'
  }
]

const RoleUser = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const onChange: TableTransferProps['onChange'] = nextTargetKeys => {
    setTransferTargetKeys(nextTargetKeys)
  }

  const {
    roleId,
    transferTargetKeys,
    setTransferTargetKeys,
    roleUserList,
    setRoleUserList: setRroleUserList
  } = useRoleAclStore()

  const filterOption = (input: string, item: RoleUserTableType) =>
    item.key?.includes(input) || item.surrogateId?.includes(input)

  useEffect(() => {
    if (roleId) {
      loadRoleUserList()
    }
  }, [roleId])

  /**
   * 加载角色用户列表数据, 并渲染到穿梭框中
   */
  const loadRoleUserList = async () => {
    // 加载角色用户列表数据
    const res = await roleApi.roleUserList({ roleId })
    const { code, data, msg } = res
    if (code !== 200) {
      setRroleUserList([])
      setTransferTargetKeys([])
      return
    }

    const selectedUserList: RoleUserTableType[] = data.selectedUserList.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId, // 这里加回去，确保符合 RoleUserTableType
      ...rest
    }))
    const unSelectedUserList = data.unSelectedUserList.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId, // 这里加回去，确保符合 RoleUserTableType
      ...rest
    }))

    /**
     * 将已选和待选的数据都合并到一起
     * 只需要控制未选的就行
     */
    setRroleUserList([...selectedUserList, ...unSelectedUserList])
    setTransferTargetKeys(selectedUserList.map(item => item.key?.toString() ?? ''))
  }

  /**
   * 修改穿梭框内的值
   */
  const updateRoleUsers = async () => {
    const res = await roleApi.updateRoleUsers({ roleId, userIdList: transferTargetKeys as string[] })
    const { code, msg } = res
    if (code !== 200) {
      return
    }

    messageApi.success('abbabab')
    loadRoleUserList()
  }

  return (
    <div className='role-user-warpper'>
      <Flex gap='middle' vertical>
        <TableTransfer
          titles={['待选用户列表', '已选用户列表']}
          dataSource={roleUserList}
          targetKeys={transferTargetKeys} // 穿梭框右边的数据
          disabled={false}
          showSearch
          showSelectAll={false}
          onChange={onChange}
          filterOption={filterOption}
          leftColumns={columns}
          rightColumns={columns}
        />
        <Flex justify={'flex-start'} align={'center'} gap={'middle'}>
          <Button onClick={updateRoleUsers}>{'保存'}</Button>
        </Flex>
      </Flex>
    </div>
  )
}

export default RoleUser
