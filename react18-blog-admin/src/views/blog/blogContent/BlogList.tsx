import React, { useEffect } from 'react'
import { Flex, Form, Input, PaginationProps, Popconfirm, Table, Tag } from 'antd/lib'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import {
  ApiTwoTone,
  DeleteOutlined,
  DownCircleTwoTone,
  EditOutlined,
  RocketTwoTone,
  SearchOutlined
} from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { BlogContentModalType, useBlogModalStore, useBlogStore } from '@/store/blog/blogStore'
import BlogModal from './BlogModal'
import { useDictDetailStore } from '@/store/sys/dictStore'
import labelApi from '@/apis/blog/label/labelApi'
import { LabelListReq } from '@/types/apis/blog/labelType'
import { Select, Tooltip } from 'antd/lib'
import { useLabelStore } from '@/store/blog/labelStore'
import { transformBlogToTable, transformCategoryToSelector, transformTopicToSelector } from '@/utils/blog/blogTransform'
import blogCategoryApi from '@/apis/blog/category/categoryApi'
import { BlogCategoryReq } from '@/types/apis/blog/category'
import blogTopicApi from '@/apis/blog/topic/topicApi'
import { BlogTopicListReq } from '@/types/apis/blog/topicType'
import { useMessage } from '@/components/message/MessageProvider'
import { transformDictTypeToSeletor } from '@/utils/sys/transform'

