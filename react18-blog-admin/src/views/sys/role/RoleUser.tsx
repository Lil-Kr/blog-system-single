import { useEffect } from 'react'
import { Flex, TableColumnsType, Tag } from 'antd/lib'
import { Button } from 'antd/lib'
import { RoleUserTableType, TableTransferProps } from '@/types/apis/sys/role/roleType'
import TableTransfer from './TableTransfer'
import { useRoleAclStore } from '@/store/sys/roleStore'
import roleApi from '@/apis/sys/roleApi'
import { useMessage } from '@/components/message/MessageProvider'
import { UpdateRoleUserBtnAcl } from './auth/authButton'

const columnsAclUser: TableColumnsType<RoleUserTableType> = [
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
    width: '40%'
  },
  {
    key: 'updateTime',
    dataIndex: 'updateTime',
    title: '修改时间',
    width: '30%'
  }
]

const RoleUser = () => {
  const messageApi = useMessage()
  const { roleId, transferTargetKeys, setTransferTargetKeys, roleUserList, setRoleUserList } = useRoleAclStore()

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

  /**
   * 穿梭框的回调函数
   * 数据左右滑动时触发
   * @param nextTargetKeys
   */
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
      <Flex gap='middle' vertical={true}>
        <TableTransfer
          titles={['待选用户列表', '已选用户列表']}
          dataSource={roleUserList}
          targetKeys={transferTargetKeys} // 穿梭框右边的数据 [已选用户]
          disabled={false}
          showSearch
          showSelectAll={false}
          onChange={onChange}
          filterOption={filterOption}
          leftColumns={columnsAclUser}
          rightColumns={columnsAclUser}
        />
        <Flex justify={'flex-start'} align={'center'} gap={'middle'}>
          <UpdateRoleUserBtnAcl text='更新用户' onClick={updateRoleUsers} />
        </Flex>
      </Flex>
    </div>
  )
}

export default RoleUser
