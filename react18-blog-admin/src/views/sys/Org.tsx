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
  Space,
  Popconfirm,
  Tag,
  Tree
} from 'antd/lib'
import { useForm } from 'antd/lib/form/Form'
import { Key, TableRowSelection } from 'antd/lib/table/interface'
import { OrgTableType, SysOrgPageReq } from '@/types/apis/sys/org/orgType'
import { ColumnsType } from 'antd/es/table'
import { IAction, IModalParams, IModalRequestAction, IModalStyle } from '@/types/component/modal'
import OrgModal from '@/components/modal/OrgModal'
import { transformOrgTreeExpandeKeys, transformToTreeData } from '@/utils/sys/treeUtils'
import { orgApi } from '@/apis/sys'
import { useOrgModalStore, useOrgStore } from '@/store/sys/orgStore'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { transformOrgInfoToSeletor } from '@/utils/sys/transform'
import { OptionType } from '@/types/apis'

/**
 * org page
 */
const Org = () => {
  // 组织信息列表
  const orgColumns: ColumnsType<any> = [
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
      render: (_, record: OrgTableType) => {
        let color = 'magenta'
        let text = record.parentName
        if (!record.parentName) {
          text = '-'
          color = 'geekblue'
        }
        return <Tag color={color}>{text}</Tag>
      }
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
            title='删除组织'
            description={`确定要删除 [${record.name}] 这个组织吗?`}
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
  const [form] = useForm()
  const { btnSize, tableSize } = useGlobalStyleStore()
  const {
    orgTree,
    orgPageList,
    setOrgPageList,
    setOrgTree,
    tablePageInfo,
    setTablePageInfo,
    expandedKeys,
    setExpandedKeys,
    selectedKeys,
    setSelectedKeys,
    selectorInfo,
    setSelectorInfo,
    tableLoading,
    setTableLoading
  } = useOrgStore()

  const { setOrgModalState } = useOrgModalStore()

  const orgRef = useRef<{
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
    const orgList = await orgApi.retrieveOrgTreeList()
    const { code, data, msg } = orgList
    if (code !== 200) {
      return
    }
    const res = transformToTreeData(data)
    // 加载组织树
    setOrgTree(res)

    // 默认展开所有节点
    const expandeKeys: string[] = transformOrgTreeExpandeKeys(data)
    setExpandedKeys(expandeKeys)

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
    const orgPageList = await orgApi.pageOrgList({
      keyWords: req.keyWords,
      currentPageNum: req.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
    const { code, data } = orgPageList
    if (code !== 200) {
      setOrgPageList([])
      return
    }

    const list: OrgTableType[] = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      ...rest
    }))
    setOrgPageList(list)
    setTablePageInfo({ ...tablePageInfo, totalSize: data.total })
  }

  /**
   * retrieve org info children list by node key
   */
  const selectTreeNode = async (node: any) => {
    // 选中当前key
    setSelectedKeys([node.key])
    // 设置选中的组织信息
    setSelectorInfo({ label: node.title, value: node.key })

    // 加载当前组织下的子节点数据
    const orgList = await orgApi.pageChildOrgList({
      surrogateId: node.key,
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    const { code, data, msg } = orgList
    if (code !== 200) {
      return
    }

    const list: OrgTableType[] = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      ...rest
    }))
    setOrgPageList(list)

    setTablePageInfo({ ...tablePageInfo, totalSize: data.total })
  }

  /**
   * create new org info
   */
  const createOrg = async () => {
    const req: OrgTableType = {
      orgInfo: selectorInfo
    }
    let orgSelectorInfo: OptionType[] = []
    const res = await orgApi.orgAllList({ status: 0 })
    const { code, data, msg } = res
    if (code !== 200) {
      orgSelectorInfo = []
    } else {
      orgSelectorInfo = transformOrgInfoToSeletor(data)
    }

    setOrgModalState({
      api: orgApi,
      title: '添加组织信息',
      action: 'create',
      openModal: true,
      modalStyle: { maxWidth: '40vw' },
      inputDisabled: false,
      req: req,
      orgSelectorInfo
    })
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = async (key: string, record: OrgTableType) => {
    const req: OrgTableType = {
      orgInfo: {
        label: record.parentName,
        value: record.parentId
      },
      ...record
    }

    let orgSelectorInfo: OptionType[] = []
    const res = await orgApi.orgAllList({ status: 0 })
    const { code, data, msg } = res
    if (code !== 200) {
      orgSelectorInfo = []
    } else {
      orgSelectorInfo = transformOrgInfoToSeletor(data)
    }
    setOrgModalState({
      api: orgApi,
      title: '编辑组织信息',
      action: 'edit',
      openModal: true,
      modalStyle: { maxWidth: '40vw' },
      inputDisabled: false,
      req: req,
      orgSelectorInfo: []
    })
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: OrgTableType) => {
    const req: OrgTableType = {
      orgInfo: {
        label: record.parentName,
        value: record.parentId
      },
      ...record
    }

    setOrgModalState({
      api: orgApi,
      title: '查看组织信息',
      action: 'look',
      openModal: true,
      modalStyle: { maxWidth: '40vw' },
      inputDisabled: true,
      req: req,
      orgSelectorInfo: []
    })
  }

  const deleteItemConfirm = async (record: OrgTableType) => {
    const res = await orgApi.delete({ surrogateId: record.key?.toString() ?? '' })
    if (res.code !== 200) {
      return
    }
    retrievePageOrgList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
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
    setTablePageInfo({ ...tablePageInfo, pageSize })
  }

  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retrievePageOrgList({ ...values, currentPageNum, pageSize })
  }

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<OrgTableType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  const handleExpand = (key: Key[]) => {
    setExpandedKeys(key)
  }

  return (
    <div className='sys-org-warpper' style={{ height: '100%', width: '100%' }}>
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
                onSelect={(key, info) => selectTreeNode(info.node)}
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
                    size={tableSize}
                    key={1}
                    bordered={true}
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection
                    }}
                    loading={tableLoading}
                    columns={orgColumns}
                    dataSource={orgPageList}
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
        <OrgModal
          mRef={orgRef}
          update={() => {
            initInfo()
          }}
        />
      </Flex>
    </div>
  )
}

export default Org
