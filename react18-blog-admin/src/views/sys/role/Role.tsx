import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons'
import { Flex, PaginationProps, Popconfirm, Splitter, Tabs, TabsProps, Tag } from 'antd/lib'
import { TableRowSelection } from 'antd/lib/table/interface'
import { RoleAddReq, RoleEditReq, RoleListPageReq, RoleTableType } from '@/types/apis/sys/role/roleType'
import roleApi from '@/apis/sys/roleApi'
import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import RoleAcl from './RoleAcl'
import RoleUser from './RoleUser'
import { useRoleAclStore } from '@/store/sys/roleStore'
import { useMessage } from '@/components/message/MessageProvider'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { useDictDetailStore } from '@/store/sys/dictStore'
import { transformRoleListToTable } from '@/utils/sys/transform'
import { _ADD_ROLE, _SHOW_ROLE_ACL, _SHOW_ROLE_USER, DelRoleBtnAcl, EditRoleBtnAcl } from './auth/authButton'
import { usePermissionsStore } from '@/store/sys/authStore'

const Role = () => {
  const messageApi = useMessage()
  const { btnSize, tableSize } = useGlobalStyleStore()
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const { dictStatues } = useDictDetailStore()
  const { btnSignSet } = usePermissionsStore()

  /**
   * role-acl store
   * 默认选中角色列表的第一行数据
   */
  const {
    roleId,
    setRoleId,
    selectedRowKeys,
    setSelectedRowKey,
    roleList,
    setRoleList,
    tableLoading,
    tablePageInfo,
    setTablePageInfo
  } = useRoleAclStore()

  const { roleTypes } = useDictDetailStore()
  /**
   * 角色列表的列配置
   */
  const roleColumns: ProColumns<RoleTableType>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '角色名',
      width: '20%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      }),
      render: (_, record: RoleTableType) => {
        if (record.type === 1) {
          return <Tag color={'red'}>{record.name}</Tag>
        }
        return record.name
      }
    },
    {
      key: 'type',
      title: '角色类型',
      dataIndex: 'type',
      valueType: 'select',
      width: '20%',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
          initialValue: roleTypes.length > 0 ? roleTypes[0].value : 2 // 初始化为第一个角色类型
        }
      },
      fieldProps: {
        options: roleTypes, // 绑定下拉框选项
        defaultValue: roleTypes.length > 0 ? roleTypes[0].value : 2, // 确保默认选中普通用户
        onChange: (value: number, option: any) => {}, // selector组件改变值时触发
        fieldNames: { label: 'label', value: 'value' } // 显式绑定 value 和 label
      },
      renderText: (value: number) => {
        // 显示下拉框文本
        return roleTypes.find(item => item.value === value.toString())?.label || value
      },
      render: (_, record: RoleTableType) => {
        return <Tag color={record.type === 1 ? 'red' : 'blue'}>{record.name}</Tag>
      }
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      width: '10%',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
          initialValue: dictStatues.length > 0 ? dictStatues[0].value : 0 // 初始化状态为正常
        }
      },
      fieldProps: {
        options: dictStatues, // 绑定下拉框选项
        defaultValue: dictStatues.length > 0 ? dictStatues[0].value : 0, // 确保默认选中普通用户
        onChange: (value: number, option: any) => {},
        fieldNames: { label: 'label', value: 'value' } // 显式绑定 value 和 label
      },
      renderText: (value: number) => {
        // 显示下拉框文本
        return dictStatues.find(item => item.value === value.toString())?.label || value
      },
      render: (_, record: RoleTableType) => {
        const { status } = record
        let colorText = ''
        let statusText = dictStatues.find(item => item.value === status.toString())?.label || ''
        switch (status) {
          case 0:
            colorText = 'green'
            break
          case 1:
            colorText = 'red'
            break
          case 2:
            colorText = 'purple'
            break
          default:
            colorText = 'default'
            break
        }
        return <Tag color={colorText}>{statusText}</Tag>
      }
    },
    {
      key: 'remark',
      title: '备注',
      dataIndex: 'remark',
      width: '30%'
    },
    {
      key: 'oparet',
      title: '操作',
      dataIndex: 'oparet',
      valueType: 'option',
      width: '20%',
      render: (text, record, _, action) => [
        <Flex key={`edit-${record.key}`} vertical={false} gap={4}>
          <EditRoleBtnAcl
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => {
              action?.startEditable?.(record.key)
            }}
          />
          <Popconfirm
            key={`delete-${record.key}`} // 添加唯一的 key
            title='删除角色'
            description={`确定要删除 [${record.name}] 这个角色吗?`}
            onConfirm={() => deleteRoleConfirm(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <DelRoleBtnAcl size={'small'} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Flex>
      ]
    }
  ]

  /**
   * tab component
   */
  const allTabs: TabsProps['items'] = [
    {
      key: '1',
      label: '角色与权限',
      children: <RoleAcl roleId={roleId} />
    },
    {
      key: '2',
      label: '角色与用户',
      children: <RoleUser />
    }
  ]

  // 根据权限过滤 tabs
  const tabsItem = allTabs.filter(tab => {
    if (tab.key === '1') {
      return btnSignSet.has(_SHOW_ROLE_ACL)
    }
    if (tab.key === '2') {
      return btnSignSet.has(_SHOW_ROLE_USER)
    }
    return false // 默认不显示
  })

  /**
   * 初始化数据
   */
  useEffect(() => {
    const fetchData = async () => {
      initRoleList()
    }
    fetchData()
  }, [])

  /**
   * 初始化角色列表
   */
  const initRoleList = async () => {
    /**
     * 分页查询角色列表
     */
    await retrievePageRoleList({ currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 分页查询角色信息列表
   * @param req
   * @returns
   */
  const retrievePageRoleList = async (req: RoleListPageReq) => {
    const res = await roleApi.retrievePageRoleList({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    // 这里传入的是 SysRoleVO[] 类型
    const roleTableList = transformRoleListToTable(data.list ?? [])
    // 处理 roleTableList, 例如设置到状态中
    setRoleList(roleTableList)
    setTablePageInfo({ currentPageNum: req.currentPageNum, pageSize: req.pageSize, totalSize: data.total })
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<RoleTableType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: async (record, selected, selectedRows) => {
      const selectKey = record.key.toString()
      setSelectedRowKey([selectKey])
      setRoleId(selectKey)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  /**
   * page component
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    retrievePageRoleList({ currentPageNum, pageSize })
  }

  /**
   * 删除角色
   * @param record
   * @returns
   */
  const deleteRoleConfirm = async (record: RoleTableType) => {
    const res = await roleApi.delete({ surrogateId: record.key })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    initRoleList()
  }

  return (
    <div className='sys-role-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        <Splitter style={{ height: '100%', width: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: 'auto' }}>
          <Splitter.Panel defaultSize='30%' min='20%' max='70%'>
            <EditableProTable
              rowKey='key'
              headerTitle={'角色管理'}
              rowSelection={{ type: 'radio', selectedRowKeys, ...rowSelection }}
              bordered={true}
              size={tableSize}
              loading={tableLoading}
              columns={roleColumns}
              value={roleList}
              recordCreatorProps={
                btnSignSet.has(_ADD_ROLE)
                  ? {
                      position: 'bottom',
                      creatorButtonText: '新增角色',
                      // 默认值
                      record: () => ({
                        key: (Math.random() * 1000000).toFixed(0), // 生成唯一的 key
                        surrogateId: '',
                        name: '',
                        type: 2,
                        status: 0,
                        remark: ''
                      })
                    }
                  : false
              }
              tableAlertRender={false} // 直接隐藏 "已选择 X 项"
              tableAlertOptionRender={false} // 隐藏操作选项
              editable={{
                type: 'single',
                editableKeys,
                onSave: async (rowKey, rowData, row) => {
                  const typeValue =
                    roleTypes.find(item => item.label === rowData.type.toString())?.value || rowData.type
                  const statuValue =
                    dictStatues.find(item => item.label === rowData.status.toString())?.value || rowData.status

                  // insert
                  if (rowData.key.length < 2) {
                    const req: RoleAddReq = {
                      name: rowData.name,
                      type: Number(typeValue),
                      status: Number(statuValue),
                      remark: rowData.remark ?? ''
                    }
                    const res = await roleApi.add({ ...req })
                    const { code, msg } = res
                    if (code !== 200) {
                      return
                    }
                    messageApi?.success(msg)
                  } else {
                    // update
                    const req: RoleEditReq = {
                      roleId: rowData.key,
                      name: rowData.name,
                      type: Number(typeValue),
                      status: Number(statuValue),
                      remark: rowData.remark ?? ''
                    }
                    const res = await roleApi.edit({ ...req })
                    const { code, msg } = res
                    if (code !== 200) {
                      return
                    }
                    messageApi?.success(msg)
                  }
                  initRoleList()
                },
                onChange: setEditableRowKeys // 更新可编辑行的函数
              }}
              pagination={{
                size: 'small',
                position: ['bottomLeft'],
                showQuickJumper: false, // 跳转指定页面
                showSizeChanger: true,
                hideOnSinglePage: false,
                pageSizeOptions: [10, 20, 50],
                onChange: onChangePageInfo,
                pageSize: tablePageInfo.pageSize, // 每页条数
                total: tablePageInfo.totalSize // 总条数
              }}
            />
          </Splitter.Panel>
          <Splitter.Panel>
            <Tabs style={{ height: '100%', width: '100%' }} type='card' items={tabsItem} />
          </Splitter.Panel>
        </Splitter>
      </Flex>
    </div>
  )
}

export default Role
