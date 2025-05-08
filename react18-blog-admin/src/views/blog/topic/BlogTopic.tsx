import React, { useEffect, useState } from 'react'
import { BlogTopicPageReq, TopiciTableType } from '@/types/apis/blog/topicType'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Flex, Form, Input, PaginationProps, Popconfirm } from 'antd/lib'
import { useForm } from 'antd/es/form/Form'
import Table, { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import blogTopicApi from '@/apis/blog/topic/topicApi'
import { useMessage } from '@/components/message/MessageProvider'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { Tag } from 'antd/lib'
import { TopicModalState, useBlogTopicModalStore, useBlogTopicStore } from '@/store/blog/topicStore'
import TopicModal from './TopicModal'
import {
  _QUERY_TOPIC_ACL,
  AddTopicButtonAcl,
  DelTopicButtonAcl,
  EditTopicButtonAcl,
  LookTopicButtonAcl,
  QueryTopicButtonAcl
} from './auth/authButton'
import { usePermissionsStore } from '@/store/sys/authStore'

const BlogTopic = () => {
  const columnsBlogTopic: ColumnsType<TopiciTableType> = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: '10%'
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '主题名',
      width: '10%',
      render: (_, record) => <Tag color={record.color}>{record.name}</Tag>
    },
    {
      key: 'color',
      dataIndex: 'color',
      title: '展示颜色',
      width: '10%',
      render: (_, record) => <Tag color={record.color}>{record.color}</Tag>
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: '40%'
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
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      render: (_: object, record) => (
        <Flex vertical={false} gap={4}>
          <LookTopicButtonAcl
            size={btnSize}
            name='look'
            type='link'
            shape='circle'
            icon={<SearchOutlined />}
            onClick={() => lookItem(record.key, record)}
          />
          <EditTopicButtonAcl
            size={btnSize}
            name='edit'
            type='link'
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
            <DelTopicButtonAcl
              size={btnSize}
              name='delete'
              type='link'
              shape='circle'
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Flex>
      )
    }
  ]

  const messageApi = useMessage()
  const [form] = useForm()
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox')
  const [rowKeys, setRowKeys] = useState<React.Key[]>([])
  const { topicPageList, setTopicPageList, tablePageInfo, setTablePageInfo } = useBlogTopicStore()
  const { setTopicModalState } = useBlogTopicModalStore()
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const { btnSignSet } = usePermissionsStore()

  /**
   * 初始化
   */
  useEffect(() => {
    retrieveTopicPageList({
      keyWords: '',
      currentPageNum: tablePageInfo.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
  }, [])

  /**
   * 复选框
   */
  const rowSelection: TableRowSelection<TopiciTableType> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TopiciTableType[]) => {
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: TopiciTableType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  /**
   * 页码或 pageSize 改变的回调, 参数是改变后的页码及每页条数
   * @param page 当前页码数
   * @param pageSize 每页记录数
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retrieveTopicPageList({ keyWords: '', ...values, currentPageNum, pageSize })
  }

  /**
   * 搜索
   */
  const search = () => {
    const values = form.getFieldsValue()
    retrieveTopicPageList({ keyWords: '', ...values, currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 置空搜索框
   */
  const resetSearch = () => {
    form.resetFields()
    retrieveTopicPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 查询专题列表数据
   */
  const retrieveTopicPageList = async (req: BlogTopicPageReq) => {
    const values = form.getFieldsValue()
    const blogTopicRes = await blogTopicApi.retrieveTopicPageList({ ...req, ...values })
    const { code, data } = blogTopicRes
    if (code !== 200) {
      return
    }

    const list = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId,
      ...rest
    }))
    setTopicPageList(list)
    setTablePageInfo({
      ...tablePageInfo,
      currentPageNum: req.currentPageNum,
      pageSize: req.pageSize,
      totalSize: data.total
    })
  }

  /**
   * create
   */
  const createTopic = () => {
    const reqModal: TopicModalState = {
      api: blogTopicApi,
      title: '添加专题',
      action: 'create',
      openModal: true,
      inputDisabled: false,
      update: () => {
        retrieveTopicPageList({
          currentPageNum: tablePageInfo.currentPageNum,
          pageSize: tablePageInfo.pageSize
        })
      }
    }
    setTopicModalState(reqModal)
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = (key: string, record: TopiciTableType) => {
    const reqModal = {
      api: blogTopicApi,
      title: '编辑专题',
      action: 'edit',
      openModal: true,
      inputDisabled: false,
      modalReq: record,
      update: () => {
        retrieveTopicPageList({
          currentPageNum: tablePageInfo.currentPageNum,
          pageSize: tablePageInfo.pageSize
        })
      }
    }
    setTopicModalState(reqModal)
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: TopiciTableType) => {
    const reqModal = {
      api: blogTopicApi,
      title: '查看专题',
      action: 'look',
      openModal: true,
      inputDisabled: true,
      modalReq: record,
      update: () => {}
    }
    setTopicModalState(reqModal)
  }

  /**
   * 删除确认提示
   * @param record
   */
  const deleteItemConfirm = async (record: TopiciTableType) => {
    const res = await blogTopicApi.delete!({ surrogateId: record.key })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    retrieveTopicPageList({
      currentPageNum: tablePageInfo.currentPageNum,
      pageSize: tablePageInfo.pageSize
    })
  }

  return (
    <Flex className='blog-topic-warrper' gap='small' vertical={true}>
      {btnSignSet.has(_QUERY_TOPIC_ACL) ? (
        <Form form={form}>
          <Flex gap='small'>
            <Form.Item name={'keyWords'} label='搜索关键字'>
              <Input size={inputSize} placeholder='搜索关键字' />
            </Form.Item>
            <Form.Item>
              <QueryTopicButtonAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
            </Form.Item>
            <Form.Item>
              <QueryTopicButtonAcl text='重置' size={btnSize} type='primary' onClick={resetSearch} />
            </Form.Item>
          </Flex>
        </Form>
      ) : null}

      <Flex className='blog-topic-operation' gap={4}>
        <AddTopicButtonAcl text='添加' size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createTopic} />
      </Flex>

      <div className='blog-topic-table-list'>
        <Table
          key={1}
          size={tableSize}
          bordered={true}
          rowSelection={{
            type: selectionType,
            ...rowSelection
          }}
          columns={columnsBlogTopic}
          dataSource={topicPageList}
          pagination={{
            size: 'small',
            position: ['bottomLeft'],
            hideOnSinglePage: false, // only one pageSize then hidden Paginator
            pageSizeOptions: [10, 20, 50], // specify how many items can be displayed on each page
            onChange: onChangePageInfo,
            showSizeChanger: true,
            pageSize: tablePageInfo.pageSize,
            total: tablePageInfo.totalSize
          }}
        />
        <TopicModal />
      </div>
    </Flex>
  )
}

export default BlogTopic
