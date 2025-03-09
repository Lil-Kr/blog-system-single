import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, FolderAddOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  PaginationProps,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  TreeDataNode
} from 'antd/lib'
import DirectoryTree from 'antd/lib/tree/DirectoryTree'
import { TablePageInfoType } from '@/types/base'
import { aclApi, aclModuleApi } from '@/apis/sys'
import { transformToAclModuleTreeData } from '@/utils/sys/treeUtils'
import { AclModuleModal } from '@/components/modal'
import { IAction, IModalParams, IModalRequestAction, IModalStyle } from '@/types/component/modal'
import { AclModalType, AclModuleTableType, AclPageListReq, TableAclListType } from '@/types/apis/sys/acl/aclType'
import { SelectOptionType, SelectTreeNodeType } from '@/types/apis'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { useForm } from 'antd/lib/form/Form'
import { TableRowSelection } from 'antd/es/table/interface'
import { ColumnsType } from 'antd/lib/table'
import { message } from 'antd'
import AclModal from '@/components/modal/AclModal'

const Acl = () => {
  const columns: ColumnsType<TableAclListType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '权限点名',
      width: 100
    },
    {
      key: 'aclModuleName',
      dataIndex: 'aclModuleName',
      title: '所属权限模块',
      width: 100,
      render: (_, record: TableAclListType) => <Tag color='magenta'>{record.aclModuleName}</Tag>
    },
    {
      key: 'url',
      dataIndex: 'url',
      title: 'url',
      width: 50
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: '权限类型',
      width: 50,
      render: (_, record: TableAclListType) => <Tag color='volcano'>{record.aclTypeName}</Tag>
    },
    {
      key: 'seq',
      dataIndex: 'seq',
      title: '顺序',
      width: 50
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: 50,
      render: (_, record: TableAclListType) => {
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
      render: (_: object, record: TableAclListType) => (
        <Space size='middle'>
          <Button
            name='look'
            type='primary'
            shape='circle'
            icon={<SearchOutlined />}
            onClick={() => lookItem(record.key ?? '', record)}
          />
          <Button
            name='edit'
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editItem(record.key ?? '', record)}
          />
          <Popconfirm
            title='删除标签'
            description={`确定要删除 [${record.name}] 这个这个组织吗?`}
            onConfirm={() => deleteItemConfirm(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <Button name='delete' type='primary' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const MemoTooltip = Tooltip || React.memo(Tooltip)
  const [btnSize] = useState<SizeType>('middle')
  const [form] = useForm()
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({ pageSize: 10, totalSize: 0 })
  const [selectedInfo, setSelectedInfo] = useState<SelectOptionType>({} as SelectOptionType)
  const [aclModuleTree, setAclModuleTree] = useState<TreeDataNode[]>([] as TreeDataNode[])
  const [dataSource, setDataSource] = useState<TableAclListType[]>([] as TableAclListType[])
  const aclModuleRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      data?: AclModuleTableType
    ) => void
  }>()

  const aclRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      data?: AclModalType
    ) => void
  }>()

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

    // 加载权限模块树
    retrieveAclModuleTreeList()

    // // 加载全部权限模块, 分页
    retrieveAclPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })

    setTableLoading(false)
  }

  /**
   * 加载权限模块树
   * @returns
   */
  const retrieveAclModuleTreeList = async () => {
    const aclModuleList = await aclModuleApi.aclModuleTree()
    const { code, data, msg } = aclModuleList
    if (code !== 200) {
      return
    }
    const res = transformToAclModuleTreeData(data)

    // 加载权限模块树
    setAclModuleTree(res)

    // 默认选中Tree组件的根节点
    const selectKey = res.length > 0 ? res[0].key.toString() : ''
    const label = res.length > 0 ? res[0].title ?? '' : ''
    setSelectedInfo({ value: selectKey, label: label.toString(), selectKeys: [selectKey] })

    // 加载权限点列表
    retrieveAclPageList({
      aclModuleId: selectKey,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
  }

  /**
   * create new acl module info
   */
  const createAclModule = async () => {
    const aclModule = await aclModuleApi.getAclModule({ surrogateId: selectedInfo.value ?? '' })
    const { data } = aclModule
    aclModuleRef.current?.open(
      { api: aclModuleApi },
      { title: '添加权限模块' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { surrogateId: data.surrogateId, name: data.name }
    )
  }

  /**
   * edit
   */
  const editAclModule = async () => {
    const aclModule = await aclModuleApi.getAclModule({ surrogateId: selectedInfo.value ?? '' })
    const { data } = aclModule

    const req: AclModuleTableType = {
      key: data.surrogateId,
      surrogateId: data.surrogateId,
      name: data.name,
      parentId: data.parentId,
      parentName: data.parentName,
      parentAclModuleInfo: {
        value: data.parentId,
        label: data.parentId === '0' ? '-' : data.parentName
      },
      seq: data.seq,
      status: data.status,
      remark: data.remark
    }
    aclModuleRef.current?.open(
      { api: aclModuleApi },
      { title: '编辑权限模块' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...req }
    )
  }

  /**
   * 选择树节点时触发
   * @param node
   */
  const selectTreeNode = async (node: SelectTreeNodeType) => {
    setSelectedInfo(prevState => ({
      value: node.key.toString(),
      label: node.name,
      selectKeys: [node.key.toString()]
    }))

    retrieveAclPageList({
      aclModuleId: node.key.toString(),
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
  }

  /**
   * 分页查询权限点列表
   */
  const retrieveAclPageList = async (req: AclPageListReq) => {
    const aclPageList = await aclApi.pageList(req)
    const { code, data, msg } = aclPageList
    if (code !== 200) {
      message.error(msg)
      return
    }

    const aclList: TableAclListType[] = data.list.map(
      ({ surrogateId, aclModuleName, creatorName, operatorName, nickName, type, aclTypeName, ...rest }) => ({
        key: surrogateId,
        surrogateId,
        aclModuleName,
        creatorName,
        operatorName,
        nickName,
        type,
        aclTypeName,
        ...rest
      })
    )
    setDataSource(aclList)
    setTablePageInfo(prevState => ({
      ...prevState,
      totalSize: data.total
    }))
  }

  /**
   * 重置btn
   */
  const resetSearch = () => {
    form.resetFields()
  }

  const allSearch = () => {
    form.resetFields()
    retrieveAclPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<TableAclListType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
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

  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retrieveAclPageList({ ...values, currentPageNum, pageSize })
  }

  /**
   * create new org info
   */
  const createAcl = () => {
    aclRef.current?.open(
      { api: aclApi },
      { title: '添加权限点' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { aclModuleId: selectedInfo.value, aclModuleName: selectedInfo.label }
    )
  }

  const editItem = (key: string, record: TableAclListType) => {
    aclRef.current?.open(
      { api: aclApi },
      { title: '编辑权限点' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      {
        key,
        aclModuleId: selectedInfo.value,
        aclModuleName: selectedInfo.label,
        aclTypeId: record.aclTypeId,
        aclTypeName: record.aclTypeName,
        name: record.name,
        url: record.url,
        seq: record.seq,
        status: record.status,
        remark: record.remark
      }
    )
  }

  const lookItem = (key: string, record: TableAclListType) => {
    aclRef.current?.open(
      { api: aclApi },
      { title: '查看权限点' },
      { action: 'look', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      {
        key,
        aclModuleId: selectedInfo.value,
        aclModuleName: selectedInfo.label,
        aclTypeId: record.aclTypeId,
        aclTypeName: record.aclTypeName,
        name: record.name,
        url: record.url,
        seq: record.seq,
        status: record.status,
        remark: record.remark
      }
    )
  }

  const deleteItemConfirm = async (record: TableAclListType) => {
    const res = await aclApi.delete({ surrogateId: record.key?.toString() ?? '' })
    if (res.code !== 200) {
      return
    }
    retrieveAclPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 搜索
   */
  const search = () => {
    let data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: tablePageInfo.pageSize }
    retrieveAclPageList({ ...searchParam })
  }

  return (
    <div className='sys-acl-module-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        <Row gutter={4} style={{ height: '100%' }}>
          <Col span={4} style={{ width: '100%', height: '100%' }}>
            {/* 当Tree向右展开超出右边界时, 出现水平滚动条 */}
            <Card style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}>
              <Flex vertical gap={'small'}>
                <Flex vertical={false} gap={'middle'}>
                  <Button
                    size={'small'}
                    color='primary'
                    variant='solid'
                    icon={<FolderAddOutlined />}
                    onClick={createAclModule}
                  />
                  <Button size={'small'} color='pink' variant='solid' icon={<EditOutlined />} onClick={editAclModule} />
                </Flex>
                <Divider plain>{'权限模块'}</Divider>
                <DirectoryTree
                  showLine={true}
                  showIcon={false}
                  checkable={false}
                  blockNode={true} // 是否节点占据一行
                  treeData={aclModuleTree}
                  selectedKeys={selectedInfo.selectKeys}
                  // autoExpandParent={false}
                  // defaultExpandAll={true}
                  // expandedKeys={expandedKeys} // （受控）展开指定的树节点
                  // defaultExpandedKeys={[]}
                  // defaultExpandParent={true}
                  // onExpand={onExpand}
                  titleRender={item => {
                    const title = item.title as React.ReactNode
                    return <MemoTooltip title={title}>{title}</MemoTooltip>
                  }}
                  onSelect={(key, info) =>
                    selectTreeNode({
                      key: info.node.key.toString(),
                      name: info.node.title as string
                    } as SelectTreeNodeType)
                  }
                />
              </Flex>
            </Card>
          </Col>
          <Col span={20} style={{ width: '100%', height: '100%' }}>
            <Card style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}>
              <Flex vertical={true} gap={'small'}>
                <div className='operation-btn'>
                  <Flex vertical={false} gap='small'>
                    <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createAcl}>
                      {'新增'}
                    </Button>
                    <Form form={form}>
                      <Flex gap='small'>
                        <Form.Item name={'keyWords'} label={'搜索关键字'}>
                          <Input placeholder={'搜索关键字'} />
                        </Form.Item>
                        <Form.Item>
                          <Button icon={<SearchOutlined />} type='primary' onClick={search} />
                        </Form.Item>
                        <Form.Item>
                          <Button type='primary' onClick={resetSearch}>
                            {'置空'}
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button type='primary' onClick={allSearch}>
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
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection
                    }}
                    loading={tableLoading}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
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
        <AclModuleModal
          mRef={aclModuleRef}
          update={() => {
            initInfo()
          }}
        />
        <AclModal
          mRef={aclRef}
          update={() => {
            // 只需要渲染权限点列表即可
            retrieveAclPageList({ currentPageNum: 1, pageSize: tablePageInfo.pageSize })
          }}
        />
      </Flex>
    </div>
  )
}

export default Acl
