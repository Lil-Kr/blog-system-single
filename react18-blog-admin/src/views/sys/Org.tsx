import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, PlusOutlined, SearchOutlined, EditOutlined, AntDesignOutlined } from '@ant-design/icons'
import {
  Tooltip,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  PaginationProps,
  Row,
  Table,
  Tree,
  TreeDataNode,
  Space,
  Popconfirm,
  Tag
} from 'antd/lib'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useForm } from 'antd/lib/form/Form'
import { TableRowSelection } from 'antd/lib/table/interface'
import { OrgTableType, SysOrgPageReq } from '@/types/apis/sys/org/orgType'
import { ColumnsType } from 'antd/es/table'
import { message } from 'antd'
import { IAction, IModalParams, IModalRequestAction, IModalStyle } from '@/types/component/modal'
import OrgModal from '@/components/modal/OrgModal'
import { TablePageInfoType } from '@/types/base'
import { transformToTreeData } from '@/utils/sys/treeUtils'
import { sysOrgApi } from '@/apis/sys'
import { OptionType } from '@/types/apis'
import DirectoryTree from 'antd/lib/tree/DirectoryTree'

/**
 * org page
 */
const Org = () => {
  const columns: ColumnsType<any> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '组织名',
      width: 100
    },
    {
      key: 'parentName',
      dataIndex: 'parentName',
      title: '上级组织',
      width: 100,
      render: (_, record: OrgTableType) => <Tag color='magenta'>{record.parentName}</Tag>
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
      render: (_, record: OrgTableType) => {
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
            statusText = '异常'
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
      render: (_: object, record: OrgTableType) => (
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
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [form] = useForm()
  // 函数式更新值, 不能直接更新
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({ pageSize: 10, totalSize: 0 })
  const [orgTree, setOrgTree] = useState<TreeDataNode[]>([] as TreeDataNode[])
  const [dataSource, setDataSource] = useState<OrgTableType[]>([] as OrgTableType[])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [selectedInfo, setSelectedInfo] = useState<OptionType>({} as OptionType)
  const typeRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      data?: OrgTableType
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

    // 加载组织树
    retrieveOrgTreeList()

    // 加载全部组织信息, 分页
    retrievePageOrgList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })

    setTableLoading(false)
  }

  /**
   *
   * @returns
   */
  const retrieveOrgTreeList = async () => {
    const orgList = await sysOrgApi.retrieveOrgTreeList()
    const { code, data, msg } = orgList
    if (code !== 200) {
      return
    }
    const res = transformToTreeData(data)
    // 加载组织树
    setOrgTree(res)

    // 默认选中根节点
    setSelectedKeys([res[0].key.toString()])
  }

  /**
   * retrieve all org info list by page
   * and set table data
   * @param keyWords
   * @param currentPageNum
   * @param pageSize
   */
  const retrievePageOrgList = async (req: SysOrgPageReq) => {
    const orgPageList = await sysOrgApi.pageOrgList({
      keyWords: req.keyWords,
      currentPageNum: req.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
    const { code, data, msg } = orgPageList
    if (code !== 200) {
      setDataSource([])
      return
    }

    const list: OrgTableType[] = data.list.map(({ surrogateId, ...rest }) => ({
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
   * retrieve org info children list by node key
   */
  const pageChildOrgList = async (node: any) => {
    // 选中当前key
    setSelectedKeys([node.key])
    // 设置选中的组织信息
    setSelectedInfo({ label: node.title, value: node.key })

    // 加载当前组织下的子节点数据
    const orgList = await sysOrgApi.pageChildOrgList({
      surrogateId: node.key,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    const { code, data, msg } = orgList
    if (code !== 200) {
      message.info('没有数据')
      return
    }

    const list: OrgTableType[] = data.list.map(({ surrogateId, ...rest }) => ({
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
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: OrgTableType) => {
    const modalData: OrgTableType = {
      orgInfo: {
        label: record.parentName,
        value: record.parentId
      },
      ...record
    }
    typeRef.current?.open(
      { api: sysOrgApi },
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
  const editItem = (key: string, record: OrgTableType) => {
    const modalData: OrgTableType = {
      orgInfo: {
        label: record.parentName,
        value: record.parentId
      },
      ...record
    }
    typeRef.current?.open(
      { api: sysOrgApi },
      { title: '编辑' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...modalData }
    )
  }

  const deleteItemConfirm = async (record: OrgTableType) => {
    // message.info(record.key)
    const res = await sysOrgApi.delete({ surrogateId: record.key?.toString() ?? '' })
    if (res.code !== 200) {
      return
    }
    retrievePageOrgList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * create new org info
   */
  const createOrg = () => {
    const modalData = {
      orgInfo: selectedInfo
    }
    typeRef.current?.open(
      { api: sysOrgApi },
      { title: '添加' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...modalData }
    )
  }

  /**
   * 搜索
   */
  const search = () => {
    let data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: tablePageInfo.pageSize }
    retrievePageOrgList({ ...searchParam })
  }

  /**
   * 重置btn
   */
  const resetSearch = () => {
    form.resetFields()
    retrievePageOrgList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /** ===================== 分页 ===================== */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retrievePageOrgList({ ...values, currentPageNum, pageSize })
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<OrgTableType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows)
    }
  }

  return (
    <div className='sys-org-warpper' style={{ height: '100%', width: '100%' }}>
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
                onSelect={(key, info) => pageChildOrgList(info.node)}
              />
            </Card>
          </Col>
          <Col span={20} style={{ width: '100%', height: '100%' }}>
            <Card style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}>
              <Flex vertical={true} gap={'small'}>
                <div className='operation-btn'>
                  <Flex vertical={false} gap='small'>
                    <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createOrg}>
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
                      </Flex>
                    </Form>
                    <Button type='dashed' size={btnSize} icon={<AntDesignOutlined />} onClick={resetSearch}>
                      {'全部'}
                    </Button>
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
        <OrgModal
          mRef={typeRef}
          update={() => {
            initInfo()
          }}
        />
      </Flex>
    </div>
  )
}

export default Org
