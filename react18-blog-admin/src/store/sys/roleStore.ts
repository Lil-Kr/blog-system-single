import { RoleUserTableType, TableRoleType } from '@/types/apis/sys/role/roleType'
import { TransferProps, TreeDataNode } from 'antd/lib'
import { create } from 'zustand'

interface RoleAclState {
  // 数据加载样式
  tableLoading: boolean
  setTableLoading: (tableLoading: boolean) => void

  // 存储角色列表数据
  roleList: TableRoleType[]
  setRoleList: (roleList: TableRoleType[]) => void

  // 存储角色列表单选时的id
  roleId: string
  setRoleId: (roleId: string) => void

  // 存储角色列表单选时的key
  selectedRowKeys: React.Key[]
  setSelectedRowKey: ([]: React.Key[]) => void

  // 存储角色对应的权限点列表
  roleAclsTree: TreeDataNode[]
  setRoleAclsTree: ([]: TreeDataNode[]) => void

  // 存储角色对应权限树选中后返回的值, 数组
  checkedAclTreeKeysValue: string[]
  setCheckedAclTreeKeysValue: ([]: string[]) => void

  // 存储权限点树勾选时的keys, 并渲染都页面上
  checkedAclsKeys: React.Key[]
  setCheckedAclsKeys: (checkedAclsKeys: React.Key[]) => void

  // 存储穿梭框右边框的集合(target)
  transferTargetKeys: TransferProps['targetKeys']
  setTransferTargetKeys: (transferTargetKeys: TransferProps['targetKeys']) => void

  // 存储穿梭框左边的数据(sourse)
  roleUserList: RoleUserTableType[]
  setRoleUserList: (roleUserList: RoleUserTableType[]) => void
}

const roleAclInit = {
  tableLoading: false,
  roleList: [],
  roleId: '',
  selectedRowKeys: [],
  roleAclsTree: [],
  checkedAclTreeKeysValue: [],
  checkedAclsKeys: [],
  transferTargetKeys: [],
  roleUserList: []
}

const useRoleAclStore = create<RoleAclState>()((set, get) => ({
  ...roleAclInit,
  setTableLoading: (tableLoading: boolean) =>
    set(state => ({
      ...state,
      tableLoading
    })),
  setRoleList: (roleList: TableRoleType[]) =>
    set(state => {
      return {
        ...state,
        roleList
      }
    }),
  setRoleId: (roleId: string) =>
    set(state => {
      return {
        ...state,
        roleId
      }
    }),
  setSelectedRowKey: (selectedRowKeys: React.Key[]) =>
    set(state => {
      return {
        ...state,
        selectedRowKeys
      }
    }),
  setRoleAclsTree: (roleAclsTree: TreeDataNode[]) =>
    set(state => {
      return {
        ...state,
        roleAclsTree
      }
    }),
  setCheckedAclTreeKeysValue: (checkedAclTreeKeysValue: string[]) =>
    set(state => {
      return {
        ...state,
        checkedAclTreeKeysValue
      }
    }),
  setCheckedAclsKeys: (checkedAclsKeys: React.Key[]) =>
    set(state => {
      return {
        ...state,
        checkedAclsKeys
      }
    }),
  setTransferTargetKeys: (transferTargetKeys: TransferProps['targetKeys']) =>
    set(state => {
      return {
        ...state,
        transferTargetKeys
      }
    }),
  setRoleUserList: (roleUserList: RoleUserTableType[]) =>
    set(state => {
      return {
        ...state,
        roleUserList
      }
    })
}))

export { useRoleAclStore }
