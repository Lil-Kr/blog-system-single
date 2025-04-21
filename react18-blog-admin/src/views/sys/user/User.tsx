import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import {
  Card,
  Col,
  Flex,
  Row,
  Table,
  Tree,
  Form,
  Input,
  PaginationProps,
  Popconfirm,
  Tag,
  TreeDataNode
} from 'antd/lib'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { TablePageInfoType } from '@/types/base'
import { IModalRequestAction, IModalParams, IAction, IModalStyle } from '@/types/component/modal'
import { useForm } from 'antd/es/form/Form'
import { transformOrgTreeExpandeKeys, transformOrgListToTreeData } from '@/utils/sys/treeUtils'
import { UserListPageReq, UserTableType } from '@/types/apis/sys/user/userType'
import { orgApi, userApi } from '@/apis/sys'
import { OptionType } from '@/types/apis'
import { Key } from 'antd/lib/table/interface'
import {
  _QUERY_USER_ACL,
  AddUserButtonAcl,
  DelUserButtonAcl,
  EditUserButtonAcl,
  LookUserBtnAcl,
  QueryUserBtnAcl
} from './auth/authButton'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { transformUserListToTable } from '@/utils/sys/transform'
import UserModal from '@/components/modal/UserModal'
import { usePermissionsStore } from '@/store/sys/authStore'

const User = () => {
  const userColumns: ColumnsType<UserTableType> = [
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
      width: '10%'
    },
    {
      key: 'orgName',
      dataIndex: 'orgName',
      title: '所属组织',
      width: '10%',
      render: (_, record) => <Tag color='geekblue'>{record.orgName}</Tag>
    },
    {
      key: 'telephone',
      dataIndex: 'telephone',
      title: '联系方式',
      width: '10%'
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: '5%',
      render: (_, record) => {
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
      width: '15%'
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: '10%'
    },
    {
      key: 'updateTime',
      dataIndex: 'updateTime',
      title: '修改时间',
      width: '10%'
    },
    {
      key: 'operatorName',
      dataIndex: 'operatorName',
      title: '操作人',
      width: '10%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      render: (_: object, record: UserTableType) => (
        <Flex vertical={false} gap={8}>
          <LookUserBtnAcl
            size={btnSize}
            name='look'
            type='link'
            shape='circle'
            icon={<SearchOutlined />}
            onClick={() => lookUser(record.key ?? '', record)}
          />

          <EditUserButtonAcl
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editUser(record.key ?? '', record)}
          />
          <Popconfirm
            title='删除用户'
            description={`确定要删除 [${record.userName}] 这个用户吗?`}
            onConfirm={() => deleteUserConfirm(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <DelUserButtonAcl
              size={btnSize}
              name='delete'
              type='link'
              shape='circle'
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Flex>
      )
    }
  ]

  const [form] = useForm()
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  // 函数式更新值, 不能直接更新
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 20,
    totalSize: 0
  })
  const [orgTree, setOrgTree] = useState<TreeDataNode[]>([] as TreeDataNode[])
  const [userPageList, setUserPageList] = useState<UserTableType[]>([] as UserTableType[])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // 默认展开所有节点
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [selectedInfo, setSelectedInfo] = useState<OptionType>({} as OptionType)
  const { btnSignSet } = usePermissionsStore()

  /**
   * 初始化数据
   */
  useEffect(() => {
    initInfo()
  }, [])

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
   * lookUser
   * @param key
   * @param record
   */
  const lookUser = (key: string, record: UserTableType) => {
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
  const editUser = (key: string, record: UserTableType) => {
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
  const deleteUserConfirm = async (record: UserTableType) => {
    const res = await userApi.delete({ surrogateId: record.key ?? '' })
    if (res.code !== 200) {
      return
    }
    retirevePageUserList({ currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 搜索
   */
  const search = () => {
    const data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: tablePageInfo.pageSize }
    retirevePageUserList({ ...searchParam })
  }

  /**
   * 重置btn
   */
  const resetSearch = () => {
    form.resetFields()
    retirevePageUserList({ currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 分页查询
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retirevePageUserList({ ...values, surrogateId: selectedKeys[0], currentPageNum, pageSize })
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
   * init
   */
  const initInfo = async () => {
    // 加载组织树
    retrieveOrgTreeList()

    // loading user list page
    retirevePageUserList({ currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })
  }

  /**
   * loading user list page
   * @param req
   */
  const retirevePageUserList = async (req: UserListPageReq) => {
    // 加载当前组织下的子节点数据
    const res = await userApi.pageUserList({
      ...req
    })
    const { code, data } = res
    if (code !== 200) {
      return
    }

    const list: UserTableType[] = transformUserListToTable(data.list ?? [])
    setUserPageList(list)

    // 设置分页信息
    setTablePageInfo(prevState => ({
      ...prevState,
      currentPageNum: req.currentPageNum,
      pageSize: req.pageSize,
      totalSize: data.total
    }))
  }

  /**
   * loading org tree list
   * @returns
   */
  const retrieveOrgTreeList = async () => {
    const orgList = await orgApi.retrieveOrgTreeList()
    const { code, data } = orgList
    if (code !== 200) {
      return
    }
    const res = transformOrgListToTreeData(data)
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
    // 选中当前选中的tree key
    setSelectedKeys([node.key])
    // 设置选中的组织信息
    setSelectedInfo({ label: node.title, value: node.key })

    await retirevePageUserList({
      surrogateId: node.key,
      currentPageNum: tablePageInfo.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
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
              <Tree
                showLine={true}
                showIcon={false}
                checkable={false}
                blockNode={true} // 是否节点占据一行
                treeData={orgTree}
                selectedKeys={selectedKeys}
                expandedKeys={expandedKeys} // (受控) 展开指定的树节点
                onExpand={onExpand}
                // defaultExpandAll={true}
                // defaultExpandedKeys={[]}
                // defaultExpandParent={true}
                // titleRender={item => {
                //   const title = item.title as React.ReactNode
                //   return <MemoTooltip title={title}>{title}</MemoTooltip>
                // }}
                onSelect={(key, info) => pageUserListByOrgId(info.node)}
              />
            </Card>
          </Col>
          <Col span={20} style={{ width: '100%', height: '100%' }}>
            <Card style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}>
              <Flex className='operation-btn' vertical={true} gap={'small'}>
                {btnSignSet.has(_QUERY_USER_ACL) ? (
                  <Form form={form}>
                    <Flex gap={8}>
                      <Form.Item name={'keyWords'} label={'关键字'}>
                        <Input style={{ width: '10vw' }} size={inputSize} placeholder={'搜索关键字'} />
                      </Form.Item>
                      <Form.Item>
                        <QueryUserBtnAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
                      </Form.Item>
                      <Form.Item>
                        <QueryUserBtnAcl text={'重置'} size={btnSize} type='primary' onClick={resetSearch} />
                      </Form.Item>
                    </Flex>
                  </Form>
                ) : null}
                <Flex gap='small'>
                  <AddUserButtonAcl
                    text={'添加'}
                    size={btnSize}
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={createUser}
                  />
                </Flex>
                {/* show table info */}
                <div className='list'>
                  <Table
                    key={1}
                    size={tableSize}
                    bordered={true}
                    title={() => '管理员列表'}
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection
                    }}
                    loading={tableLoading}
                    columns={userColumns}
                    dataSource={userPageList}
                    pagination={{
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
