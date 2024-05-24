import React, { useRef, useState } from 'react'
import { Button, Flex, PaginationProps, Popconfirm, Space, Table, Tag } from 'antd'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import blogContentApi from '@/apis/blog/content'
import SaveBlogModal from './SaveBlogModal'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { LabelDTO } from '@/types/apis/blog/label'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'

const Blogs = () => {
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
      render: (_: object, record: LabelDTO) => (
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
            description={`确定要删除 [${record.name}] 这个标签吗?`}
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
  const blogsRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction
      // items: ModalType.InputType[],
      // data?: any
    ) => void
  }>()
  const [rowKeys, setRowKeys] = useState<React.Key[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<LabelDTO[]>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const [totalSize, setTotalSize] = useState<number>(0)

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
   * 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
   * @param page
   * @param pageSize
   */
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {}

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
   * 创建博客, 打开modal
   */
  const createBlog = () => {
    let param = blogsRef.current?.open({ api: blogContentApi }, { title: '创建博客' }, { action: 'create', open: true })
  }

  const deleteBlog = () => {}

  return (
    <div className='blogs-publish-index-warpper'>
      <Flex gap='middle' vertical={true}>
        <Flex gap='small'>
          <Button type='primary' onClick={createBlog}>
            {'创建博客'}
          </Button>
          <Button type='primary' onClick={createBlog}>
            {'发布博客'}
          </Button>
          <Button type='primary' danger onClick={deleteBlog}>
            {'删除'}
          </Button>
        </Flex>
        <div>
          <Table
            key={1}
            style={{ width: '40%' }}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            loading={tableLoading}
            columns={columns}
            // dataSource={dataSource}
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
            // scroll={{ y: 1000 }}
          />
        </div>
      </Flex>
      <SaveBlogModal mRef={blogsRef} update={() => {}} />
    </div>
  )
}

export default Blogs
