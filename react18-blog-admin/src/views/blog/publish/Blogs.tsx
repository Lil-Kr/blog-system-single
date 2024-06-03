import React, { useEffect, useRef, useState } from 'react'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Space, Table, Tag } from 'antd'
import { IAction, IModalParams, IModalRequestAction } from '@/types/component/modal'
import SaveBlogModal from './SaveBlogModal'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'

// api
import blogContentApi, {
  BlogContent,
  BlogContentDTO,
  BlogContentReqParams,
  MappedBlogContentDTO
} from '@/apis/blog/content'

const Blogs = () => {
  const columns: ColumnsType<any> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: '博客标题',
      width: 100
    },
    {
      key: 'blogLabelList',
      dataIndex: 'blogLabelList',
      title: '博客标签',
      width: 100,
      render: (_: object, record: BlogContentDTO) =>
        record.blogLabelList.map((item, index) => (
          <Tag key={item.surrogateId} color={item.color}>
            {item.name}
          </Tag>
        ))
    },
    {
      key: 'categoryName',
      dataIndex: 'categoryName',
      title: '博客分类',
      width: 100
    },
    {
      key: 'original',
      dataIndex: 'original',
      title: '是否原创',
      width: 50,
      render: (_: object, record: BlogContentDTO) => (record.original === 1 ? '是' : '否')
    },
    {
      key: 'recommend',
      dataIndex: 'recommend',
      title: '是否推荐',
      width: 50,
      render: (_: object, record: BlogContentDTO) => (record.recommend === 1 ? '是' : '否')
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '发布状态',
      width: 100,
      render: (_: object, record: BlogContentDTO) => (record.status === 1 ? '已发布' : '未发布')
    },
    {
      key: 'publishTime',
      dataIndex: 'publishTime',
      title: '发布时间',
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
      render: (_: object, record: BlogContentDTO) => (
        <Space size='middle'>
          {/* <Button
            name='look'
            type='primary'
            shape='circle'
            icon={<SearchOutlined />}
            // onClick={() => lookItem(record.key, record)}
          /> */}
          <Button
            name='edit'
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editBlog(record.key as string, record)}
          />
          <Popconfirm
            title='删除博客'
            description={`确定要删除 [${record.title}] 这篇博客吗?`}
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
      type: IAction,
      // items: ModalType.InputType[],
      data?: { blog: MappedBlogContentDTO }
    ) => void
  }>()

  const [form] = useForm()
  const [rowKeys, setRowKeys] = useState<React.Key[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<BlogContentDTO[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalSize, setTotalSize] = useState<number>(0)

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<BlogContentDTO> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: BlogContentDTO[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: BlogContentDTO) => ({})
  }
  /**
   * 页码或 pageSize 改变的回调, 参数是改变后的页码及每页条数
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

  /**
   * 编辑博客
   */
  const editBlog = async (blogId: string, record: BlogContentDTO) => {
    const content = await getBlogContent({ blogId })
    blogsRef.current?.open(
      { api: blogContentApi },
      { title: '编辑博客' },
      { action: 'edit', open: true },
      {
        blog: {
          ...record,
          contentText: content.contentText,
          blogLabelList: record.blogLabelList.map(({ surrogateId, name, color }, index) => ({
            key: surrogateId,
            label: name,
            value: surrogateId,
            color
          }))
        }
      }
    )
  }

  const deleteBlog = () => {}

  /**
   * 初始化数据
   */
  useEffect(() => {
    getBlogContentPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
  }, [])

  const getBlogContentPageList = async (params: BlogContentReqParams) => {
    const values = form.getFieldsValue()
    const blogContent = await blogContentApi.getBlogContentPageList({ ...params, ...values })
    const { code, data, msg } = blogContent
    if (code === 200) {
      const dataMapping = data.list.map(
        ({
          surrogateId,
          title,
          introduction,
          original,
          recommend,
          imgUrl,
          status,
          publishTime,
          remark,
          blogLabelList,
          blogCategoryVO,
          blogTopicVO
        }) => ({
          key: surrogateId,
          title,
          introduction,
          original,
          recommend,
          imgUrl,
          status,
          publishTime,
          remark,
          categoryId: blogCategoryVO.surrogateId,
          categoryName: blogCategoryVO.name,
          topicId: blogTopicVO.surrogateId,
          topicName: blogTopicVO.name,
          blogLabelList: blogLabelList.map((item, index) => {
            return {
              ...item,
              key: item.surrogateId
            }
          })
        })
      )
      setDataSource(dataMapping)
      setTotalSize(data.total)
      setTableLoading(false)
    }
  }

  const getBlogContent = async (param: { blogId: string }): Promise<BlogContent> => {
    const blogContent = await blogContentApi.getContent({ blogId: param.blogId })
    if (blogContent.code !== 200) {
      return {} as BlogContent
    }
    return blogContent.data as BlogContent
  }

  const search = () => {}

  return (
    <div className='blogs-publish-index-warpper'>
      <Flex gap='middle' vertical={true}>
        <Form form={form}>
          <Flex gap='small'>
            <Form.Item name={'keyWords'} label='搜索关键字'>
              <Input placeholder='搜索关键字' />
            </Form.Item>
            <Form.Item>
              <Button icon={<SearchOutlined />} type='primary' onClick={search} />
            </Form.Item>
          </Flex>
        </Form>
        <Flex gap='small'>
          <Button type='primary' onClick={createBlog}>
            {'创建博客'}
          </Button>
          <Button type='primary' onClick={createBlog}>
            {'发布博客'}
          </Button>
          {/* <Button type='primary' danger onClick={deleteBlog}>
            {'删除'}
          </Button> */}
        </Flex>
        <div>
          <Table
            key={1}
            style={{ width: '100%' }}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            loading={tableLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              position: ['bottomLeft'],
              hideOnSinglePage: false, // only one pageSize then hidden Paginator
              pageSizeOptions: [10, 20, 50], // specify how many items can be displayed on each page
              onChange: onChange,
              onShowSizeChange: onShowSizeChange,
              showSizeChanger: true,
              pageSize: pageSize,
              total: totalSize
            }}
          />
        </div>
      </Flex>
      <SaveBlogModal
        mRef={blogsRef}
        update={() => getBlogContentPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })}
      />
    </div>
  )
}

export default Blogs
