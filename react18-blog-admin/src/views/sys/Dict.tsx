import React, { useEffect, useRef, useState } from 'react'
import { TablePageInfoType } from '@/types/base'
import {
  AntDesignOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined
} from '@ant-design/icons'
import {
  Button,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  PaginationProps,
  Popconfirm,
  Space,
  Typography
} from 'antd/lib'
import Table, { ColumnsType, TableProps } from 'antd/lib/table'
import { useForm } from 'antd/lib/form/Form'
import { TableRowSelection } from 'antd/es/table/interface'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import DictModal from '@/components/modal/DictModal'
import { IModalRequestAction, IModalParams, IAction, IModalStyle } from '@/types/component/modal'
import { dictApi } from '@/apis/sys/dictApi'
import { DictPageListReq, EditableCellProps, TableDictDetailType, TableDictType } from '@/types/apis/sys/dict/dictType'
import { message } from 'antd'

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入数字`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const Dict = () => {
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })
  // 明细分页状态
  const [tablePageDetailInfo, setTablePageDetailInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })
  const [form] = useForm()
  const [formDetail] = useForm()
  const [btnSize] = useState<SizeType>('middle')
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<TableDictType[]>([] as TableDictType[])
  const [dictDetailData, setDictDetailData] = useState<TableDictDetailType[]>([])
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [editingDetailKey, setEditingDetailKey] = useState<string>('')

  const isEditing = (record: TableDictDetailType) => record.key === editingDetailKey

  const columns: ColumnsType<TableDictType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '字典类型',
      width: '20%'
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: '40%'
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: '15%'
    },
    {
      key: 'updateTime',
      dataIndex: 'updateTime',
      title: '修改时间',
      width: '15%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      render: (_: object, record: TableDictType) => (
        <Space size='middle'>
          <Button name='look' type='link' onClick={() => dictDetial(record)}>
            {'明细'}
          </Button>
          <Button
            name='edit'
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editDict(record.key ?? '', record)}
          />

          <Popconfirm
            title='删除字典'
            description={`确定要删除 [${record.name}] 这个字典吗?`}
            onConfirm={() => deleteDict(record)}
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

  const columnsDetails = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '字典明细',
      editable: true,
      width: '30%'
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: '类型',
      editable: true,
      width: '10%'
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      editable: true,
      width: '40%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '20%',
      render: (_: any, record: TableDictDetailType) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link onClick={() => saveDetail(record.key)} style={{ marginInlineEnd: 8 }}>
              {'保存'}
            </Typography.Link>
            <Popconfirm
              title='确定要取消吗?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={cancelDetail}
            >
              <a>{'取消'}</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <Space>
              <Button name='edit' type='link' icon={<EditOutlined />} onClick={() => editDetail(record)} />
              <Popconfirm
                title='删除字典明细'
                description={`确定要删除 [${record.name}] 这个字典明细吗?`}
                onConfirm={() => deleteDetail(record)}
                onCancel={() => {}}
                okText='确定'
                cancelText='取消'
              >
                <Button name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          </div>
        )
      }
    }
  ]

  const mergedColumns: TableProps<TableDictDetailType>['columns'] = columnsDetails.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: TableDictDetailType) => ({
        record,
        inputType: col.dataIndex === 'name' ? 'type' : 'remark',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  const dictRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      data?: any
    ) => void
  }>()

  useEffect(() => {
    initInfo()
  }, [])

  /**
   * 初始化数据
   */
  const initInfo = async () => {
    setTableLoading(true)

    // 加载字典列表
    retrieveDictList({ keyWords: '', currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })

    setTableLoading(false)
  }

  /**
   * 加载字典列表
   * @param dictPageReq
   * @returns
   */
  const retrieveDictList = async (dictPageReq: DictPageListReq) => {
    const dictPageList = await dictApi.retrieveDictPageList({ ...dictPageReq })
    const { code, data, msg } = dictPageList
    if (code !== 200) {
      return
    }
    const list: TableDictType[] = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId,
      ...rest
    }))
    setDataSource(list)
  }

  const addDict = () => {
    dictRef.current?.open(
      { api: dictApi },
      { title: '添加' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } }
    )
  }

  const editDict = (key: string, record: TableDictType) => {
    const req: TableDictType = {
      key,
      ...record
    }
    dictRef.current?.open(
      { api: dictApi },
      { title: '编辑' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...req }
    )
  }

  const deleteDict = async (record: TableDictType) => {
    const res = await dictApi.delete({ surrogateId: record.key ?? '' })
    const { code, msg } = res
    if (code !== 200) {
      return
    }

    retrieveDictList({
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
  }

  /**
   * dict page component
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    // retrieveAclPageList({ ...values, currentPageNum, pageSize })
  }
  /**
   * dict page component
   * @param currentPageNum
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    // console.log('--> abc:', 'ababa')
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  const rowSelection: TableRowSelection<TableDictType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  /** ================ detail ==================== */

  /**
   * 查看字典明细
   * @param record
   */
  const dictDetial = async (record: TableDictType) => {
    const list = await retrieveDictDetial({
      dictId: record.key ?? '',
      currentPageNum: tablePageDetailInfo.currentPageNum,
      pageSize: tablePageDetailInfo.pageSize
    })
    setDictDetailData(list)
    setOpenDrawer(!openDrawer)
  }

  const retrieveDictDetial = async ({
    dictId,
    currentPageNum,
    pageSize
  }: {
    dictId: string // 根据实际类型替换
    currentPageNum: number
    pageSize: number
  }): Promise<TableDictDetailType[]> => {
    const pageList = await dictApi.retrievePageDictDetailList({
      dictId: dictId,
      currentPageNum,
      pageSize
    })
    const { code, data, msg } = pageList
    if (code !== 200) {
      return []
    }

    const list: TableDictDetailType[] = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      ...rest
    }))
    return list
  }

  const onClose = () => {
    setOpenDrawer(!openDrawer)
  }

  /**
   * detail page component
   * @param currentPageNum
   * @param pageSize
   */
  const onChangeDetailPageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    // retrieveAclPageList({ ...values, currentPageNum, pageSize })
  }
  /**
   * detail page component
   * @param currentPageNum
   * @param pageSize
   */
  const onShowSizeDetailChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  const rowSelectionDetail: TableRowSelection<TableDictType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  /**
   * 点击编辑出发, 变为输入框
   * @param record
   */
  const editDetail = (record: Partial<TableDictDetailType> & { key: React.Key }) => {
    formDetail.setFieldsValue({ name: '', type: '', remark: '', ...record })
    setEditingDetailKey(record.key)
  }

  /**
   * 删除字典明细
   * @param record
   * @returns
   */
  const deleteDetail = async (record: Partial<TableDictDetailType> & { key: React.Key }) => {
    const res = await dictApi.deleteDictDetail({ surrogateId: record.key })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    message.success(msg)
    // 刷新数据
    const list = await retrieveDictDetial({
      dictId: record.parentId ?? '',
      currentPageNum: tablePageDetailInfo.currentPageNum,
      pageSize: tablePageDetailInfo.pageSize
    })
    setDictDetailData(list)
  }

  const cancelDetail = () => {
    setEditingDetailKey('')
  }

  /**
   * 保存明细
   * @param key
   */
  const saveDetail = async (key: React.Key) => {
    const row = (await formDetail.validateFields()) as TableDictDetailType

    const newData = [...dictDetailData]
    const index = newData.findIndex(item => key === item.key)
    if (index > -1) {
      const item = newData[index]
      // 保存明细
      const req = {
        surrogateId: item.key,
        parentId: item.parentId,
        name: row.name,
        type: row.type,
        remark: row.remark
      }

      newData.splice(index, 1, {
        ...item,
        ...row
      })

      // todo: 判断前后对象中的值是否有变化, 如果有变化, 则发起请求保存数据
      const saveRes = await dictApi.editDictDetail(req)
      const { code, msg, data } = saveRes
      if (code !== 200) {
        return
      } else {
        message.success('修改成功')
        setDictDetailData(newData)
      }

      setEditingDetailKey('')
    } else {
      newData.push(row)
      setDictDetailData(newData)
      setEditingDetailKey('')
    }
  }

  return (
    <div className='sys-dict-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        <div className='operation-btn'>
          <Flex vertical={false} gap='small'>
            <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={addDict}>
              {'新增'}
            </Button>
            <Form form={form}>
              <Flex gap='small'>
                <Form.Item name={'keyWords'} label={'搜索关键字'}>
                  <Input placeholder={'搜索关键字'} />
                </Form.Item>
                <Form.Item>
                  <Button icon={<SearchOutlined />} type='primary' />
                </Form.Item>
                <Form.Item>
                  <Button type='primary'>{'置空'}</Button>
                </Form.Item>
              </Flex>
            </Form>
            <Button type='dashed' size={btnSize} icon={<AntDesignOutlined />}>
              {'全部'}
            </Button>
          </Flex>
        </div>
        <div className='list'>
          <Table
            key={1}
            bordered={true}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            loading={tableLoading}
            columns={columns}
            dataSource={dataSource}
            size={'middle'}
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
        </div>
        <DictModal
          mRef={dictRef}
          update={() => {
            retrieveDictList({
              currentPageNum: 1,
              pageSize: tablePageInfo.pageSize
            })
          }}
        />
        <Drawer
          title={'字典明细'}
          placement={'right'}
          // width={1000} // 设置宽度
          size={'large'}
          closable={true}
          onClose={onClose}
          open={openDrawer}
          getContainer={false}
        >
          <Form form={formDetail} component={false}>
            <Table
              style={{ height: '100%', width: '100%' }}
              rowClassName='editable-row'
              components={{
                body: { cell: EditableCell }
              }}
              bordered={true}
              columns={mergedColumns}
              dataSource={dictDetailData}
              pagination={{
                size: 'small',
                position: ['bottomLeft'],
                showQuickJumper: false, // 跳转指定页面
                showSizeChanger: true,
                hideOnSinglePage: false,
                pageSizeOptions: [10, 20, 50],
                onChange: cancelDetail,
                onShowSizeChange: onShowSizeDetailChange,
                pageSize: tablePageDetailInfo.pageSize, // 每页条数
                total: tablePageDetailInfo.totalSize // 总条数
              }}
            />
          </Form>
        </Drawer>
      </Flex>
    </div>
  )
}

export default Dict
