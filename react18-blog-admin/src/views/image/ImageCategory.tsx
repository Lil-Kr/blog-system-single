import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Table, Tag } from 'antd/lib'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { ImageCategoryPageReq, ImageCategoryTableType } from '@/types/apis/image/imageType'
import { useMessage } from '@/components/message/MessageProvider'
import { useGlobalStyleStore } from '@/store/global/globalStore'

// api
import imageCategoryApi from '@/apis/image/imageCategoryApi'
import { ImageCategoryModalState, useImageCategoryModalStore, useImageCategoryStore } from '@/store/blog/imageStore'
import { ImageCategoryModal } from '@/components/blog/imageManage/indext'
import {
  _QUERY_IMAGE_CATEGORY_ACL,
  AddImageCategoryBtnAcl,
  DelImageCategoryButtonAcl,
  EditImageCategoryButtonAcl,
  QueryImageCategoryBtnAcl
} from './auth/authImageCategoryButton'
import { usePermissionsStore } from '@/store/sys/authStore'

const env = import.meta.env

const ImageCategory = () => {
  const columnsImageCategory: ColumnsType<ImageCategoryTableType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '分类名',
      width: '30%',
      render: (_, record) => <Tag color={'pink'}>{record.name}</Tag>
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: '20%',
      render: (_, record) => {
        let text = ''
        let color = ''
        if (record.status === 0) {
          text = '正常'
          color = 'green'
        } else {
          text = '作废'
          color = 'geekblue'
        }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: '20%'
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
      render: (_, record) => (
        <Flex vertical={false} gap={4}>
          <EditImageCategoryButtonAcl
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editItem(record)}
          />
          <Popconfirm
            title='删除图片分类'
            description={`确定要删除 [${record.name}] 这个图片分类吗?`}
            onConfirm={() => deleteItemConfirm(record)}
            okText='确定'
            cancelText='取消'
          >
            <DelImageCategoryButtonAcl
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
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const {
    imageCategoryPageList,
    setImageCategoryPageList,
    tableLoading,
    setTableLoading,
    tablePageInfo,
    setTablePageInfo,
    selectionType
  } = useImageCategoryStore()
  const { setImageCategoryModalState } = useImageCategoryModalStore()
  const { btnSignSet } = usePermissionsStore()

  useEffect(() => {
    pageImageCategoryList({ currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })
  }, [])

  /**
   * 搜索
   */
  const search = () => {
    const values = form.getFieldsValue()
    pageImageCategoryList({ ...values, currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })
  }

  /**
   * 重置
   */
  const resetSearch = () => {
    form.resetFields()
    const values = form.getFieldsValue()
    pageImageCategoryList({ ...values, currentPageNum: 1, pageSize: tablePageInfo.pageSize })
  }

  /**
   * create
   */
  const create = () => {
    const modalData: ImageCategoryModalState = {
      api: imageCategoryApi,
      title: '添加图片分类',
      action: 'create',
      openModal: true,
      inputDisabled: false,
      updateCallBack: () => {
        pageImageCategoryList({ currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })
      }
    }
    setImageCategoryModalState({ ...modalData })
  }

  /**
   * 编辑
   * @param key
   */
  const editItem = async (record: ImageCategoryTableType) => {
    const modalData: ImageCategoryModalState = {
      api: imageCategoryApi,
      title: '编辑图片分类',
      action: 'edit',
      openModal: true,
      inputDisabled: false,
      updateCallBack: () => {
        pageImageCategoryList({ currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })
      },
      modalData: {
        ...record,
        key: record.key
      }
    }
    setImageCategoryModalState({ ...modalData })
  }

  /**
   * 删除分类
   * @param record
   * @returns
   */
  const deleteItemConfirm = async (record: ImageCategoryTableType) => {
    const delRes = await imageCategoryApi.delete({ surrogateId: record.key })
    const { code, msg } = delRes
    if (code !== 200) {
      return
    }
    // 刷新列表
    pageImageCategoryList({ currentPageNum: 1, pageSize: tablePageInfo.pageSize })
    messageApi?.success(msg)
  }

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<ImageCategoryTableType> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ImageCategoryTableType[]) => {}
  }

  /**
   * 页码或 pageSize 改变的回调, 参数是改变后的页码及每页条数
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    pageImageCategoryList({ ...values, currentPageNum, pageSize })
  }

  /**
   * 分页查询图片分类信息
   * @param req
   * @returns
   */
  const pageImageCategoryList = async (req: ImageCategoryPageReq) => {
    setTableLoading(true)
    const values = form.getFieldsValue()
    const imageCategoryList = await imageCategoryApi.pageImageCategoryList({ ...values, ...req })
    const { code, data } = imageCategoryList
    if (code !== 200) {
      return []
    }

    const list = data.list.map(({ surrogateId, imageUrl, ...rest }) => ({
      key: surrogateId,
      imageUrl: env.VITE_BACKEND_IMAGE_BASE_API + imageUrl,
      ...rest
    }))
    setImageCategoryPageList(list)
    setTablePageInfo({ ...tablePageInfo, totalSize: data.total, pageSize: req.pageSize })
    setTableLoading(false)
  }

  return (
    <div className='image-category-warpper'>
      <Flex gap='small' vertical={true}>
        {btnSignSet.has(_QUERY_IMAGE_CATEGORY_ACL) ? (
          <Form form={form}>
            <Flex vertical={false} gap={8}>
              <Form.Item name={'keyWords'} label='关键字'>
                <Input size={inputSize} placeholder='搜索关键字' />
              </Form.Item>
              <Form.Item>
                <QueryImageCategoryBtnAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
              </Form.Item>
              <Form.Item>
                <QueryImageCategoryBtnAcl text='置空' size={btnSize} type='primary' onClick={resetSearch} />
              </Form.Item>
            </Flex>
          </Form>
        ) : null}
        <Flex className='operation-btn' vertical={false} gap='small'>
          <AddImageCategoryBtnAcl text='添加' size={btnSize} type='primary' icon={<PlusOutlined />} onClick={create} />
        </Flex>

        <Flex className='list' gap={4} vertical={true}>
          <Table
            key={1}
            size={tableSize}
            bordered={true}
            rowSelection={{
              type: selectionType,
              ...rowSelection
            }}
            loading={tableLoading}
            columns={columnsImageCategory}
            dataSource={imageCategoryPageList}
            pagination={{
              position: ['bottomLeft'], // pagination position
              showQuickJumper: false, // 跳转指定页面
              showSizeChanger: true,
              hideOnSinglePage: false, // only one pageSize then hidden Paginator
              pageSizeOptions: [10, 20, 50], // specify how many items can be displayed on each page
              onChange: onChangePageInfo,
              pageSize: tablePageInfo.pageSize,
              total: tablePageInfo.totalSize
            }}
          />
        </Flex>
      </Flex>
      <ImageCategoryModal />
    </div>
  )
}

export default ImageCategory
