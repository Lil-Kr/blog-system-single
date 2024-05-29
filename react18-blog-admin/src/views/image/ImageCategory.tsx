import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Space, Table } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useRef, useState } from 'react'
import { ImageCategoryDTO, ImageCategoryPageReqParams, ImageCategoryReqParams } from '@/types/apis/image/image'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { BaseModal } from '@/components/modal'

// api
import imageCategoryApi from '@/apis/image'

const ImageCategory = () => {
  const columns: ColumnsType<any> = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: 100
    },
    {
      key: 'imageUrl',
      dataIndex: 'imageUrl',
      title: '标题图',
      width: 200,
      render: (_: object, record: ImageCategoryDTO) => (
        <img height={100} style={{ objectFit: 'cover' }} src={record.imageUrl} />
      )
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '分类名',
      width: 100
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: 60
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: 150
    },
    {
      key: 'updateTime',
      dataIndex: 'updateTime',
      title: '更新时间',
      width: 150
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: 150,
      render: (_: object, record: ImageCategoryDTO) => (
        <Space size='middle'>
          <Button
            name='look'
            type='primary'
            shape='circle'
            icon={<SearchOutlined />}
            // onClick={() => lookItem(record.key, record)}
          />
          <Button
            name='edit'
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            // onClick={() => editItem(record.key, record)}
          />
          <Popconfirm
            title='删除标签'
            description={`确定要删除 [${record.name}] 这个分类吗?`}
            // onConfirm={() => deleteItemConfirm(record)}
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
  const imageCategoryRef = useRef<{
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
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<ImageCategoryDTO[]>([])
  const [pageInfo, setPageInfo] = useState({ pageSize: 5, totalSize: 0 })

  /**
   * 搜索
   */
  const search = () => {
    const values = form.getFieldsValue()
    imageCategoryPageList({ ...values, currentPageNum: 1, pageSize: pageInfo.pageSize })
  }

  const resetSearch = () => {
    form.resetFields()
    imageCategoryPageList({ keyWords: '', currentPageNum: 1, pageSize: pageInfo.pageSize })
  }

  /**
   * create
   */
  const create = () => {
    imageCategoryRef.current?.open(
      { api: imageCategoryApi },
      { title: '添加图片类型' },
      { action: 'create', open: true },
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '类别编号',
          textValue: '类别编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '类别编号不能为空' }]
        },
        {
          name: 'name',
          label: '类别名称',
          textValue: '类别名称, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '类别名称不能为空' }]
        },
        {
          name: 'imageUrl',
          label: '封面图url',
          textValue: '封面图url',
          style: { width: '100%' }
        },
        {
          name: 'remark',
          label: '备注',
          textValue: '备注',
          style: { width: '100%' }
        }
      ]
    )
  }

  const deleteBatch = async () => {}

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<ImageCategoryDTO> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ImageCategoryDTO[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setRowKeys(selectedRowKeys)
    }
    // getCheckboxProps: (record: LabelDTO) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name
    // })
  }

  /**
   * 页码或 pageSize 改变的回调, 参数是改变后的页码及每页条数
   * @param page
   * @param pageSize
   */
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    const values = form.getFieldsValue()
    imageCategoryPageList({ ...values, currentPageNum: page, pageSize })
  }

  /**
   * change pageSize
   * pageSize 变化的回调
   * @param current
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageInfo({ ...pageInfo, pageSize })
  }

  useEffect(() => {
    imageCategoryPageList({ keyWords: '', currentPageNum: 1, pageSize: pageInfo.pageSize })
  }, [])

  const imageCategoryPageList = async (params: ImageCategoryPageReqParams) => {
    const values = form.getFieldsValue()
    const imageCategoryList = await imageCategoryApi.imageCategoryPageList({ ...values, ...params })
    const { code, data, msg } = imageCategoryList
    if (code !== 200) {
      return []
    }

    const datas = data.list.map(({ surrogateId, number, name, imageUrl, status, createTime, updateTime, remark }) => ({
      key: surrogateId,
      number,
      name,
      imageUrl,
      status,
      createTime,
      updateTime,
      remark
    }))
    setDataSource(datas)
    setPageInfo({ totalSize: data.total, pageSize: params.pageSize })
  }

  return (
    <div className='image-category-warpper'>
      <Flex gap='small' vertical={true}>
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
        <Flex className='operation-btn' vertical={false} gap='small'>
          <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={create}>
            添加分类
          </Button>
          <Button size={btnSize} type='primary' icon={<DeleteOutlined />} danger onClick={deleteBatch}>
            删除分类
          </Button>
        </Flex>
        <Flex className='list' gap='middle' vertical={true}>
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
              pageSize: pageInfo.pageSize,
              total: pageInfo.totalSize
            }}
          />
        </Flex>
      </Flex>
      <BaseModal mRef={imageCategoryRef} update={() => {}} />
    </div>
  )
}

export default ImageCategory
