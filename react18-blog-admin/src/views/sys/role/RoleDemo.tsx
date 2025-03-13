import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons/lib/icons'
import { Button, Divider, Flex, PaginationProps, Popconfirm, Space, Splitter, Table, Tag, Tooltip } from 'antd/lib'
import { OptionType } from '@/types/apis'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useForm } from 'antd/lib/form/Form'
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface'
import { TablePageInfoType } from '@/types/base'
import { RoleListPageReq, SysRoleVO, TableRoleType } from '@/types/apis/sys/role/roleType'
import roleApi from '@/apis/sys/roleApi'
import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { dictApi } from '@/apis/sys/dictApi'
import { DictDetailListReq } from '@/types/apis/sys/dict/dictType'

const RoleDemo = () => {
  const MemoTooltip = Tooltip || React.memo(Tooltip)
  const [roleStyle, setRoleStyle] = useState<SizeType>('small')
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [form] = useForm()
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })
  // 存储角色信息并展示列表
  const [dataSource, setDataSource] = useState<readonly TableRoleType[]>([] as TableRoleType[])
  // 用于存储选中行的 key
  const [selectedRowKey, setSelectedRowKey] = useState<string>('')
  // 存储角色类型, 来自数据字典
  const [dictRoleType, setDictRoleType] = useState<OptionType[]>([])
  // 存储状态类型, 来自数据字典
  const [statuType, setStatuType] = useState<OptionType[]>([])

  /**
   * 初始化数据
   */
  useEffect(() => {
    setTableLoading(true)
    // load org info list
    initData()
    setTableLoading(false)
  }, [])

  const columns: ProColumns<TableRoleType>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '字典名称',
      width: '40%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      }),
      editable: (text, record, index) => index !== 0
    },
    {
      key: 'type',
      title: '字典类型',
      dataIndex: 'type',
      valueType: 'select',
      width: '30%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      }),
      render: (_, record: TableRoleType) => <Tag color={record.type === 1 ? 'red' : 'geekblue'}>{record.type}</Tag>,
      valueEnum: dictRoleType.reduce((acc, curr) => {
        if (typeof curr.value === 'string') {
          acc[curr.value] = curr.label ?? ''
        }
        return acc
      }, {} as Record<string, string>)
    },
    {
      key: 'oparet',
      title: '操作',
      dataIndex: 'oparet',
      valueType: 'option',
      width: '30%',
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
            // onConfirm={() => deleteItemConfirm(record)}
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

  const initData = async () => {
    try {
      /**
       * 分页查询角色列表
       */
      const roleList = await retrievePageRoleList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
      const roleTableList = transformRoleList(roleList) // 这里传入的是 SysRoleVO[] 类型
      // 处理 roleTableList, 例如设置到状态中
      setDataSource(roleTableList)

      /**
       * 查询数据字典【角色类型】
       */
      const roleTypeList = retrieveDictDetiaRoleTypelList({ dictSurrogateId: '1334072837190848512' })
      setDictRoleType(await roleTypeList)

      /**
       * 查询数据字典【状态类型】
       */
      const statuTypeList = retrieveDictDetialStatusTypeList({ dictSurrogateId: '1899727804275232768' })
      setStatuType(await statuTypeList)
    } catch (error) {
      console.error('Failed to retrieve role list:', error)
    } finally {
      setTableLoading(false)
    }
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
   * 转换角色信息列表, 用于table展示
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
   * 查询数据字 -> 角色类型列表
   * @param req
   * @returns
   */
  const retrieveDictDetiaRoleTypelList = async (req: DictDetailListReq): Promise<OptionType[]> => {
    const res = await dictApi.dictDetail({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }

    const list: OptionType[] = data.dictDetailVOList.map(({ surrogateId, name, type }) => ({
      value: surrogateId,
      label: name
    }))

    return list
  }

  /**
   * 查询数据字典 -> 状态类型列表
   * @param req
   * @returns
   */
  const retrieveDictDetialStatusTypeList = async (req: DictDetailListReq): Promise<OptionType[]> => {
    const res = await dictApi.dictDetail({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }

    const list: OptionType[] = data.dictDetailVOList.map(({ surrogateId, name, type }) => ({
      value: type.toString(),
      label: name
    }))

    return list
  }

  /**
   * 选中列表行时出发
   * @param record
   * @param index
   */
  const selectRoleRow = (record?: any, index?: number) => {
    // console.log('--> record:', { ...record })
    // console.log('--> index:', index)
    setSelectedRowKey(record.key)
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<TableRoleType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  /**
   * page component
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    // const values = form.getFieldsValue()
    // retrieveAclPageList({ ...values, currentPageNum, pageSize })
  }

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
   * 选中行时改变选中样式
   * @param record
   * @param index
   * @returns
   */
  const rowClassName = (record: any, index?: number) => {
    return record.key === selectedRowKey ? 'selected-row' : '' // 根据选中状态返回类名
  }

  return (
    <div className='sys-role-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        <Splitter style={{ height: '100%', width: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: 'auto' }}>
          <Splitter.Panel defaultSize='20%' min='20%' max='30%'>
            <Divider orientation='center'>
              <div>{'角色信息'}</div>
            </Divider>
            <EditableProTable
              rowKey='key'
              // headerTitle='角色管理'
              bordered={true}
              // maxLength={5} // 最大的行数, 到达最大行数新建按钮会自动消失
              // rowSelection={{
              //   type: 'checkbox',
              //   ...rowSelection
              // }}
              onRow={(record, index) => ({
                onClick: event => selectRoleRow(record, index)
              })}
              recordCreatorProps={{
                position: 'bottom',
                // 默认值
                record: () => ({
                  key: (Math.random() * 1000000).toFixed(0), // 生成唯一的 key
                  surrogateId: '',
                  name: '',
                  type: 0,
                  status: 0,
                  remark: ''
                }),
                creatorButtonText: '新增角色'
              }}
              loading={tableLoading}
              size={roleStyle}
              columns={columns}
              // dataSource={dataSource}
              value={dataSource}
              onChange={setDataSource}
              editable={{
                type: 'multiple',
                editableKeys,
                onSave: async (rowKey, data, row) => {
                  console.log('--> req:', {
                    name: data.name,
                    roleTypeId: data.type,
                    status: data.status ?? 0
                  })
                  // 新增角色
                  // const res = await roleApi.add({
                  //   name: data.name,
                  //   roleTypeId: data.roleTypeName,
                  //   status: data.status ?? 0
                  // })
                  // const { code, msg } = res
                  // if (code !== 200) {
                  //   return
                  // }
                  // message.success(msg)
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
          <Splitter.Panel>{'abababa'}</Splitter.Panel>
        </Splitter>
      </Flex>
    </div>
  )
}

export default RoleDemo
