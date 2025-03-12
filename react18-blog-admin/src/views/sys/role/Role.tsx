import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons/lib/icons'
import { Button, Divider, Flex, PaginationProps, Popconfirm, Space, Splitter, Table, Tag, Tooltip } from 'antd/lib'
import { SelectOptionType, SelectTreeNodeType } from '@/types/apis'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useForm } from 'antd/lib/form/Form'
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface'
import { TablePageInfoType } from '@/types/base'
import { RoleListPageReq, SysRoleVO, TableRoleType } from '@/types/apis/sys/role/roleType'
import roleApi from '@/apis/sys/roleApi'

const Role = () => {
  const columns: ColumnsType<TableRoleType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '角色名',
      width: '40%',
      fixed: 'left'
    },
    {
      key: 'roleTypeName',
      dataIndex: 'roleTypeName',
      title: '权限类型',
      width: '20%',
      render: (_, record: TableRoleType) => {
        if (record.type === 1) {
          return <Tag color='red'>{record.type}</Tag>
        } else {
          return <Tag color='geekblue'>{record.type}</Tag>
        }
      }
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: '10%',
      render: (_, record: TableRoleType) => {
        let tagColor = 'green' // 默认颜色
        let statusText = '正常' // 默认文本
        // 根据状态设置不同的颜色和文本
        switch (record.status) {
          case 0:
            tagColor = 'green'
            statusText = '正常'
            break
          case 1:
            tagColor = 'red'
            statusText = '冻结'
            break
          default:
            tagColor = 'gray'
            statusText = '未知'
            break
        }
        return (
          <Tag key={record.key} color={tagColor}>
            {statusText}
          </Tag>
        )
      }
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      fixed: 'right',
      render: (_: object, record: TableRoleType) => (
        <Space size={roleStyle}>
          <Button
            size={roleStyle}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            // onClick={() => editItem(record.key ?? '', record)}
          />
          <Popconfirm
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
      )
    }
  ]

  const MemoTooltip = Tooltip || React.memo(Tooltip)
  const [roleStyle, setRoleStyle] = useState<SizeType>('small')
  // const [form] = useForm()
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })
  const [dataSource, setDataSource] = useState<TableRoleType[]>([] as TableRoleType[])
  // 用于存储选中行的 key
  const [selectedRowKey, setSelectedRowKey] = useState<string>('')

  /**
   * 初始化数据
   */
  useEffect(() => {
    // load org info list
    initData()
  }, [])

  const initData = async () => {
    setTableLoading(true)

    // // 分页查询绝嗣信息
    try {
      const roleList = await retrievePageRoleList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
      const roleTableList = transformRoleList(roleList) // 这里传入的是 SysRoleVO[] 类型
      // 处理 roleTableList，例如设置到状态中
      setDataSource(roleTableList)
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
   * 选中列表行时出发
   * @param record
   * @param index
   */
  const selectRoleRow = (record?: any, index?: number) => {
    console.log('--> record:', { ...record })
    console.log('--> index:', index)
    setSelectedRowKey(record.key)
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
          <Splitter.Panel defaultSize='20%' min='20%' max='70%'>
            <Button icon={<PlusOutlined />} />
            <Divider orientation='center'>
              <div>{'角色信息'}</div>
            </Divider>
            <Table
              key={1}
              bordered={true}
              loading={tableLoading}
              columns={columns}
              dataSource={dataSource}
              size={roleStyle}
              onRow={(record, index) => ({
                onClick: event => selectRoleRow(record, index)
              })}
              rowClassName={rowClassName} // 设置行的样式
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

export default Role
