import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
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
  PopconfirmProps,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Tree,
  TreeDataNode,
  Typography
} from 'antd/lib'
import { TablePageInfoType } from '@/types/base'
import { aclApi, aclModuleApi } from '@/apis/sys'
import { transformAclModuleTreeExpandeKeys, transformToAclModuleTreeData } from '@/utils/sys/treeUtils'
import { AclModuleModal } from '@/components/modal'
import {
  AclModuleReq,
  AclModuleTableType,
  AclPageListReq,
  SysAclModule,
  TableAclListType
} from '@/types/apis/sys/acl/aclType'
import { SelectOptionType, SelectTreeNodeType } from '@/types/apis'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { TableRowSelection } from 'antd/es/table/interface'
import { ColumnsType } from 'antd/lib/table'
import AclModal from '@/components/modal/AclModal'
import { useForm } from 'antd/lib/form/Form'
import { useAclModuleStore, useDictDetailStore } from '@/store/global/initDictStore'
const { Title } = Typography
import { useMessage } from '@/components/message/MessageProvider'
import { Key } from 'antd/lib/table/interface'
import { useAclModalStore, useAclModuleModalStore } from '@/store/sys/aclStore'
import { useGlobalStyleStore } from '@/store/global/globalStore'

const Acl = () => {
  const columnAcl: ColumnsType<TableAclListType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '权限点名',
      width: '8%',
      render: (_, record: TableAclListType) => <Tag color='purple'>{record.name}</Tag>
    },
    {
      key: 'aclModuleName',
      dataIndex: 'aclModuleName',
      title: '权限模块',
      width: '5%',
      render: (_, record: TableAclListType) => <Tag color='magenta'>{record.aclModuleName}</Tag>
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: '权限类型',
      width: '5%',
      render: (_, record: TableAclListType) => {
        const value = aclTypes?.find(item => item.value === record.type.toString())
        return <Tag color='volcano'>{value?.label}</Tag>
      }
    },
    {
      key: 'menuName',
      dataIndex: 'menuName',
      title: '菜单名称',
      width: '8%',
      render: (_, record: TableAclListType) => {
        if (record.menuName.startsWith('-')) {
          return record.menuName
        } else {
          return <Tag color='geekblue'>{record.menuName}</Tag>
        }
      }
    },
    {
      key: 'menuUrl',
      dataIndex: 'menuUrl',
      title: '路由url',
      width: '7%'
    },
    {
      key: 'btnSign',
      dataIndex: 'btnSign',
      title: '按钮权限点',
      width: '7%'
    },
    {
      key: 'url',
      dataIndex: 'url',
      title: '服务端API',
      width: '10%'
    },
    {
      key: 'seq',
      dataIndex: 'seq',
      title: '顺序',
      width: '5%'
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: '5%',
      render: (_, record: TableAclListType) => {
        // 默认颜色
        let tagColor = 'green'
        const statusType = dictStatues.find(item => item.value === record.status.toString())
        // 根据状态设置不同的颜色和文本
        switch (statusType?.value) {
          case '0':
            tagColor = 'green'
            break
          case '1':
            tagColor = 'red'
            break
          default:
            tagColor = 'gray'
            break
        }
        return (
          <Tag key={record.key} color={tagColor}>
            {statusType?.label}
          </Tag>
        )
      }
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: '10%'
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
      width: '5%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '5%',
      render: (_: object, record: TableAclListType) => (
        <Space size={tableSize}>
          <Button
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editAcl(record.key ?? '', record)}
          />
          <Popconfirm
            title='删除权限点'
            description={`确定要删除 [${record.name}] 这个权限点吗?`}
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

  const messageApi = useMessage()
  const MemoTooltip = Tooltip || React.memo(Tooltip)
  const { btnSize, tableSize } = useGlobalStyleStore()
  const [form] = useForm()
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })
  const [selectedInfo, setSelectedInfo] = useState<SelectOptionType>({} as SelectOptionType)
  const [aclModuleTree, setAclModuleTree] = useState<TreeDataNode[]>([] as TreeDataNode[])
  // 存放权限点列表数据
  const [aclDataSource, setAclDataSource] = useState<TableAclListType[]>([] as TableAclListType[])
  // 设置展开所有树节点
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const { aclTypes, dictStatues } = useDictDetailStore()

  // 权限模块modal状态管理
  const { setAclModuelState } = useAclModuleModalStore()
  const { setAclModalState } = useAclModalStore()
  const { setIsMenu } = useAclModuleStore()

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
  const initInfo = () => {
    setTableLoading(true)

    // 加载权限模块树
    initAclModuleTreeList()

    setTableLoading(false)
  }

  /**
   * 初始化权限模块数据
   */
  const initAclModuleTreeList = async () => {
    const aclModuleTreeData: Promise<TreeDataNode[]> = retrieveAclModuleTreeList()
    const aclModuleList = await aclModuleTreeData
    // 存入权限模块树数据
    setAclModuleTree(aclModuleList)

    const selectKey = aclModuleList.length > 0 ? aclModuleList[0]?.key.toString() : ''
    const label = aclModuleList.length > 0 ? aclModuleList[0]?.title ?? '' : ''

    const aclList = await retrieveAclPageList({
      aclModuleId: selectKey,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    setAclDataSource(aclList)

    /**
     * 加载当前选中的权限模块信息, 并保存到状态中
     */
    const aclModule = await getAclModule({ surrogateId: selectKey })

    /**
     * 首次渲染设置
     */
    setSelectedInfo({ value: selectKey, label: label.toString(), selectKeys: [selectKey], aclModule: aclModule })
  }

  /**
   * 加载权限模块树
   * @returns
   */
  const retrieveAclModuleTreeList = async (): Promise<TreeDataNode[]> => {
    const aclModuleList = await aclModuleApi.aclModuleTree()
    const { code, data, msg } = aclModuleList
    if (code !== 200) {
      return []
    }
    const res: TreeDataNode[] = transformToAclModuleTreeData(data)

    // 设置展开所有树节点
    const expandeKeys: string[] = transformAclModuleTreeExpandeKeys(data)
    setExpandedKeys(expandeKeys)
    return res
  }

  /**
   * create new acl module info
   */
  const createAclModule = () => {
    const initData = {
      parentAclModuleInfo: {
        label: selectedInfo.aclModule?.name,
        value: selectedInfo.aclModule?.surrogateId
      }
    }
    setAclModuelState({
      api: aclModuleApi,
      title: '添加权限模块',
      action: 'create',
      openModal: true,
      modalStyle: { maxWidth: '100vw' },
      inputDisabled: false,
      data: initData
    })
  }

  /**
   * edit acl module
   */
  const editAclModule = () => {
    const aclModule = selectedInfo.aclModule
    const req: AclModuleTableType = {
      key: aclModule.surrogateId,
      surrogateId: aclModule.surrogateId,
      name: aclModule.name,
      parentId: aclModule.parentId,
      parentName: aclModule.parentName,
      parentAclModuleInfo: {
        value: aclModule.parentId,
        label: aclModule.parentId === '0' ? '-' : aclModule.parentName
      },
      seq: aclModule.seq,
      status: aclModule.status,
      remark: aclModule.remark,
      menuUrl: aclModule.menuUrl
    }
    // 设置是否需要跳转页面
    if (aclModule.menuUrl !== '-') {
      setIsMenu(true)
    } else {
      setIsMenu(false)
    }
    setAclModuelState({
      api: aclModuleApi,
      title: '编辑权限模块',
      action: 'edit',
      openModal: true,
      modalStyle: { width: '40vw' },
      inputDisabled: false,
      data: req
    })
  }

  const deleteAclModuleConfirm: PopconfirmProps['onConfirm'] = async e => {
    const res = await aclModuleApi.delete({ surrogateId: selectedInfo.value?.toString() ?? '' })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    aclModuleListCallBack()
  }

  const cancel: PopconfirmProps['onCancel'] = e => {}

  /**
   * 选择树节点时触发
   * @param node
   */
  const selectTreeNode = async (node: SelectTreeNodeType) => {
    const selectKey = node.key.toString()

    const aclTableList = retrieveAclPageList({
      aclModuleId: selectKey,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    /**
     * 加载权限点列表数据, 并设置到表格中显示
     */
    setAclDataSource(await aclTableList)

    /**
     * 加载当前选中的权限模块信息, 并保存到状态中
     * // todo 优化此处代码, 减少不必要的请求
     */
    const aclModule = await getAclModule({ surrogateId: selectKey })

    setSelectedInfo(prevState => ({
      ...prevState,
      value: node.key.toString(),
      label: node.name,
      selectKeys: [selectKey],
      aclModule: aclModule
    }))
  }

  /**
   * 获取单挑权限模块信息
   * @param req
   */
  const getAclModule = async (req: AclModuleReq): Promise<SysAclModule> => {
    const aclModule = await aclModuleApi.getAclModule({ ...req })
    const { code, msg, data } = aclModule
    if (code !== 200) {
      return {} as SysAclModule
    }
    return data
  }

  /**
   * 分页查询权限点列表
   */
  const retrieveAclPageList = async (req: AclPageListReq): Promise<TableAclListType[]> => {
    const aclPageList = await aclApi.pageList(req)
    const { code, data, msg } = aclPageList
    if (code !== 200) {
      messageApi?.error(msg)
      return []
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
    // 设置分页信息
    setTablePageInfo(prevState => ({
      ...prevState,
      totalSize: data.total
    }))
    return aclList
  }

  /**
   * 重置btn
   */
  const resetSearch = async () => {
    form.resetFields()
    const aclList = retrieveAclPageList({
      aclModuleId: selectedInfo.aclModule.surrogateId,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    setAclDataSource(await aclList)
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

  const onChangePageInfo: PaginationProps['onChange'] = async (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    const aclList = retrieveAclPageList({ ...values, currentPageNum, pageSize })
    setAclDataSource(await aclList)
  }

  /**
   * create new acl info
   */
  const createAcl = () => {
    const req = {
      aclModuleId: selectedInfo.value,
      aclModuleName: selectedInfo.label
    }
    setAclModalState({
      api: aclApi,
      title: '添加权限点',
      action: 'create',
      modalStyle: { maxWidth: '100vw' },
      openModal: true,
      inputDisabled: false,
      isMenu: false,
      isBtn: true,
      data: req
    })
  }

  /**
   * 编辑权限点
   * @param key
   * @param record
   */
  const editAcl = (key: string, record: TableAclListType) => {
    const req = {
      key,
      aclModuleId: selectedInfo.value,
      aclModuleSurrogateId: selectedInfo.aclModule.surrogateId,
      aclModuleName: selectedInfo.label,
      type: record.type,
      aclTypeName: record.aclTypeName,
      name: record.name,
      url: record.url,
      menuName: record.menuName,
      menuUrl: record.menuUrl,
      btnSign: record.btnSign,
      seq: record.seq,
      status: record.status,
      remark: record.remark
    }
    setAclModalState({
      api: aclApi,
      title: '编辑权限点',
      action: 'edit',
      modalStyle: { maxWidth: '100vw' },
      openModal: true,
      inputDisabled: false,
      isMenu: false,
      isBtn: false,
      data: req
    })
  }

  /**
   *
   */
  const deleteItemConfirm = async (record: TableAclListType) => {
    const res = await aclApi.delete({ surrogateId: record.key?.toString() ?? '' })
    if (res.code !== 200) {
      return
    }
    const aclList = retrieveAclPageList({
      keyWords: '',
      aclModuleId: selectedInfo.aclModule.surrogateId,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    // 删除成功后刷新数据
    setAclDataSource(await aclList)
  }

  /**
   * 搜索
   */
  const search = async () => {
    let data = form.getFieldsValue()
    const searchParam = {
      ...data,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize,
      aclModuleId: selectedInfo.aclModule
    }
    const aclList = retrieveAclPageList({ ...searchParam })
    setAclDataSource(await aclList)
  }

  /**
   * 控制展开后收缩树节点
   * @param expandedKeysValue
   */
  const handleExpand = (expandedKeysValue: Key[]) => {
    setExpandedKeys(expandedKeysValue) // 更新展开的节点
  }

  /**
   * 新增/编辑之后回调
   */
  const aclModuleListCallBack = async () => {
    const aclModuleTreeData: Promise<TreeDataNode[]> = retrieveAclModuleTreeList()
    const aclModuleList = await aclModuleTreeData

    // 存入权限模块树数据
    setAclModuleTree(aclModuleList)
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
                    size={btnSize}
                    color='primary'
                    variant='solid'
                    icon={<PlusOutlined />}
                    onClick={createAclModule}
                  />
                  <Button
                    size={btnSize}
                    color='primary'
                    variant='solid'
                    icon={<EditOutlined />}
                    onClick={editAclModule}
                  />

                  <Popconfirm
                    title='删除权限模块'
                    description={`确定要删除 [ ${selectedInfo.label} ] 模块么`}
                    onConfirm={deleteAclModuleConfirm}
                    onCancel={cancel}
                    okText='确定'
                    cancelText='取消'
                  >
                    <Button size={btnSize} color='red' variant='solid' icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Flex>
                <Divider plain>{'权限模块'}</Divider>
                <Tree
                  showLine={true}
                  showIcon={false}
                  checkable={false}
                  blockNode={true} // 是否节点占据一行
                  treeData={aclModuleTree}
                  selectedKeys={selectedInfo.selectKeys}
                  expandedKeys={expandedKeys}
                  // autoExpandParent={false}
                  // defaultExpandAll={true}
                  // defaultExpandedKeys={[]}
                  // defaultExpandParent={true}
                  onExpand={handleExpand} // 控制展开后收缩树节点
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
                      {'添加'}
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
                            {'重置'}
                          </Button>
                        </Form.Item>
                      </Flex>
                    </Form>
                  </Flex>
                </div>
                {/* show table info */}
                <div className='list'>
                  <Table<TableAclListType>
                    key={1}
                    size={tableSize}
                    title={() => <Title level={5}>{'权限点列表'}</Title>}
                    bordered={true}
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection
                    }}
                    loading={tableLoading}
                    columns={columnAcl}
                    dataSource={aclDataSource}
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
        <AclModuleModal
          update={() => {
            aclModuleListCallBack()
          }}
        />
        <AclModal
          update={async ({ aclModuleId }) => {
            // 只需要渲染权限点列表即可
            const aclList = retrieveAclPageList({ aclModuleId, currentPageNum: 1, pageSize: tablePageInfo.pageSize })
            setAclDataSource(await aclList)
          }}
        />
      </Flex>
    </div>
  )
}

export default Acl