// api
import blogContentApi, { BlogContent, BlogContentTableType, BlogContentReq } from '@/apis/blog/content/blogContentApi'
import {
  _QUERY_BLOG_ACL,
  AddBlogBtnAcl,
  DelBlogBtnAcl,
  EditBlogBtnAcl,
  PublishBlogBtnAcl,
  QueryBlogBtnAcl
} from './auth/authButton'
import { usePermissionsStore } from '@/store/sys/authStore'
import { useImageManageStore } from '@/store/blog/imageStore'

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
      key: 'status',
      dataIndex: 'status',
      title: '发布状态',
      width: '5%',
      render: (_: object, record) => {
        const statueType = record.status
        let colorText = ''
        let statusName = ''
        if (statueType === 0) {
          colorText = 'blue'
          statusName = '草稿'
        } else if (statueType === 1) {
          colorText = 'green'
          statusName = '已发布'
        } else if (statueType === 2) {
          colorText = 'red'
          statusName = '下架'
        } else {
          colorText = 'green'
          statusName = '草稿'
        }

        return (
          <Tag key={record.key} color={colorText}>
            {statusName}
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
      render: (_: object, record) => {
        const renderStatusButton = () => {
          switch (record.status) {
            case 0:
              return (
                <Tooltip title='发布'>
                  <PublishBlogBtnAcl
                    size={btnSize}
                    type='link'
                    icon={<RocketTwoTone twoToneColor='#c41d7f' />}
                    onClick={() => publishBlog(record)}
                  />
                </Tooltip>
              )
            case 1:
              return (
                <Tooltip title='下架'>
                  <PublishBlogBtnAcl
                    size={btnSize}
                    type='link'
                    icon={<DownCircleTwoTone twoToneColor='#52c41a' />}
                    onClick={() => publishBlog(record)}
                  />
                </Tooltip>
              )
            case 2:
              return (
                <Tooltip title='上线'>
                  <PublishBlogBtnAcl
                    size={btnSize}
                    type='link'
                    icon={<ApiTwoTone twoToneColor='#ffa940' />}
                    onClick={() => publishBlog(record)}
                  />
                </Tooltip>
              )
            default:
              return null // 如果没有匹配的状态, 返回 null
          }
        }

        return (
          <Flex vertical={false} gap={4}>
            {renderStatusButton()}

            <Tooltip title='编辑博客'>
              <EditBlogBtnAcl
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
                <DelBlogBtnAcl
                  size={btnSize}
                  name='delete'
                  type='link'
                  shape='circle'
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>
          </Flex>
        )
      }
    }
  ]

  const [form] = useForm()
  const messageApi = useMessage()
  const { dictMap, blogTypes, setBlogType, setBlogTopic, blogPublisStatue, setBlogPublisStatue, switchStatue } =
    useDictDetailStore()
  const { blogPageTableList, setBlogPageList, tablePageInfo, setTablePageInfo } = useBlogStore()
  const { setBlogModalData } = useBlogModalStore()
  const { setLabelList } = useLabelStore()
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const { btnSignSet } = usePermissionsStore()
  const { setIsCopy } = useImageManageStore()

  /**
   * 初始化数据
   */
  useEffect(() => {
    const initBolgContentData = async () => {
      await retrieveBlogContentPageList({
        currentPageNum: tablePageInfo.currentPageNum,
        pageSize: tablePageInfo.pageSize
      })

      /**
       * 加载博客标签
       */
      await retrieveLableList({} as LabelListReq)

      /**
       * 加载博客分类
       */
      await retrieveCategoryList({})

      /**
       * 博客专题
       */
      await retrieveTopicList({})

      /**
       * 博客发布状态
       */
      const blogPublisStatueDict = dictMap.get('博客发布状态') ?? []
      const publishStatue = transformDictTypeToSeletor(blogPublisStatueDict)
      setBlogPublisStatue(publishStatue)
    }
    initBolgContentData()
  }, [])

  /**
   * 查询标签列表
   */
  const retrieveLableList = async (req: LabelListReq) => {
    const res = await labelApi.retrieveLabelList(req)
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    const labelRes = data.list.map(({ surrogateId, name, ...rest }) => ({
      key: surrogateId,
      label: name,
      value: surrogateId,
      ...rest
    }))
    console.log('--> retrieveLableList:', labelRes)
    setLabelList(labelRes)
  }

  /**
   * 查询[博客-分类]列表
   * @returns
   */
  const retrieveTopicList = async (req: BlogTopicListReq) => {
    const res = await blogTopicApi.retrieveTopicList({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }

    const blogTopic = transformTopicToSelector(data.list)
    setBlogTopic(blogTopic)
  }

  /**
   * 查询[博客-专题]列表
   * @returns
   */
  const retrieveCategoryList = async (req: BlogCategoryReq) => {
    const res = await blogCategoryApi.retrieveCategoryList({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    const blogType = transformCategoryToSelector(data.list)
    setBlogType(blogType)
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
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retrieveBlogContentPageList({ ...values, currentPageNum, pageSize })
  }

  /**
   * 创建博客, 打开 modal
   */
  const createBlog = () => {
    const modalReq: BlogContentModalType = {
      categoryInfo: blogTypes.find(item => item.type === '0') ?? blogTypes[0], // 默认分类
      original: switchStatue.find(item => item.type === '1')?.value ?? '', // 给默认值
      recommend: switchStatue.find(item => item.type === '0')?.value ?? '', // 给默认值
      publishStatue: blogPublisStatue.find(item => item.type === '0')?.type ?? '0' // 给默认值
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
      },
      openImageModal: false,
      imageModaltitle: '选择图片'
    })
    // 打开图片选择器
    setIsCopy(true)
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
      publishStatue: blogPublisStatue.find(item => item.type === record.status.toString())?.type ?? '',
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
      },
      openImageModal: false,
      imageModaltitle: '选择图片'
    })
    // 打开图片选择器
    setIsCopy(true)
  }

  /**
   * 发布博客
   */
  const publishBlog = async (record: BlogContentTableType) => {
    // 获取[发布]状态
    let status = ''
    if (record.status === 0) {
      status = '1'
    } else if (record.status === 1) {
      status = '2'
    } else if (record.status === 2) {
      status = '1'
    } else {
      status = '0'
    }
    const res = await blogContentApi.publish({ surrogateId: record.key, status: status })
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
    const values = form.getFieldsValue()
    await retrieveBlogContentPageList({
      ...values,
      currentPageNum: tablePageInfo.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
  }

  /**
   * 获取博客列表数据
   * @param req
   * @returns
   */
  const retrieveBlogContentPageList = async (req: BlogContentReq) => {
    const blogContent = await blogContentApi.getBlogContentPageList({ ...req })
    const { code, data } = blogContent
    if (code !== 200) {
      return []
    }
    const blogs = transformBlogToTable(data.list)
    setBlogPageList(blogs)
    setTablePageInfo({
      ...tablePageInfo,
      totalSize: data.total,
      pageSize: req.pageSize,
      currentPageNum: req.currentPageNum
    })
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

  /**
   * 条件搜索
   */
  const search = async () => {
    const values = form.getFieldsValue()
    await retrieveBlogContentPageList({
      ...values,
      currentPageNum: tablePageInfo.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
  }

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

  /**
   * 重置搜索条件
   */
  const resetSearch = async () => {
    form.resetFields()
    await retrieveBlogContentPageList({
      currentPageNum: tablePageInfo.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
  }

  const handleChangeCategory = (value: string) => {}

  return (
    <div className='blogs-publish-index-warpper'>
      <Flex gap={2} vertical={true}>
        {btnSignSet.has(_QUERY_BLOG_ACL) ? (
          <Form form={form}>
            <Flex vertical={false} gap={10}>
              <Form.Item key={0} name={'keyWords'} label='关键字'>
                <Input size={inputSize} placeholder='搜索关键字' />
              </Form.Item>
              <Form.Item key={1} name={'status'} label={'发布状态'}>
                <Select
                  style={{ width: 150 }}
                  size={inputSize}
                  showSearch
                  placeholder='选择发布状态'
                  optionFilterProp='children'
                  options={blogPublisStatue}
                  onChange={value => handleChangeCategory(value)}
                />
              </Form.Item>
              <Form.Item key={2}>
                <QueryBlogBtnAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
              </Form.Item>
              <Form.Item key={3}>
                <QueryBlogBtnAcl text='重置' size={btnSize} type='primary' onClick={resetSearch} />
              </Form.Item>
            </Flex>
          </Form>
        ) : null}

        <Flex gap='small'>
          <AddBlogBtnAcl text={'创建博客'} size={btnSize} type='primary' onClick={createBlog} />
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
              showSizeChanger: true,
              pageSize: tablePageInfo.pageSize,
              total: tablePageInfo.totalSize
            }}
          />
        </div>
      </Flex>
      <BlogModal />
    </div>
  )
}

export default BlogList
