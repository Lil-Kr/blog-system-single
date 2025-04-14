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
  Table,
  Tag,
  Tooltip,
  Tree,
  TreeDataNode,
  Typography
} from 'antd/lib'
const { Title } = Typography
import { TablePageInfoType } from '@/types/base'
import { aclApi, aclModuleApi } from '@/apis/sys'
import { transformAclModuleTreeExpandeKeys, transformToAclModuleTreeData } from '@/utils/sys/treeUtils'
import { AclModuleModal } from '@/components/modal'
import {
  AclModuleReq,
  AclModuleTableType,
  AclPageListReq,
  SysAclModule,
  AclTableListType
} from '@/types/apis/sys/acl/aclType'
import { SelectOptionType, SelectTreeNodeType } from '@/types/apis'
import { TableRowSelection } from 'antd/es/table/interface'
import { ColumnsType } from 'antd/lib/table'
import AclModal from '@/components/modal/AclModal'
import { useForm } from 'antd/lib/form/Form'
import { useAclModuleStore } from '@/store/global/initDictStore'
import { useDictDetailStore } from '@/store/sys/dictStore'
import { useMessage } from '@/components/message/MessageProvider'
import { Key } from 'antd/lib/table/interface'
import { useAclModalStore, useAclModuleModalStore } from '@/store/sys/aclStore'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { transformAclListToTable } from '@/utils/sys/transform'
import {
  _QUERY_ACL_ACL,
  AddAclBtnAcl,
  AddAclModuleBtnAcl,
  DelAclBtnAcl,
  DelAclModuleBtnAcl,
  EditAclBtnAcl,
  EditAclModuleBtnAcl,
  QueryAclBtnAcl
} from './auth/authButton'
import { usePermissionsStore } from '@/store/sys/authStore'
import { transformToDay } from '@/utils/sys/timeTransform'

