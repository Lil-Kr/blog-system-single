import React, { useEffect, useRef, useState } from 'react'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Space, Table, Tag, Typography } from 'antd'
const { Title } = Typography
import { IAction, IModalParams, IModalRequestAction } from '@/types/component/modal'
import SaveBlogModal from './SaveBlogModal'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'

// api
import blogContentApi, {
  BlogContent,
  BlogContentDTO,
  BlogContentReqReq,
  BlogContentVO,
  MappedBlogContentDTO
} from '@/apis/blog/content/blogContentApi'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { blogTransformToTable } from '@/utils/blog/blogTransform'
import { useBlogStore } from '@/store/blog/blogStore'

const BlogList = () => {
  const columnsBlog: ColumnsType<BlogContentDTO> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: '博客标题',
      width: '10%'
    },
    {
      key: 'blogLabelList',
      dataIndex: 'blogLabelList',
      title: '博客标签',
      width: '10%'
      // render: (_: object, record: BlogContentDTO) =>
      //   record.blogLabelList.map((item, index) => (
      //     <Tag key={item.surrogateId} color={item.color}>
      //       {item.name}
      //     </Tag>
      //   ))
    },
    {
      key: 'categoryName',
      dataIndex: 'categoryName',
      title: '博客分类',
      width: '10%'
    },
    {
      key: 'original',
      dataIndex: 'original',
      title: '是否原创',
      width: '10%',
      render: (_: object, record: BlogContentDTO) =>
        record.original === 1 ? (
          <Tag key={record.key} color={`volcano`}>
            {`是`}
          </Tag>
        ) : (
          <Tag key={record.key} color={`default`}>
            {`否`}
          </Tag>
        )
    },
    {
      key: 'recommend',
      dataIndex: 'recommend',
      title: '是否推荐',
      width: '10%',
      render: (_: object, record: BlogContentDTO) =>
        record.recommend === 1 ? (
          <Tag key={record.key} color={`volcano`}>
            {`是`}
          </Tag>
        ) : (
          <Tag key={record.key} color={`default`}>
            {`否`}
          </Tag>
        )
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '发布状态',
      width: '10%',
      render: (_: object, record: BlogContentDTO) =>
        record.status === 1 ? (
          <Tag key={record.key} color={`green`}>
            {`已发布`}
          </Tag>
        ) : (
          <Tag key={record.key} color={`geekblue`}>
            {`未发布`}
          </Tag>
        )
    },
    {
      key: 'publishTime',
      dataIndex: 'publishTime',
      title: '发布时间',
      width: '10%'
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: '20%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      render: (_: object, record: BlogContentDTO) => (
        <Flex vertical={false} gap={4}>
          <Button
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editBlog(record.key as string, record)}
          />
          <Popconfirm
            title='删除博客'
            description={`确定要删除 [${record.title}] 这篇博客吗?`}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <Button size={btnSize} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Flex>
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
  const { blogPageTableList, setBlogPageList } = useBlogStore()
  const [pageSize, setPageSize] = useState<number>(20)
  const [totalSize, setTotalSize] = useState<number>(0)
  const { btnSize, tableSize } = useGlobalStyleStore()

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
    const initBolgContentData = async () => {
      const bolgList = await getBlogContentPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
      const blogs = blogTransformToTable(bolgList)
      setBlogPageList(blogs)
    }
    initBolgContentData()
  }, [])

  const getBlogContentPageList = async (req: BlogContentReqReq): Promise<BlogContentVO[]> => {
    const values = form.getFieldsValue()
    const blogContent = await blogContentApi.getBlogContentPageList({ ...req, ...values })
    const { code, data, msg } = blogContent
    if (code !== 200) {
      return []
    }

    setTotalSize(data.total)
    return data.list
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
              <Button size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
            </Form.Item>
          </Flex>
        </Form>
        <Flex gap='small'>
          <Button size={btnSize} type='primary' onClick={createBlog}>
            {'创建博客'}
          </Button>
          <Button size={btnSize} type='primary' onClick={createBlog}>
            {'发布博客'}
          </Button>
          <Button size={btnSize} type='primary' danger onClick={deleteBlog}>
            {'删除'}
          </Button>
        </Flex>
        <div className='blog-table-wapper'>
          <Table
            key={1}
            size={tableSize}
            bordered={true}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            columns={columnsBlog}
            dataSource={blogPageTableList}
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

export default BlogList
