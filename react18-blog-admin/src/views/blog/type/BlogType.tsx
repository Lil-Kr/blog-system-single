import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Pagination, PaginationProps, Popconfirm, Space, Table, message } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { BlogTypeReqParams, TypeDTO } from '@/types/apis/blog/type'
import { BaseModal } from '@/components/modal'

// api
import blogTypeApi from '@/apis/blog/type'

const BlogType = () => {
  const columns: ColumnsType<any> = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: 100
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '分类名',
      width: 100
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: 100
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: 150,
      render: (_: object, record: TypeDTO) => (
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
            description={`确定要删除 [${record.name}] 这个博客分类吗?`}
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

  const [form] = useForm()
  // const labelRef = useRef<{ open: (type: IAction, data?: TypeDTO) => void }>()
  const typeRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      items: ModalType.InputType[],
      data?: any
    ) => void
  }>()
  const [btnSize] = useState<SizeType>('middle')
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox')
  const [rowKeys, setRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<TypeDTO[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalSize, setTotalSize] = useState<number>(0)

  /**
   * 删除确认提示
   * @param record
   */
  const deleteItemConfirm = async (record: TypeDTO) => {
    const res = await blogTypeApi.delete!({ surrogateId: record.key })
    if (res.code === 200) {
      message.success(res.msg)
      getTypePageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
    } else {
      message.error(res.msg)
    }
  }

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<TypeDTO> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TypeDTO[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: TypeDTO) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: TypeDTO) => {
    typeRef.current?.open(
      { api: blogTypeApi },
      { title: '查看博客类型' },
      { action: 'look', open: true }, // create | edit | look
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '分类编号',
          textValue: '分类编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类编号不能为空' }]
        },
        {
          name: 'name',
          label: '分类名称',
          textValue: '分类名称, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类名称不能为空' }]
        },
        {
          name: 'remark',
          label: '备注',
          textValue: '备注不超过200个字符',
          style: { width: '100%' }
        }
      ],
      { ...record }
    )
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = (key: string, record: TypeDTO) => {
    typeRef.current?.open(
      { api: blogTypeApi },
      { title: '编辑博客类型' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '分类编号',
          textValue: '分类编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类编号不能为空' }]
        },
        {
          name: 'name',
          label: '分类名称',
          textValue: '分类名称, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类名称不能为空' }]
        },
        {
          name: 'remark',
          label: '备注',
          textValue: '备注不超过200个字符',
          style: { width: '100%' }
        }
      ],
      { ...record }
    )
  }

  /**
   * create
   */
  const createType = () => {
    typeRef.current?.open(
      { api: blogTypeApi },
      { title: '创建博客类型' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '分类编号',
          textValue: '分类编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类编号不能为空' }]
        },
        {
          name: 'name',
          label: '分类名称',
          textValue: '分类名称, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类名称不能为空' }]
        },
        {
          name: 'remark',
          label: '备注',
          textValue: '备注不超过200个字符',
          style: { width: '100%' }
        }
      ]
    )
  }

  /**
   * deleteBatch
   */
  const deleteBatch = async () => {
    if (!rowKeys || rowKeys.length < 1) {
      message.warning('请选择待删除项')
      return
    }

    // const ids = rowKeys.join(',')
    // const res = await blogApi.deleteBatch({ surrogateId: ids })
    // if (res.code === 200) {
    //   message.success(res.msg)
    //   getLabelList({ keyWord: '' })
    // } else {
    //   message.error(res.msg)
    // }
  }

  /**
   * 搜索
   */
  const search = () => {
    let data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: pageSize }
    getTypePageList({ ...searchParam })
  }

  const resetSearch = () => {
    form.resetFields()
    getTypePageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }

  /**
   * 初始化
   */
  useEffect(() => {
    getTypePageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }, [])

  /**
   * 获取标签列表, 不分页
   */
  const getTypePageList = async (params: BlogTypeReqParams) => {
    const values = form.getFieldsValue()
    const blogTypesRes = await blogTypeApi.getTypePageList({ ...params, ...values })
    const { code, data, msg } = blogTypesRes
    if (code === 200) {
      const datas = data.list.map(({ surrogateId, number, name, remark }) => ({
        key: surrogateId,
        number,
        name,
        remark
      }))
      setDataSource(datas)
      setTotalSize(data.total)
      setTableLoading(false)
    }
  }

  /**
   * change pageSize
   * pageSize 变化的回调
   * @param current
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    const values = form.getFieldsValue()
    getTypePageList({ ...values, currentPageNum: current, pageSize: pageSize })
    setPageSize(pageSize)
  }

  /**
   * 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
   * @param page 当前页码数
   * @param pageSize 每页记录数
   */
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    const values = form.getFieldsValue()
    getTypePageList({ ...values, currentPageNum: page, pageSize: pageSize })
  }

  return (
    <div className='blog-label-warpper'>
      <Flex gap='middle' vertical={true}>
        <Form form={form}>
          <Flex gap='small'>
            <Form.Item name={'keyWords'} label='搜索关键字'>
              <Input placeholder='搜索关键字' />
            </Form.Item>
            <Form.Item>
              <Button icon={<SearchOutlined />} type='primary' onClick={search} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' onClick={resetSearch}>
                置空
              </Button>
            </Form.Item>
          </Flex>
        </Form>

        <div className='operation-btn'>
          <Flex gap='small'>
            <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createType}>
              创建分类
            </Button>
            <Button size={btnSize} type='primary' icon={<DeleteOutlined />} danger onClick={deleteBatch}>
              删除分类
            </Button>
          </Flex>
        </div>

        <div className='list'>
          <Table
            key={1}
            style={{ width: '40%' }}
            rowSelection={{
              type: selectionType,
              ...rowSelection
            }}
            loading={tableLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              hideOnSinglePage: false, // only one pageSize then hidden Paginator
              pageSizeOptions: [pageSize, 20, 50], // specify how many items can be displayed on each page
              onChange: onChange,
              onShowSizeChange: onShowSizeChange,
              showSizeChanger: true,
              pageSize: pageSize,
              total: totalSize
            }}
          />
        </div>
        <BaseModal
          mRef={typeRef}
          update={() => {
            getTypePageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
          }}
        />
      </Flex>
    </div>
  )
}

export default BlogType
