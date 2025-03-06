import React, { useEffect, useRef, useState } from 'react'
import {
  CarryOutOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  AntDesignOutlined
} from '@ant-design/icons'
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
import { BaseModal } from '@/components/modal'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useForm } from 'antd/lib/form/Form'
import { TableRowSelection } from 'antd/lib/table/interface'
import { StringifyOptions } from 'querystring'
import { SysOrg, SysOrgPageReq, SysOrgResp } from '@/types/apis/sys/org/org'
import { EventDataNode } from 'antd/lib/tree'
import { ColumnsType } from 'antd/es/table'
import { message } from 'antd'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import OrgModal, { OptionType } from '@/components/modal/OrgModal'
import sysOrgApi from '@/apis/sys/org'

export interface OrgTableType {
  key: string
  id: string
  number: string
  name: string
  seq: number
  status: number
  remark: string
  createTime: string
  updateTime: string
  parentId: string
  parentName: string
  operatorName: string
  parentSurrogateId?: OptionType
}

const rowSelection: TableRowSelection<OrgTableType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
const MemoTooltip = Tooltip || React.memo(Tooltip)

/**
 * org page
 */
const Org = () => {
  const columns: ColumnsType<any> = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: '10%'
    },
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
      width: 100
    },
    {
      key: 'seq',
      dataIndex: 'seq',
      title: '位置',
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
            onClick={() => lookItem(record.key, record)}
          />
          <Button
            name='edit'
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editItem(record.key, record)}
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

  const [btnSize] = useState<SizeType>('middle')
  const [form] = useForm()
  const [checkStrictly, setCheckStrictly] = useState(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalSize, setTotalSize] = useState<number>(0)
  const [orgTree, setOrgTree] = useState<TreeDataNode[]>([] as TreeDataNode[])
  const [dataSource, setDataSource] = useState<OrgTableType[]>([] as OrgTableType[])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
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
   * 搜索
   */
  const search = () => {
    let data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: pageSize }
    retrievePageOrgList({ ...searchParam })
  }

  /**
   *
   */
  const resetSearch = () => {
    form.resetFields()
    retrievePageOrgList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    const values = form.getFieldsValue()
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    const values = form.getFieldsValue()
  }

  /**
   * 初始化数据
   */
  useEffect(() => {
    // load org info list
    retrieveOrgList()
  }, [])

  /**
   * init
   */
  const retrieveOrgList = async () => {
    // 加载组织树
    const orgList = await sysOrgApi.retrieveOrgList()
    const { code, data, msg } = orgList
    if (code !== 200) {
      return
    }
    const res = transformToTreeData(data)
    setOrgTree(res)

    // 默认选中根节点
    setSelectedKeys([res[0].key.toString()])

    // 加载全部组织信息, 分页
    retrievePageOrgList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }

  /**
   * retrieve all org info list by page
   * @param keyWords
   * @param currentPageNum
   * @param pageSize
   */
  const retrievePageOrgList = async (req: SysOrgPageReq) => {
    const orgPageList = await sysOrgApi.pageOrgList({
      keyWords: req.keyWords,
      currentPageNum: req.currentPageNum,
      pageSize: pageSize
    })
    const { code, data, msg } = orgPageList
    if (code !== 200) {
      setDataSource([])
    } else {
      const list: OrgTableType[] = data.list.map(({ surrogateId, ...rest }) => ({
        key: surrogateId,
        ...rest
      }))
      setDataSource(list)
    }
  }

  /**
   * transform org tree data
   * @param data
   * @returns
   */
  const transformToTreeData = (data: SysOrgResp[]): TreeDataNode[] => {
    return data.map(item => {
      const children = item.orgList ? transformToTreeData(item.orgList) : [] // 递归处理子节点
      return {
        key: item.surrogateId, // 使用 surrogateId 作为 key
        title: item.name, // 使用 name 作为 title
        icon: <CarryOutOutlined />, // 使用 CarryOutOutlined 作为图标
        children: children.length > 0 ? children : undefined // 如果没有子节点则不包含 children 属性
      }
    })
  }

  /**
   * retrieve org info children list by node key
   */
  const pageChildOrgList = async (key: string) => {
    // 选中当前key
    setSelectedKeys([key])

    // 加载当前组织下的子节点数据
    const orgList = await sysOrgApi.pageChildOrgList({
      surrogateId: key,
      currentPageNum: 1,
      pageSize: pageSize
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
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: OrgTableType) => {
    const modalData: OrgTableType = {
      parentSurrogateId: {
        label: record.parentName,
        value: record.parentId
      },
      ...record
    }
    typeRef.current?.open(
      { api: sysOrgApi },
      { title: '编辑' },
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
      parentSurrogateId: {
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

  const deleteItemConfirm = (record: OrgTableType) => {}

  const createOrg = () => {
    typeRef.current?.open(
      { api: sysOrgApi },
      { title: '添加' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } }
    )
  }

  return (
    <div className='blog-category-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        <Row gutter={4} style={{ height: '100%' }}>
          <Col span={4} style={{ width: '100%', height: '100%' }}>
            {/* 当Tree向右展开超出右边界时, 出现水平滚动条 */}
            <Card
              bordered={false}
              style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}
            >
              <Tree
                showLine={true}
                showIcon={false}
                checkable={false}
                blockNode={true} // 是否节点占据一行
                treeData={orgTree}
                selectedKeys={selectedKeys}
                // defaultExpandAll={true}
                // expandedKeys={expandedKeys} // （受控）展开指定的树节点
                // defaultExpandedKeys={[]}
                // defaultExpandParent={true}
                // onExpand={onExpand}
                titleRender={item => {
                  const title = item.title as React.ReactNode
                  return <MemoTooltip title={title}>{title}</MemoTooltip>
                }}
                onSelect={(key, info) => pageChildOrgList(info.node.key.toString())}
              />
            </Card>
          </Col>
          <Col span={20}>
            <Card bordered={true} style={{ textAlign: 'center', height: '100%' }}>
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
                    <Button
                      type='dashed'
                      size={btnSize}
                      icon={<AntDesignOutlined />}
                      onClick={() => retrievePageOrgList({ keyWords: '', currentPageNum: 1, pageSize })}
                    >
                      {'全部'}
                    </Button>
                  </Flex>
                </div>
                {/* show table info */}
                <div className='list'>
                  <Table
                    key={1}
                    columns={columns}
                    rowSelection={{ ...rowSelection }}
                    dataSource={dataSource}
                    pagination={{
                      hideOnSinglePage: false,
                      pageSizeOptions: [10, 20, 50],
                      onChange: onChange,
                      onShowSizeChange: onShowSizeChange,
                      showSizeChanger: true,
                      pageSize: pageSize,
                      total: totalSize
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
            retrieveOrgList()
          }}
        />
      </Flex>
    </div>
  )
}

export default Org
