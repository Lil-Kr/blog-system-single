import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Space, Table } from 'antd/lib'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'
import { BlogCategoryPageReq, CategoryTableType } from '@/types/apis/blog/category'
import { useMessage } from '@/components/message/MessageProvider'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { Tag } from 'antd/lib'
import CategoryModal from './CategoryModal'
import { useCategoryModalStore, useCategoryStore } from '@/store/blog/categoryStore'

// api
import blogCategoryApi from '@/apis/blog/category/categoryApi'
import {
  _QUERY_CATEGORY_ACL,
  AddCategoryButtonAcl,
  DelCategoryButtonAcl,
  EditCategoryButtonAcl,
  LookCategoryButtonAcl,
  QueryCategoryButtonAcl
} from './auth/authButton'
import { usePermissionsStore } from '@/store/sys/authStore'

const BlogCategory = () => {
  const columnsBlogCategory: ColumnsType<CategoryTableType> = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: '10%'
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '分类名',
      width: '20%'
    },
    {
      key: 'color',
      dataIndex: 'color',
      title: '颜色',
      width: '10%',
      render: (_: object, record) => <Tag color={record.color}>{record.color}</Tag>
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: '40%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '20%',
      render: (_: object, record) => (
        <Flex vertical={false} gap={8}>
          <LookCategoryButtonAcl
            size={btnSize}
            name='look'
            type='link'
            shape='circle'
            icon={<SearchOutlined />}
            onClick={() => lookItem(record.key, record)}
          />
          <EditCategoryButtonAcl
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editItem(record.key, record)}
          />
          <Popconfirm
            title='删除博客分类'
            description={`确定要删除 [${record.name}] 这个博客分类吗?`}
            onConfirm={() => deleteItemConfirm(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <DelCategoryButtonAcl
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
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const { setCategoryModal } = useCategoryModalStore()
  const { tablePageInfo, setTablePageInfo, categoryPageList, setCategoryPageList } = useCategoryStore()

  const { btnSignSet } = usePermissionsStore()

  /**
   * 删除确认提示
   * @param record
   */
  const deleteItemConfirm = async (record: CategoryTableType) => {
    const res = await blogCategoryApi.delete!({ surrogateId: record.key })
    if (res.code !== 200) {
      return
    }

    messageApi?.success(res.msg)
    getCategoryPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<CategoryTableType> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CategoryTableType[]) => {
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: CategoryTableType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: CategoryTableType) => {
    const categoryModalData = {
      api: blogCategoryApi,
      title: '查看分类',
      action: 'edit',
      openModal: true,
      inputDisabled: true,
      modalStyle: { width: '60vw' },
      req: { ...record },
      update: () => {
        getCategoryPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
      }
    }
    setCategoryModal({ ...categoryModalData })
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = (key: string, record: CategoryTableType) => {
    const categoryModalData = {
      api: blogCategoryApi,
      title: '编辑分类',
      action: 'edit',
      openModal: true,
      inputDisabled: false,
      modalStyle: { width: '60vw' },
      req: { ...record },
      update: () => {
        getCategoryPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
      }
    }
    setCategoryModal(categoryModalData)
  }

  /**
   * create
   */
  const createType = () => {
    const categoryModalData = {
      api: blogCategoryApi,
      title: '添加分类',
      action: 'create',
      openModal: true,
      inputDisabled: false,
      modalStyle: { width: '60vw' },
      update: () => {
        getCategoryPageList({ keyWords: '', currentPageNum: 1, pageSize: tablePageInfo.pageSize })
      }
    }
    setCategoryModal(categoryModalData)
  }

  /**
   * 搜索
   */
  const search = () => {
    let data = form.getFieldsValue()
    const searchParam = { ...data, currentPageNum: 1, pageSize: tablePageInfo.pageSize }
    getCategoryPageList({ ...searchParam })
  }

  const resetSearch = () => {
    form.resetFields()
    getCategoryPageList({ currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 初始化数据
   */
  useEffect(() => {
    getCategoryPageList({ currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }, [])

  /**
   * 获取标签列表
   */
  const getCategoryPageList = async (req: BlogCategoryPageReq) => {
    const blogTypesRes = await blogCategoryApi.getCategoryPageList({ ...req })
    const { code, data } = blogTypesRes
    if (code !== 200) {
      setCategoryPageList([])
      return
    }

    const list = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      ...rest
    }))
    setCategoryPageList(list)
    setTablePageInfo({
      ...tablePageInfo,
      totalSize: data.total,
      pageSize: req.pageSize,
      currentPageNum: req.currentPageNum
    })
  }

  /**
   * 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
   * @param page 当前页码数
   * @param pageSize 每页记录数
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    getCategoryPageList({ ...values, currentPageNum, pageSize })
  }

  return (
    <div className='blog-category-warpper'>
      <Flex gap='middle' vertical={true}>
        {btnSignSet.has(_QUERY_CATEGORY_ACL) ? (
          <Form form={form}>
            <Flex gap='small'>
              <Form.Item name={'keyWords'} label='搜索关键字'>
                <Input size={inputSize} placeholder='搜索关键字' />
              </Form.Item>
              <Form.Item>
                <QueryCategoryButtonAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
              </Form.Item>
              <Form.Item>
                <QueryCategoryButtonAcl text='重置' size={btnSize} type='primary' onClick={resetSearch} />
              </Form.Item>
            </Flex>
          </Form>
        ) : null}

        <Flex gap='small'>
          <AddCategoryButtonAcl
            text='添加'
            size={btnSize}
            type='primary'
            icon={<PlusOutlined />}
            onClick={createType}
          />
        </Flex>
        <div className='list'>
          <Table
            key={1}
            bordered={true}
            size={tableSize}
            // loading={tableLoading}
            columns={columnsBlogCategory}
            dataSource={categoryPageList}
            rowSelection={{
              type: selectionType,
              ...rowSelection
            }}
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
        <CategoryModal />
      </Flex>
    </div>
  )
}

export default BlogCategory
