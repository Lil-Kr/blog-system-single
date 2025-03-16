import React, { useEffect, useState } from 'react'
import { Flex, Switch, Table, TableColumnsType, Tag, Transfer, TransferProps } from 'antd/lib'
import { Button, message } from 'antd'
import { RoleUserTableType, TableTransferProps } from '@/types/apis/sys/role/roleType'
import TableTransfer from './TableTransfer'
import { useRoleAclStore } from '@/store/sys/roleStore'
import roleApi from '@/apis/sys/roleApi'
import { useMessage } from '@/components/message/MessageProvider'

const columns: TableColumnsType<RoleUserTableType> = [
  {
    key: 'account',
    dataIndex: 'account',
    title: '账号',
    width: '10%',
    render: (_, record) => <Tag color='orange'>{record.account}</Tag>
  },
  {
    key: 'userName',
    dataIndex: 'userName',
    title: '昵称',
    width: '20%',
    render: (_, record) => <Tag color='purple'>{record.account}</Tag>
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
  const { roleId, transferTargetKeys, setTransferTargetKeys, roleUserList, setRoleUserList } = useRoleAclStore()
  const messageApi = useMessage()

  /**
   * 控制穿梭框的搜索功能
   */
  const filterOption = (inputValue: string, item: RoleUserTableType, direction: 'left' | 'right'): boolean => {
    const searchText = inputValue.toLowerCase()

    const accountMatch = item.account ? item.account.toLowerCase().includes(searchText) : false
    const userNameMatch = item.userName ? item.userName.toLowerCase().includes(searchText) : false
    const remarkMatch = item.remark ? item.remark.toLowerCase().includes(searchText) : false

    return accountMatch || userNameMatch || remarkMatch
  }

  const onChange: TableTransferProps['onChange'] = nextTargetKeys => {
    setTransferTargetKeys(nextTargetKeys)
  }

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
      setRoleUserList([])
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
    setRoleUserList([...selectedUserList, ...unSelectedUserList])
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
    loadRoleUserList()
    messageApi?.success(msg)
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
