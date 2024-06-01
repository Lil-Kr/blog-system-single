import React, { useEffect, useRef, useState } from 'react'
import { BaseModal } from '@/components/modal'
import { BlogTopicPageReqParams, BlogTopicReqParams, TopicDTO } from '@/types/apis/blog/topic'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Space, message } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { useForm } from 'antd/es/form/Form'
import Table, { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import blogTopicApi from '@/apis/blog/topic'

const BlogTopic = () => {
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
      title: '主题名',
      width: 100
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: 200
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: 150,
      render: (_: object, record: TopicDTO) => (
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
            title='删除主题'
            description={`确定要删除 [${record.name}] 这个博客主题吗?`}
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
  const topicRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      items: ModalType.InputType[],
      data?: any
    ) => void
  }>()
  const [form] = useForm()
  const [pageSize, setPageSize] = useState<number>(10)
  const [btnSize] = useState<SizeType>('middle')
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox')
  const [rowKeys, setRowKeys] = useState<React.Key[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [dataSource, setDataSource] = useState<TopicDTO[]>([])
  const [totalSize, setTotalSize] = useState<number>(0)

  const rowSelection: TableRowSelection<TopicDTO> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TopicDTO[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: TopicDTO) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  /**
   * 页码或 pageSize 改变的回调, 参数是改变后的页码及每页条数
   * @param page 当前页码数
   * @param pageSize 每页记录数
   */
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    const values = form.getFieldsValue()
    getTopicPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }

  /**
   * change pageSize
   * pageSize 变化的回调
   * @param current
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    const values = form.getFieldsValue()
    getTopicPageList({ ...values, currentPageNum: current, pageSize: pageSize })
    setPageSize(pageSize)
  }

  /**
   * 搜索
   */
  const search = () => {
    let data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: pageSize }
    // getCategoryPageList({ ...searchParam })
  }

  /**
   * 置空搜索框
   */
  const resetSearch = () => {
    form.resetFields()
    // getCategoryPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }

  /**
   * 初始化
   */
  useEffect(() => {
    getTopicPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }, [])

  const getTopicPageList = async (params: BlogTopicPageReqParams) => {
    const values = form.getFieldsValue()
    const blogTopicRes = await blogTopicApi.getTopicPageList({ ...params, ...values })
    const { code, data, msg } = blogTopicRes
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
   * create
   */
  const createTopic = () => {
    topicRef.current?.open(
      { api: blogTopicApi },
      { title: '创建博客类型' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '编号',
          textValue: '主题编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '主题编号不能为空' }]
        },
        {
          name: 'name',
          label: '主题名称',
          textValue: '主题名称, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '主题名称不能为空' }]
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
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: TopicDTO) => {
    topicRef.current?.open(
      { api: blogTopicApi },
      { title: '查看博客专题' },
      { action: 'look', open: true }, // create | edit | look
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '主题编号',
          textValue: 'number, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类编号不能为空' }]
        },
        {
          name: 'name',
          label: '主题名称',
          textValue: '主题名称, 必填',
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
  const editItem = (key: string, record: TopicDTO) => {
    topicRef.current?.open(
      { api: blogTopicApi },
      { title: '编辑博客专题' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '主题编号',
          textValue: '主题编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '分类编号不能为空' }]
        },
        {
          name: 'name',
          label: '主题名称',
          textValue: '主题名称, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '主题名称不能为空' }]
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
   * 删除确认提示
   * @param record
   */
  const deleteItemConfirm = async (record: TopicDTO) => {
    const res = await blogTopicApi.delete!({ surrogateId: record.key })
    if (res.code === 200) {
      message.success(res.msg)
      getTopicPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
    } else {
      message.error(res.msg)
    }
  }

  return (
    <Flex className='blog-topic-warrper' gap='small' vertical={true}>
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

      <Flex className='blog-topic-operation' gap='small'>
        <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createTopic}>
          创建主题
        </Button>
        <Button size={btnSize} type='primary' icon={<DeleteOutlined />} danger>
          删除主题
        </Button>
      </Flex>

      <Flex className='blog-topic-table' gap='small'>
        <Table
          key={1}
          style={{ width: '60%' }}
          rowSelection={{
            type: selectionType,
            ...rowSelection
          }}
          loading={tableLoading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            hideOnSinglePage: false, // only one pageSize then hidden Paginator
            pageSizeOptions: [10, 20, 50], // specify how many items can be displayed on each page
            onChange: onChange,
            onShowSizeChange: onShowSizeChange,
            showSizeChanger: true,
            pageSize: pageSize,
            total: totalSize
          }}
        />
        <BaseModal
          innerComponent={'all-input'}
          mRef={topicRef}
          update={() => {
            getTopicPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
          }}
        />
      </Flex>
    </Flex>
  )
}

export default BlogTopic
