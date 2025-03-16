import React, { useEffect, useRef, useState } from 'react'
import { AntDesignOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row, Table, Tooltip, Tree } from 'antd/lib'
import { Form, Input, PaginationProps, Popconfirm, Space, Tag, type TreeDataNode } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { TablePageInfoType } from '@/types/base'
import { IModalRequestAction, IModalParams, IAction, IModalStyle } from '@/types/component/modal'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { useForm } from 'antd/es/form/Form'
import { transformOrgTreeExpandeKeys, transformToTreeData } from '@/utils/sys/treeUtils'
import { UserListPageReq, UserTableType } from '@/types/apis/sys/user/userType'
import UserModal from '@/components/modal/UserModal'
import { orgApi, userApi } from '@/apis/sys'
import { OptionType } from '@/types/apis'
import DirectoryTree from 'antd/lib/tree/DirectoryTree'
import { Key } from 'antd/lib/table/interface'

const User = () => {
  const userColumns: ColumnsType<any> = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: 100
    },
    {
      key: 'userName',
      dataIndex: 'userName',
      title: '昵称',
      width: 100
    },
    {
      key: 'orgName',
      dataIndex: 'orgName',
      title: '所属组织',
      width: 50,
      render: (_, record: UserTableType) => <Tag color='geekblue'>{record.orgName}</Tag>
    },
    {
      key: 'telephone',
      dataIndex: 'telephone',
      title: '联系方式',
      width: 50
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: 50,
      render: (_, record: UserTableType) => {
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
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: 100
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: 50
    },
    {
      key: 'updateTime',
      dataIndex: 'updateTime',
      title: '修改时间',
      width: 50
    },
    {
      key: 'operatorName',
      dataIndex: 'operatorName',
      title: '操作人',
      width: 50
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: 150,
      render: (_: object, record: UserTableType) => (
        <Space size='middle'>
          <Button
            size={btnSize}
            name='look'
            type='link'
            shape='circle'
            icon={<SearchOutlined />}
            onClick={() => lookItem(record.key ?? '', record)}
          />
          <Button
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editItem(record.key ?? '', record)}
          />
          <Popconfirm
            title='删除标签'
            description={`确定要删除 [${record.userName}] 这个这个用户吗?`}
            onConfirm={() => deleteItemConfirm(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <Button size={btnSize} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const MemoTooltip = Tooltip || React.memo(Tooltip)
  const [btnSize] = useState<SizeType>('small')
  const [userTableSize] = useState<SizeType>('small')
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [form] = useForm()
  // 函数式更新值, 不能直接更新
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })
  const [orgTree, setOrgTree] = useState<TreeDataNode[]>([] as TreeDataNode[])
  const [dataSource, setDataSource] = useState<UserTableType[]>([] as UserTableType[])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // 默认展开所有节点
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [selectedInfo, setSelectedInfo] = useState<OptionType>({} as OptionType)

  const userRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      data?: UserTableType
    ) => void
  }>()

  const createUser = () => {
    const modalData = {
      orgInfo: selectedInfo
    }
    userRef.current?.open(
      { api: userApi },
      { title: '添加' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...modalData }
    )
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: UserTableType) => {
    const modalData: UserTableType = {
      orgInfo: {
        value: record.orgId,
        label: record.orgName
      },
      ...record
    }
    userRef.current?.open(
      { api: userApi },
      { title: '查看' },
      { action: 'look', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...modalData }
    )
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = (key: string, record: UserTableType) => {
    const modalData: UserTableType = {
      orgInfo: {
        value: record.orgId,
        label: record.orgName
      },
      ...record
    }
    userRef.current?.open(
      { api: userApi },
      { title: '编辑' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...modalData }
    )
  }

  /**
   * 删除用户
   * @param record
   * @returns
   */
  const deleteItemConfirm = async (record: UserTableType) => {
    const res = await userApi.delete({ surrogateId: record.key ?? '' })
    if (res.code !== 200) {
      return
    }
    pageUserList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }
  /**
   * 搜索
   */
  const search = () => {
    let data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: tablePageInfo.pageSize }
    pageUserList({ ...searchParam })
  }

  /**
   * 重置btn
   */
  const resetSearch = () => {
    form.resetFields()
    pageUserList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  /**
   * 分页查询
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    pageUserList({ ...values, currentPageNum, pageSize })
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<UserTableType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  /**
   * 初始化数据
   */
  useEffect(() => {
    // load org info list
    initInfo()
  }, [])

  /**
   * init
   */
  const initInfo = async () => {
    setTableLoading(true)

    // 加载组织树
    retrieveOrgTreeList()

    // loading user list page
    pageUserList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })

    setTableLoading(false)
  }

  /**
   * loading user list page
   * @param req
   */
  const pageUserList = async (req: UserListPageReq) => {
    // 加载当前组织下的子节点数据
    const userList = await userApi.pageUserList({
      keyWords: req.keyWords || '',
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    const { code, data, msg } = userList
    if (code !== 200) {
      return
    }

    const list: UserTableType[] = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      ...rest
    }))
    setDataSource(list)
    setTablePageInfo(prevState => ({
      ...prevState,
      totalSize: data.total
    }))
  }

  /**
   * loading org tree list
   * @returns
   */
  const retrieveOrgTreeList = async () => {
    const orgList = await orgApi.retrieveOrgTreeList()
    const { code, data, msg } = orgList
    if (code !== 200) {
      return
    }
    const res = transformToTreeData(data)
    // 加载组织树
    setOrgTree(res)

    // 默认展开根节点
    const expandeKeys: string[] = transformOrgTreeExpandeKeys(data)
    setExpandedKeys(expandeKeys)

    // 默认选中根节点
    setSelectedKeys([res[0].key.toString()])
  }

  /**
   * retrieve user info of children list by node key
   */
  const pageUserListByOrgId = async (node: any) => {
    // 选中当前key
    setSelectedKeys([node.key])
    // 设置选中的组织信息
    setSelectedInfo({ label: node.title, value: node.key })

    // 加载当前组织下的子节点数据
    const userList = await userApi.pageUserList({
      surrogateId: node.key,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    const { code, data, msg } = userList
    if (code !== 200) {
      return
    }

    const list: UserTableType[] = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      ...rest
    }))
    setDataSource(list)
    setTablePageInfo(prevState => ({
      ...prevState,
      totalSize: data.total
    }))
  }

  const onExpand = (expandedKeysValue: Key[]) => {
    setExpandedKeys(expandedKeysValue) // 更新展开的节点
  }

  return (
    <div className='sys-user-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        <Row gutter={4} style={{ height: '100%' }}>
          <Col span={4} style={{ width: '100%', height: '100%' }}>
            {/* 当Tree向右展开超出右边界时, 出现水平滚动条 */}
            <Card style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}>
              <DirectoryTree
                showLine={true}
                showIcon={false}
                checkable={false}
                blockNode={true} // 是否节点占据一行
                treeData={orgTree}
                selectedKeys={selectedKeys}
                expandedKeys={expandedKeys} // （受控）展开指定的树节点
                onExpand={onExpand}
                // defaultExpandAll={true}
                // defaultExpandedKeys={[]}
                // defaultExpandParent={true}
                titleRender={item => {
                  const title = item.title as React.ReactNode
                  return <MemoTooltip title={title}>{title}</MemoTooltip>
                }}
                onSelect={(key, info) => pageUserListByOrgId(info.node)}
              />
            </Card>
          </Col>
          <Col span={20} style={{ width: '100%', height: '100%' }}>
            <Card style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}>
              <Flex vertical={true} gap={'small'}>
                <div className='operation-btn'>
                  <Flex vertical={false} gap='small'>
                    <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createUser}>
                      {'新增'}
                    </Button>
                    <Form form={form}>
                      <Flex gap='small'>
                        <Form.Item name={'keyWords'} label={'搜索关键字'}>
                          <Input placeholder={'搜索关键字'} />
                        </Form.Item>
                        <Form.Item>
                          <Button size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
                        </Form.Item>
                        <Form.Item>
                          <Button size={btnSize} type='primary' onClick={resetSearch}>
                            {'置空'}
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button type='dashed' size={btnSize} icon={<AntDesignOutlined />} onClick={resetSearch}>
                            {'全部'}
                          </Button>
                        </Form.Item>
                      </Flex>
                    </Form>
                  </Flex>
                </div>
                {/* show table info */}
                <div className='list'>
                  <Table
                    key={1}
                    size={userTableSize}
                    bordered={true}
                    title={() => '管理员列表'}
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection
                    }}
                    loading={tableLoading}
                    columns={userColumns}
                    dataSource={dataSource}
                    pagination={{
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
                </div>
              </Flex>
            </Card>
          </Col>
        </Row>
        <UserModal
          mRef={userRef}
          update={() => {
            initInfo()
          }}
        />
      </Flex>
    </div>
  )
}

export default User
