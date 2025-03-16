import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons/lib/icons'
import { Button, Flex, PaginationProps, Popconfirm, Space, Splitter, Tabs, TabsProps, Tag, Tooltip } from 'antd/lib'
import { OptionType, transformTypeToSeletor } from '@/types/apis'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { TableRowSelection } from 'antd/lib/table/interface'
import { TablePageInfoType } from '@/types/base'
import { RoleAddReq, RoleEditReq, RoleListPageReq, SysRoleVO, TableRoleType } from '@/types/apis/sys/role/roleType'
import roleApi from '@/apis/sys/roleApi'
import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import useDictDetailStore from '@/store/global/dictStore'
import RoleAcl from './RoleAcl'
import RoleUser from './RoleUser'
import { useRoleAclStore } from '@/store/sys/roleStore'
import { useMessage } from '@/components/message/MessageProvider'

const Role = () => {
  const messageApi = useMessage()
  const MemoTooltip = Tooltip || React.memo(Tooltip)
  const [roleStyle] = useState<SizeType>('small')
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  // const [form] = useForm()
  const { dictMap } = useDictDetailStore()
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })

  // 存储角色类型, 来自数据字典
  const [roleType, setRoleType] = useState<OptionType[]>([])
  // 存储状态类型, 来自数据字典
  const [statuType, setStatuType] = useState<OptionType[]>([])

  /**
   * role-acl store
   * 默认选中角色列表的第一行数据
   */
  const { roleId, setRoleId, selectedRowKeys, setSelectedRowKey, roleList, setRoleList } = useRoleAclStore()

  /**
   * 角色列表的列配置
   */
  const roleColumns: ProColumns<TableRoleType>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '角色名',
      width: '20%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      }),
      render: (_, record: TableRoleType) => {
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
          initialValue: roleType.length > 0 ? roleType[0].value : 2 // 初始化为第一个角色类型
        }
      },
      fieldProps: {
        options: roleType, // 绑定下拉框选项
        defaultValue: roleType.length > 0 ? roleType[0].value : 2, // 确保默认选中普通用户
        onChange: (value: number, option: any) => {}, // selector组件改变值时触发
        fieldNames: { label: 'label', value: 'value' } // 显式绑定 value 和 label
      },
      renderText: (value: number) => {
        // 显示下拉框文本
        return roleType.find(item => item.value === value.toString())?.label || value
      },
      render: (_, record: TableRoleType) => {
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
          initialValue: statuType.length > 0 ? statuType[0].value : 0 // 初始化状态为正常
        }
      },
      fieldProps: {
        options: statuType, // 绑定下拉框选项
        defaultValue: statuType.length > 0 ? statuType[0].value : 0, // 确保默认选中普通用户
        onChange: (value: number, option: any) => {
        },
        fieldNames: { label: 'label', value: 'value' } // 显式绑定 value 和 label
      },
      renderText: (value: number) => {
        // 显示下拉框文本
        return statuType.find(item => item.value === value.toString())?.label || value
      },
      render: (_, record: TableRoleType) => {
        const { status } = record
        let colorText = ''
        let statusText = statuType.find(item => item.value === status.toString())?.label || ''
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
        <Space key={`edit-${record.key}`} size={roleStyle}>
          <Button
            size={roleStyle}
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
            title='删除标签'
            description={`确定要删除 [${record.name}] 这个这个组织吗?`}
            onConfirm={() => deleteRoleConfirm(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <Button size={'small'} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ]
    }
  ]

  /**
   * tab component
   */
  const tabsItem: TabsProps['items'] = [
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

  /**
   * 初始化数据
   */
  useEffect(() => {
    const fetchData = async () => {
      setTableLoading(true)
      await initData() // 等待数据加载完成
      setTableLoading(false)
    }

    fetchData()
  }, [])

  /**
   * 初始化数据
   */
  const initData = async () => {
    try {
      /**
       * 加载角色列表
       */
      initRoleList()

      /**
       * 查询数据字典【角色类型】
       */
      const roleTypes = dictMap.get('角色类型') ?? []
      const roleType = transformTypeToSeletor(roleTypes)
      setRoleType(roleType)

      /**
       * 查询数据字典【状态类型】
       */
      const statuTypeList = dictMap.get('状态类型') ?? []
      const statusTypes = transformTypeToSeletor(statuTypeList)
      setStatuType(statusTypes)
    } catch (error) {
      console.error('Failed to retrieve role list:', error)
    } finally {
      setTableLoading(false)
    }
  }

  /**
   * 初始化角色列表
   */
  const initRoleList = async () => {
    /**
     * 分页查询角色列表
     */
    const roleList = await retrievePageRoleList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
    // 这里传入的是 SysRoleVO[] 类型
    const roleTableList = transformRoleList(roleList)
    // 处理 roleTableList, 例如设置到状态中
    setRoleList(roleTableList)
  }

  /**
   * 分页查询角色信息列表
   * @param req
   * @returns
   */
  const retrievePageRoleList = async (req: RoleListPageReq): Promise<SysRoleVO[]> => {
    const res = await roleApi.retrievePageRoleList({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    return data.list as SysRoleVO[]
  }

  /**
   * 转换角色信息列表, 用于角色列表展示
   * @param list
   * @returns
   */
  const transformRoleList = (list: SysRoleVO[]): TableRoleType[] => {
    const mappingList = list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId,
      ...rest
    }))
    return mappingList
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<TableRoleType> = {
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
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {}

  /**
   * page component
   * @param currentPageNum
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  /**
   * 删除角色
   * @param record
   * @returns
   */
  const deleteRoleConfirm = async (record: TableRoleType) => {
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
          <Splitter.Panel defaultSize='30%' min='20%' max='60%'>
            <EditableProTable
              rowKey='key'
              headerTitle='角色管理'
              rowSelection={{ type: 'radio', selectedRowKeys, ...rowSelection }}
              bordered={true}
              size={roleStyle}
              loading={tableLoading}
              columns={roleColumns}
              value={roleList}
              recordCreatorProps={{
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
              }}
              tableAlertRender={false} // 直接隐藏 "已选择 X 项"
              tableAlertOptionRender={false} // 隐藏操作选项
              editable={{
                type: 'multiple',
                editableKeys,
                onSave: async (rowKey, rowData, row) => {
                  const typeValue = roleType.find(item => item.label === rowData.type.toString())?.value || rowData.type
                  const statuValue =
                    statuType.find(item => item.label === rowData.status.toString())?.value || rowData.status

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
                      surrogateId: rowData.key,
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
                onShowSizeChange: onShowSizeChange,
                pageSize: tablePageInfo.pageSize, // 每页条数
                total: tablePageInfo.totalSize // 总条数
              }}
            />
          </Splitter.Panel>
          <Splitter.Panel>
            <Tabs
              style={{ height: '100%', width: '100%' }}
              type='card'
              items={tabsItem}
            />
          </Splitter.Panel>
        </Splitter>
      </Flex>
    </div>
  )
}

export default Role
