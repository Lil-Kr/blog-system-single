import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Pagination, PaginationProps, Popconfirm, Space, Table, Tag, message } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { LabelDTO, LabelReqParams } from '@/types/apis/blog/label'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'
import LabelDetail from './LabelDetail'
import { IAction } from '@/types/component/modal'

// api
import blogLabelApi from '@/apis/blog/label'

const BlogLabel = () => {
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
      title: '标签名',
      width: 100,
      render: (_, record: LabelDTO) => (
        <>
          <Tag key={record.key} color={record.color}>
            {record.name}
          </Tag>
        </>
      )
    },
    {
      key: 'colorText',
      dataIndex: 'colorText',
      title: '展示颜色',
      width: 100,
      render: (_, record: LabelDTO) => (
        <Tag key={record.key} color={record.colorText}>
          {record.name}
        </Tag>
      )
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
      render: (_: object, record: LabelDTO) => (
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
            description={`确定要删除 [${record.name}] 这个标签吗?`}
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
  const labelRef = useRef<{ open: (type: IAction, data?: LabelDTO) => void }>()
  const [btnSize] = useState<SizeType>('middle')
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox')
  const [rowKeys, setRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<LabelDTO[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(5)
  const [totalSize, setTotalSize] = useState<number>(0)

  /**
   * 删除确认提示
   * @param record
   */
  const deleteItemConfirm = async (record: LabelDTO) => {
    const res = await blogLabelApi.delete({ surrogateId: record.key })
    if (res.code === 200) {
      message.success('操作成功')
      getLabelList({ keyWord: '' })
    } else {
      message.warning('操作失败')
    }
  }

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<LabelDTO> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: LabelDTO[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: LabelDTO) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: LabelDTO) => {
    labelRef.current?.open({ action: 'look', open: true }, record)
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = (key: string, record: LabelDTO) => {
    labelRef.current?.open({ action: 'edit', open: true }, record)
  }

  /**
   * create
   */
  const createLabel = () => {
    labelRef.current?.open({ action: 'create', open: true })
  }

  /**
   * deleteBatch
   */
  const deleteBatch = async () => {
    if (!rowKeys || rowKeys.length < 1) {
      message.warning('请选择待删除项')
      return
    }

    const ids = rowKeys.join(',')
    const res = await blogLabelApi.deleteBatch({ surrogateId: ids })
    if (res.code === 200) {
      message.success(res.msg)
      getLabelList({ keyWord: '' })
    } else {
      message.error(res.msg)
    }
  }

  /**
   * 搜索
   */
  const search = () => {}

  /**
   * 初始化
   */
  useEffect(() => {
    getLabelList({ keyWord: '' })
  }, [])

  /**
   * 获取标签列表, 不分页
   */
  const getLabelList = async (params: LabelReqParams) => {
    const values = form.getFieldsValue()

    const labelList = await blogLabelApi.getLabelList({ ...values })
    const { code, data, msg } = labelList
    if (code === 200) {
      const datas = data.list.map(({ surrogateId, number, name, color, colorText, remark }) => ({
        key: surrogateId,
        number,
        name,
        color,
        colorText,
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
    setPageSize(pageSize)
  }

  /**
   * 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
   * @param page
   * @param pageSize
   */
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {}

  return (
    <div className='blog-label-warpper'>
      <Flex gap='middle' vertical={true}>
        <Form form={form}>
          <Flex gap='small'>
            <Form.Item name={'keyWord'} label='搜索关键字'>
              <Input placeholder='搜索关键字' />
            </Form.Item>
            <Form.Item>
              <Button icon={<SearchOutlined />} type='primary' onClick={search} />
            </Form.Item>
          </Flex>
        </Form>
        <div className='operation-btn'>
          <Flex gap='small'>
            <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createLabel}>
              新增标签
            </Button>
            <Button size={btnSize} type='primary' icon={<DeleteOutlined />} danger onClick={deleteBatch}>
              删除标签
            </Button>
          </Flex>
        </div>
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
              pageSize: pageSize,
              total: totalSize
            }}
          />
        </Flex>
      </Flex>
      <LabelDetail
        mRef={labelRef}
        update={() => {
          getLabelList({ keyWord: '' })
        }}
      />
    </div>
  )
}

export default BlogLabel
