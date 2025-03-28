import React, { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { useBlogStore } from '@/store/blog/blogStore'
import BlogModal from './BlogModal'
import { BlogModalType } from '@/types/blog/BlogType'
import { useDictDetailStore } from '@/store/sys/dictStore'
import { transformTypeToSeletorById } from '@/utils/sys/treeUtils'
import labelApi from '@/apis/blog/label/labelApi'
import { LabelPageReq } from '@/types/apis/blog/labelType'
import { SelectProps } from 'antd/lib'
import { useLabelStore } from '@/store/blog/labelStore'
// api
import blogContentApi, {
  BlogContent,
  BlogContentTableType,
  BlogContentReq,
  BlogContentResq
} from '@/apis/blog/content/blogContentApi'
import { transformBlogToTable } from '@/utils/blog/blogTransform'

const BlogList = () => {
  const columnsBlog: ColumnsType<BlogContentTableType> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: '博客标题',
      width: '10%'
    },
    {
      key: 'introduction',
      dataIndex: 'introduction',
      title: '简介',
      width: '10%'
    },
    {
      key: 'blogLabelList',
      dataIndex: 'blogLabelList',
      title: '博客标签',
      width: '20%',
      render: (_: object, record) => (
        <Flex gap='4px' wrap='wrap'>
          {record.blogLabelList.map(item => (
            <Tag
              key={item.surrogateId}
              color={item.color}
              style={{ margin: 0, padding: '0 4px', fontSize: '12px', lineHeight: '15px' }}
            >
              {item.name}
            </Tag>
          ))}
        </Flex>
      )
    },
    {
      key: 'categoryName',
      dataIndex: 'categoryName',
      title: '博客分类',
      width: '10%',
      render: (_: object, record) => (
        <Tag key={record.key} color={record.categoryColor}>
          {record.categoryName}
        </Tag>
      )
    },
    {
      key: 'originalType',
      dataIndex: 'originalType',
      title: '是否原创',
      width: '5%',
      render: (_: object, record) =>
        record.originalType === 1 ? (
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
      key: 'recommendType',
      dataIndex: 'recommendType',
      title: '是否推荐',
      width: '5%',
      render: (_: object, record) =>
        record.recommendType === 1 ? (
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
      key: 'statusType',
      dataIndex: 'statusType',
      title: '发布状态',
      width: '10%',
      render: (_: object, record) =>
        record.statusType === 1 ? (
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
      width: '10%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      render: (_: object, record) => (
        <Flex vertical={false} gap={4}>
          <Button
            size={btnSize}
            name='look'
            type='link'
            shape='circle'
            icon={<SearchOutlined />}
            // onClick={() => editBlog(record.key as string, record)}
          />
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

  const { dictMap, blogTypes, setBlogType, setBlogTopic, blogPublisStatue, setBlogPublisStatue, switchStatue } =
    useDictDetailStore()
  const [form] = useForm()
  const { blogPageTableList, setBlogPageList } = useBlogStore()
  const [pageSize, setPageSize] = useState<number>(20)
  const [totalSize, setTotalSize] = useState<number>(0)
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const { labelList, setLabelList } = useLabelStore()

  const [blogModal, setBlogModal] = useState<BlogModalType>({
    openModal: false,
    api: blogContentApi,
    title: '添加博客',
    action: 'create',
    inputDisabled: false,
    update: () => {}
  })

  /**
   * 初始化数据
   */
  useEffect(() => {
    const initBolgContentData = async () => {
      const bolgList = await getBlogContentPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
      const blogs = transformBlogToTable(bolgList)
      setBlogPageList(blogs)

      // /**
      //  * 加载博客分类
      //  */
      // const blogTypes = dictMap.get('博客分类') ?? []
      // const blogType = transformTypeToSeletorById(blogTypes)
      // setBlogType(blogType)

      // /**
      //  * 加载博客标签
      //  */
      // const labelRes = await retrieveLableList({} as LabelPageReq)
      // setLabelList(labelRes)

      // /**
      //  * 博客专题
      //  */
      // const blogTopics = dictMap.get('博客专题') ?? []
      // const blogTopic = transformTypeToSeletorById(blogTopics)
      // setBlogTopic(blogTopic)

      // /**
      //  * 博客发布状态
      //  */
      // const blogPublisStatueDict = dictMap.get('博客发布状态') ?? []
      // const publishStatue = transformTypeToSeletorById(blogPublisStatueDict)
      // setBlogPublisStatue(publishStatue)
    }
    initBolgContentData()
  }, [])

  /**
   * 查询标签列表
   */
  const retrieveLableList = async (req: LabelPageReq): Promise<SelectProps['options']> => {
    const res = await labelApi.retrieveLabelList(req)
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    return data.list.map(({ surrogateId, name, ...rest }) => ({
      key: surrogateId,
      label: name,
      value: surrogateId,
      ...rest
    }))
  }

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<BlogContentTableType> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: BlogContentTableType[]) => {},
    getCheckboxProps: (record: BlogContentTableType) => ({})
  }
  /**
   * 页码或 pageSize 改变的回调, 参数是改变后的页码及每页条数
   * @param page
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (page, pageSize) => {
    setPageSize(pageSize)
  }

  /**
   * 创建博客, 打开 modal
   */
  const createBlog = () => {
    const param: BlogModalType = {
      api: blogContentApi,
      openModal: true,
      title: '添加博客',
      action: 'create',
      inputDisabled: false,
      data: {
        categoryInfo: blogTypes.find(item => item.value === '0') ?? blogTypes[0],
        blogLabelList: labelList,
        blogPublisStatue: blogPublisStatue.find(item => item.type === '0')?.value ?? '',
        original: switchStatue.find(item => item.value === '0')?.value ?? '',
        recommend: switchStatue.find(item => item.value === '0')?.value ?? ''
      },
      update: () => {
        setBlogModal(preState => ({ ...preState, openModal: false }))
      }
    }
    setBlogModal({ ...param })
  }

  /**
   * 编辑博客
   */
  const editBlog = async (blogId: string, record: BlogContentTableType) => {
    const param: BlogModalType = {
      api: blogContentApi,
      openModal: true,
      title: '编辑博客',
      action: 'edit',
      inputDisabled: false,
      data: {
        ...record,
        categoryInfo: {
          label: record.categoryName,
          value: record.categoryId
        },
        blogLabelList: record.blogLabelList,
        blogPublisStatue: record.status.toString(),
        original: record.original.toString()
      },
      update: () => {
        setBlogModal(preState => ({ ...preState, openModal: false }))
      }
    }
    setBlogModal({ ...param })
  }

  const deleteBlog = () => {}

  const getBlogContentPageList = async (req: BlogContentReq): Promise<BlogContentResq[]> => {
    const values = form.getFieldsValue()
    const blogContent = await blogContentApi.getBlogContentPageList({ ...req, ...values })
    const { code, data, msg } = blogContent
    if (code !== 200) {
      return []
    }

    setTotalSize(data.total)
    console.log('--> data.list:', data.list)
    return data.list
  }

  const getBlogContent = async (req: { blogId: string }): Promise<BlogContent> => {
    const blogContent = await blogContentApi.getContent({ blogId: req.blogId })
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
            <Form.Item name={'keyWords'} label='关键字'>
              <Input size={inputSize} placeholder='搜索关键字' />
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
              onChange: onChangePageInfo,
              // onShowSizeChange: onShowSizeChange,
              showSizeChanger: true,
              pageSize: pageSize,
              total: totalSize
            }}
          />
        </div>
      </Flex>
      <BlogModal {...blogModal} />
    </div>
  )
}

export default BlogList
