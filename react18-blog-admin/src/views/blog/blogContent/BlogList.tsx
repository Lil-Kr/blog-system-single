import React, { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import {
  CheckCircleTwoTone,
  CheckOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { BlogContentModalType, useBlogModalStore, useBlogStore } from '@/store/blog/blogStore'
import BlogModal from './BlogModal'
import { useDictDetailStore } from '@/store/sys/dictStore'
import labelApi from '@/apis/blog/label/labelApi'
import { LabelPageReq } from '@/types/apis/blog/labelType'
import { SelectProps, Tooltip } from 'antd/lib'
import { useLabelStore } from '@/store/blog/labelStore'
// api
import blogContentApi, {
  BlogContent,
  BlogContentTableType,
  BlogContentReq,
  BlogContentResq
} from '@/apis/blog/content/blogContentApi'
import { transformBlogToTable, transformCategoryToSelector, transformTopicToSelector } from '@/utils/blog/blogTransform'
import { transformTypeToSeletorById } from '@/utils/sys/treeUtils'
import blogCategoryApi from '@/apis/blog/category/categoryApi'
import { BlogCategoryReq, BlogCategoryVO } from '@/types/apis/blog/category'
import blogTopicApi from '@/apis/blog/topic/topicApi'
import { BlogTopicReq, BlogTopicVO } from '@/types/apis/blog/topicType'
import { useMessage } from '@/components/message/MessageProvider'
import Link from 'antd/lib/typography/Link'

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
      width: '15%',
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
      width: '5%',
      render: (_: object, record) => (
        <Tag key={record.key} color={record.categoryColor}>
          {record.categoryName}
        </Tag>
      )
    },
    {
      key: 'topicName',
      dataIndex: 'topicName',
      title: '专题',
      width: '5%',
      render: (_: object, record) => (
        <Tag key={record.key} color={record.topicColor}>
          {record.topicName}
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
      key: 'statusName',
      dataIndex: 'statusName',
      title: '发布状态',
      width: '5%',
      render: (_: object, record) => {
        let statueType = record.statusType
        let colorText = 'green'
        switch (statueType) {
          case 0:
            colorText = 'blue'
            break
          case 1:
            colorText = 'green'
            break
          case 2:
            colorText = 'red'
            break
        }
        return (
          <Tag key={record.key} color={colorText}>
            {record.statusName}
          </Tag>
        )
      }
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: '10%'
    },
    {
      key: 'updateTime',
      dataIndex: 'updateTime',
      title: '修改时间',
      width: '10%'
    },
    {
      key: 'publishTime',
      dataIndex: 'publishTime',
      title: '发布时间',
      width: '10%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      render: (_: object, record) => (
        <Flex vertical={false} gap={4}>
          {record.statusType !== 1 ? (
            <Tooltip title='未发布'>
              <Button
                size={btnSize}
                type='link'
                color='red'
                icon={<UploadOutlined twoToneColor='#52c41a' />}
                onClick={() => publishBlog(record)}
              />
            </Tooltip>
          ) : (
            <Tooltip title='已发布'>
              <Button size={btnSize} type='link' icon={<CheckCircleTwoTone twoToneColor='#52c41a' />} />
            </Tooltip>
          )}

          <Tooltip title='编辑博客'>
            <Button
              size={btnSize}
              name='edit'
              type='link'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => editBlog(record.key as string, record)}
            />
          </Tooltip>

          <Tooltip title='删除博客'>
            <Popconfirm
              title='删除博客'
              description={`确定要删除 [${record.title}] 这篇博客吗?`}
              onConfirm={() => deleteBlogonfirm(record)}
              okText='确定'
              cancelText='取消'
            >
              <Button size={btnSize} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Flex>
      )
    }
  ]

  const messageApi = useMessage()
  const { dictMap, blogTypes, setBlogType, setBlogTopic, blogPublisStatue, setBlogPublisStatue, switchStatue } =
    useDictDetailStore()
  const [form] = useForm()
  const { blogPageTableList, setBlogPageList } = useBlogStore()
  const { setBlogModalData } = useBlogModalStore()
  const [pageSize, setPageSize] = useState<number>(20)
  const [totalSize, setTotalSize] = useState<number>(0)
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const { setLabelList } = useLabelStore()
  /**
   * 初始化数据
   */
  useEffect(() => {
    const initBolgContentData = async () => {
      const bolgList = await getBlogContentPageList({ keyWords: '', currentPageNum: 1, pageSize: pageSize })
      const blogs = transformBlogToTable(bolgList)
      setBlogPageList(blogs)

      /**
       * 加载博客标签
       */
      const labelRes = await retrieveLableList({} as LabelPageReq)
      setLabelList(labelRes)

      /**
       * 加载博客分类
       */
      const blogTypes = await retrieveCategoryList({})
      const blogType = transformCategoryToSelector(blogTypes)
      setBlogType(blogType)

      /**
       * 博客专题
       */
      const blogTopics = await retrieveTopicList({})
      const blogTopic = transformTopicToSelector(blogTopics)
      setBlogTopic(blogTopic)

      /**
       * 博客发布状态
       */
      const blogPublisStatueDict = dictMap.get('博客发布状态') ?? []
      const publishStatue = transformTypeToSeletorById(blogPublisStatueDict)
      setBlogPublisStatue(publishStatue)
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
   * 查询[博客-分类]列表
   * @returns
   */
  const retrieveTopicList = async (req: BlogTopicReq): Promise<BlogTopicVO[]> => {
    const res = await blogTopicApi.retrieveTopicList({ ...req })
    const { code, data, msg } = res
    if (code !== 200) {
      return []
    }
    return data.list
  }

  /**
   * 查询[博客-专题]列表
   * @returns
   */
  const retrieveCategoryList = async (req: BlogCategoryReq): Promise<BlogCategoryVO[]> => {
    const res = await blogCategoryApi.retrieveCategoryList({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    return data.list
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
    const modalReq: BlogContentModalType = {
      categoryInfo: blogTypes.find(item => item.type === '0') ?? blogTypes[0], // 默认分类
      original: switchStatue.find(item => item.type === '1')?.value ?? '', // 给默认值
      recommend: switchStatue.find(item => item.type === '0')?.value ?? '', // 给默认值
      publishStatue: blogPublisStatue.find(item => item.type === '0')?.value ?? '' // 给默认值
    }

    setBlogModalData({
      api: blogContentApi,
      openModal: true,
      action: 'create',
      title: '创建博客',
      inputDisabled: false,
      modalReq,
      update: () => {
        refreshBlogContentPageList()
      }
    })
  }

  /**
   * 编辑博客
   */
  const editBlog = async (blogId: string, record: BlogContentTableType) => {
    const blogContent = await getBlogContent({ surrogateId: record.key as string })
    const modalReq: BlogContentModalType = {
      ...record,
      categoryInfo: {
        label: record.categoryName,
        value: record.categoryId
      },
      blogLabelList: record.blogLabelList.map(({ surrogateId, name, color }) => ({
        key: surrogateId,
        value: surrogateId,
        label: name,
        color
      })),
      topicInfo: {
        label: record.topicName,
        value: record.topicId
      },
      original: switchStatue.find(item => item.value === record.original)?.value ?? '',
      recommend: switchStatue.find(item => item.value === record.recommend)?.value ?? '',
      publishStatue: blogPublisStatue.find(item => item.value === record.status)?.value ?? '',
      contentText: blogContent.contentText ?? ''
    }

    setBlogModalData({
      api: blogContentApi,
      openModal: true,
      action: 'edit',
      title: '编辑博客',
      inputDisabled: false,
      modalReq,
      update: () => {
        refreshBlogContentPageList()
      }
    })
  }

  const publishBlog = async (record: BlogContentTableType) => {
    // 获取发布状态
    const status = blogPublisStatue.find(item => item.type === '1')?.value ?? ''
    const res = await blogContentApi.publish({ surrogateId: record.key, status })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    refreshBlogContentPageList()
  }

  /**
   * 刷新博客列表
   */
  const refreshBlogContentPageList = async () => {
    const bolgList = await getBlogContentPageList({ keyWords: '', currentPageNum: 1, pageSize: 20 })
    const blogs = transformBlogToTable(bolgList)
    setBlogPageList(blogs)
  }

  /**
   * 获取博客列表数据
   * @param req
   * @returns
   */
  const getBlogContentPageList = async (req: BlogContentReq): Promise<BlogContentResq[]> => {
    const values = form.getFieldsValue()
    const blogContent = await blogContentApi.getBlogContentPageList({ ...req, ...values })
    const { code, data, msg } = blogContent
    if (code !== 200) {
      return []
    }

    setTotalSize(data.total)
    return data.list
  }

  /**
   * 获取博客详情数据
   * @param req
   * @returns
   */
  const getBlogContent = async (req: { surrogateId: string }): Promise<BlogContent> => {
    const blogContent = await blogContentApi.getContent({ surrogateId: req.surrogateId })
    if (blogContent.code !== 200) {
      return {} as BlogContent
    }
    return blogContent.data as BlogContent
  }

  const search = () => {}

  /**
   * 删除博客
   * @param record
   * @returns
   */
  const deleteBlogonfirm = async (record: BlogContentTableType) => {
    const res = await blogContentApi.delete({ surrogateId: record.key })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    refreshBlogContentPageList()
  }

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
      <BlogModal />
    </div>
  )
}

export default BlogList