const Acl = () => {
  const columnAcl: ColumnsType<AclTableListType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '权限点名',
      width: '8%',
      fixed: 'left',
      render: (_, record) => <Tag color='purple'>{record.name}</Tag>
    },
    {
      key: 'aclModuleName',
      dataIndex: 'aclModuleName',
      title: '权限模块',
      width: '5%',
      fixed: 'left',
      render: (_, record) => <Tag color='magenta'>{record.aclModuleName}</Tag>
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: '权限类型',
      width: '5%',
      render: (_, record) => {
        let color = 'volcano'
        switch (record.type) {
          case 1:
            color = 'volcano'
            break
          case 2:
            color = 'green'
            break
          case 3:
            color = 'blue'
            break
          default:
            color = 'volcano'
        }
        const value = aclTypes?.find(item => item.value === record.type.toString())
        return <Tag color={color}>{value?.label}</Tag>
      }
    },
    {
      key: 'menuName',
      dataIndex: 'menuName',
      title: '菜单名称',
      width: '6%',
      render: (_, record: AclTableListType) => {
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
      width: '8%'
    },
    {
      key: 'btnSign',
      dataIndex: 'btnSign',
      title: '按钮权限点',
      width: '8%'
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
      render: (_, record) => {
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
      width: '10%',
      render: (_, record) => transformToDay(record.createTime)
    },
    {
      key: 'updateTime',
      dataIndex: 'updateTime',
      title: '修改时间',
      width: '10%',
      render: (_, record) => transformToDay(record.createTime)
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
      fixed: 'right',
      render: (_: object, record) => (
        <Flex vertical={false} gap={8}>
          <EditAclBtnAcl
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
            <DelAclBtnAcl size={btnSize} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Flex>
      )
    }
  ]

  const messageApi = useMessage()
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const [form] = useForm()
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 20,
    totalSize: 0
  })
  const [selectedInfo, setSelectedInfo] = useState<SelectOptionType>({} as SelectOptionType)
  const [aclModuleTree, setAclModuleTree] = useState<TreeDataNode[]>([] as TreeDataNode[])
  // 存放权限点列表数据
  const [aclPageList, setAclPageListSource] = useState<AclTableListType[]>([] as AclTableListType[])
  // 设置展开所有树节点
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const { aclTypes, dictStatues } = useDictDetailStore()

  // 权限模块modal状态管理
  const { setAclModuelState } = useAclModuleModalStore()
  const { setAclModalState } = useAclModalStore()
  const { setIsMenu } = useAclModuleStore()
  const { btnSignSet } = usePermissionsStore()

  /**
   * 初始化数据
   */
  useEffect(() => {
    // load org info list
    initAclModuleTreeList()
  }, [])

  /**
   * 初始化权限模块数据
   */
  const initAclModuleTreeList = async () => {
    await retrieveAclModuleTreeList()

    // 加载所有信息
    await retrieveAclPageList({
      status: 0,
      currentPageNum: tablePageInfo.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
  }

  /**
   * 加载权限模块树
   * @returns
   */
  const retrieveAclModuleTreeList = async () => {
    const res = await aclModuleApi.aclModuleTree()
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    const aclModuleTree: TreeDataNode[] = transformToAclModuleTreeData(data)
    setAclModuleTree(aclModuleTree)

    // 设置展开所有树节点
    const expandeKeys: string[] = transformAclModuleTreeExpandeKeys(data)
    setExpandedKeys(expandeKeys)
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
      key: aclModule?.surrogateId,
      surrogateId: aclModule?.surrogateId,
      name: aclModule?.name,
      parentId: aclModule?.parentId,
      parentName: aclModule?.parentName,
      parentAclModuleInfo: {
        value: aclModule?.parentId,
        label: aclModule?.parentId === '0' ? '-' : aclModule?.parentName
      },
      seq: aclModule?.seq,
      status: aclModule?.status,
      remark: aclModule?.remark,
      menuUrl: aclModule?.menuUrl
    }
    // 设置是否需要跳转页面
    if (aclModule?.menuUrl !== '-') {
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

  /**
   * 删除权限模块
   * @param e
   * @returns
   */
  const deleteAclModuleConfirm: PopconfirmProps['onConfirm'] = async e => {
    const res = await aclModuleApi.delete({ surrogateId: selectedInfo.value?.toString() ?? '' })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    aclModuleListCallBack()
  }

  const cancel: PopconfirmProps['onCancel'] = e => {}

  /**
   * 选择树节点时触发
   * @param node
   */
  const selectTreeNode = async (node: SelectTreeNodeType) => {
    const selectKey = node.key.toString()

    /**
     * 加载当前选中的权限模块信息, 并保存到状态中
     */
    const aclModule = await getAclModule({ surrogateId: selectKey })
    setSelectedInfo(prevState => ({
      ...prevState,
      value: node.key.toString(),
      label: node.name,
      selectKeys: [selectKey],
      aclModule: aclModule
    }))

    /**
     * 加载权限点列表数据, 并设置到表格中显示
     */
    await retrieveAclPageList({
      aclModuleId: selectKey,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
  }

  /**
   * 获取单条权限模块信息
   * @param req
   */
  const getAclModule = async (req: AclModuleReq): Promise<SysAclModule> => {
    setTableLoading(true)
    const aclModule = await aclModuleApi.getAclModule({ ...req })
    const { code, data } = aclModule
    if (code !== 200) {
      return {} as SysAclModule
    }
    setTableLoading(false)
    return data
  }

  /**
   * 分页查询权限点列表
   */
  const retrieveAclPageList = async (req: AclPageListReq) => {
    setTableLoading(true)
    const aclPageList = await aclApi.pageList(req)
    const { code, data, msg } = aclPageList
    if (code !== 200) {
      messageApi?.error(msg)
      return []
    }

    const aclList: AclTableListType[] = transformAclListToTable(data.list ?? [])
    setAclPageListSource(aclList)
    // 设置分页信息
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize: req.pageSize,
      currentPageNum: req.currentPageNum,
      totalSize: data.total
    }))
    setTableLoading(false)
  }

  /**
   * 重置btn
   */
  const resetSearch = async () => {
    form.resetFields()
    await retrieveAclPageList({
      ...tablePageInfo,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    setSelectedInfo({})
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<AclTableListType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retrieveAclPageList({ ...values, currentPageNum, pageSize })
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
  const editAcl = (key: string, record: AclTableListType) => {
    const req = {
      ...record,
      key,
      aclModuleId: selectedInfo.value,
      aclModuleSurrogateId: selectedInfo.aclModule?.surrogateId,
      aclModuleName: selectedInfo.label
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
   * 删除权限点
   */
  const deleteItemConfirm = async (record: AclTableListType) => {
    const res = await aclApi.delete({ surrogateId: record.key?.toString() ?? '' })
    if (res.code !== 200) {
      return
    }
    await retrieveAclPageList({
      keyWords: '',
      aclModuleId: selectedInfo.aclModule?.surrogateId,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
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
    retrieveAclPageList({ ...searchParam })
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
    retrieveAclModuleTreeList()
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
                  <Tooltip title='添加权限模块'>
                    <AddAclModuleBtnAcl
                      size={btnSize}
                      color='primary'
                      variant='solid'
                      icon={<PlusOutlined />}
                      onClick={createAclModule}
                    />
                  </Tooltip>
                  <Tooltip title='编辑权限模块'>
                    <EditAclModuleBtnAcl
                      size={btnSize}
                      color='primary'
                      variant='solid'
                      icon={<EditOutlined />}
                      onClick={editAclModule}
                    />
                  </Tooltip>

                  <Tooltip title='删除权限模块'>
                    <Popconfirm
                      title='删除权限模块'
                      description={`确定要删除 [ ${selectedInfo.label} ] 模块么`}
                      onConfirm={deleteAclModuleConfirm}
                      onCancel={cancel}
                      okText='确定'
                      cancelText='取消'
                    >
                      <DelAclModuleBtnAcl size={btnSize} color='red' variant='solid' icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Tooltip>
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
                  // 鼠标悬停出提示
                  // titleRender={item => {
                  //   const title = item.title as React.ReactNode
                  //   return <MemoTooltip title={title}>{title}</MemoTooltip>
                  // }}
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
                {btnSignSet.has(_QUERY_ACL_ACL) ? (
                  <Form form={form}>
                    <Flex gap='small'>
                      <Form.Item name={'keyWords'} label={'关键字'}>
                        <Input size={inputSize} placeholder={'搜索关键字'} />
                      </Form.Item>
                      <Form.Item>
                        <QueryAclBtnAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
                      </Form.Item>
                      <Form.Item>
                        <QueryAclBtnAcl text='重置' size={btnSize} type='primary' onClick={resetSearch} />
                      </Form.Item>
                    </Flex>
                  </Form>
                ) : null}
                <Flex gap='small'>
                  <AddAclBtnAcl text='添加' size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createAcl} />
                </Flex>
                <div className='list'>
                  <Table<AclTableListType>
                    key={1}
                    size={tableSize}
                    title={() => <Title level={5}>{'权限点列表'}</Title>}
                    bordered={true}
                    loading={tableLoading}
                    columns={columnAcl}
                    dataSource={aclPageList}
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection
                    }}
                    scroll={{ x: 'max-content', y: '50vh' }}
                    pagination={{
                      position: ['bottomLeft'],
                      showQuickJumper: false, // 跳转指定页面
                      showSizeChanger: true,
                      hideOnSinglePage: false,
                      pageSizeOptions: [10, 20, 50],
                      onChange: onChangePageInfo,
                      // onShowSizeChange: onShowSizeChange,
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
            retrieveAclPageList({ aclModuleId, currentPageNum: 1, pageSize: tablePageInfo.pageSize })
          }}
        />
      </Flex>
    </div>
  )
}

export default Acl
