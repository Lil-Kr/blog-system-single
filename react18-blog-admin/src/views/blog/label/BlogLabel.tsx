import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Popconfirm, Space, Table, message } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { LabelShowType } from '@/types/blog/labelType'
import { TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'
import LabelDetail from './LabelDetail'
import { IAction } from '@/types/modal'
import { LabelReqParams } from '@/types/apis/blog'

// api
import blogApi from '@/apis/blog/label'

const BlogLabel = () => {
  const columns = [
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
      render: (_: object, record: LabelShowType) => (
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
  const labelRef = useRef<{ open: (type: IAction, data?: LabelShowType) => void }>()
  const [btnSize] = useState<SizeType>('middle')
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox')
  const [rowKeys, setRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<LabelShowType[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(false)

  const deleteItemConfirm = async (record: LabelShowType) => {
    const res = await blogApi.delete({ surrogateId: record.key })
    if (res.code === 200) {
      message.success('操作成功')
      getLabelList({ keyWord: '' })
    } else {
      message.success('操作失败')
    }
  }

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<LabelShowType> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: LabelShowType[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: LabelShowType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: LabelShowType) => {
    labelRef.current?.open({ action: 'look', open: true }, record)
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = (key: string, record: LabelShowType) => {
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
    const res = await blogApi.deleteBatch({ surrogateId: ids })
    if (res.code === 200) {
      message.success('操作成功')
      getLabelList({ keyWord: '' })
    } else {
      message.error(res.msg)
    }
  }

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

    const res = await blogApi.getLabelList({ ...values })
    if (res.code === 200) {
      const data = res.data.map(({ id, surrogateId, number, name, remark }) => ({
        key: surrogateId,
        number,
        name,
        remark
      }))
      setDataSource(data)
    }
  }

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
            // pagination={{ pageSize: 50 }} // 分页使用
            // scroll={{ y: 1000 }}
          />
        </div>
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
