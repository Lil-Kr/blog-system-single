import React, { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, PaginationProps, Popconfirm, Space, Table, Tag } from 'antd'
import { LabelListTableType, LabelPageReq, LabelReq, LabelTableResq } from '@/types/apis/blog/labelType'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'
import { IAction } from '@/types/component/modal'
import { useMessage } from '@/components/message/MessageProvider'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import labelApi from '@/apis/blog/label/labelApi'
import { labelTransformToTable } from '@/utils/blog/labelTransform'
import { useLabelModalStore, useLabelStore } from '@/store/blog/labelStore'
import LabelModal from './LabelModal'

const BlogLabel = () => {
  const messageApi = useMessage()
  const [form] = useForm()
  const { labelPageList, setLabelPageList, tablePageInfo, setTablePageInfo, rowKeys, setRowKeys, rowSelectType } =
    useLabelStore()
  const { setLabelState } = useLabelModalStore()
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()

  const labelRef = useRef<{ open: (type: IAction, data?: LabelListTableType) => void }>()

  const columnsLable: ColumnsType<LabelListTableType> = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: '5%'
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '标签名',
      width: '30%',
      render: (_, record) => (
        <Tag key={record.key} color={record.color}>
          {record.name}
        </Tag>
      )
    },
    {
      key: 'colorText',
      dataIndex: 'colorText',
      title: '展示颜色',
      width: '20%'
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: '25%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '20%',
      render: (_: object, record) => (
        <Space size='middle'>
          <Button
            size={btnSize}
            name='look'
            type='link'
            shape='circle'
            icon={<SearchOutlined />}
            onClick={() => lookItem(record.key, record)}
          />
          <Button
            size={btnSize}
            name='edit'
            type='link'
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
            <Button size={btnSize} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  /**
   * 初始化
   */
  useEffect(() => {
    initLabelList({ keyWords: '', pageSize: tablePageInfo.pageSize, currentPageNum: tablePageInfo.currentPageNum })
  }, [])

  /**
   * 删除确认提示
   * @param record
   */
  const deleteItemConfirm = async (record: LabelListTableType) => {
    const res = await labelApi.delete({ surrogateId: record.key })
    if (res.code !== 200) {
      return
    }
    messageApi?.success('删除成功')

    initLabelList({ keyWords: '', pageSize: tablePageInfo.pageSize, currentPageNum: tablePageInfo.currentPageNum })
  }

  /**
   * lookItem
   * @param key
   * @param record
   */
  const lookItem = (key: string, record: LabelListTableType) => {
    const req = { ...record }
    setLabelState({
      api: labelApi,
      title: '编辑标签',
      action: 'edit',
      openModal: true,
      modalStyle: { maxWidth: '50vw' },
      inputDisabled: true,
      labelData: req
    })
  }

  /**
   * edit
   * @param key
   * @param record
   */
  const editItem = (key: string, record: LabelListTableType) => {
    const req = { ...record }
    setLabelState({
      api: labelApi,
      title: '编辑标签',
      action: 'edit',
      openModal: true,
      modalStyle: { maxWidth: '50vw' },
      inputDisabled: false,
      labelData: req
    })
  }

  /**
   * create
   */
  const createLabel = () => {
    setLabelState({
      api: labelApi,
      title: '添加标签',
      action: 'create',
      openModal: true,
      modalStyle: { maxWidth: '50vw' },
      inputDisabled: false
    })
  }

  /**
   * deleteBatch
   */
  const deleteBatch = async () => {
    if (!rowKeys || rowKeys.length < 1) {
      messageApi?.warning('请选择待删除项')
      return
    }

    const ids = rowKeys.join(',')
    const res = await labelApi.deleteBatch({ surrogateId: ids })
    if (res.code !== 200) {
      messageApi?.error(res.msg)
      return
    }
    initLabelList({ keyWords: '', pageSize: tablePageInfo.pageSize, currentPageNum: tablePageInfo.currentPageNum })
  }

  /**
   * 搜索
   */
  const search = () => {}

  /**
   * 多选
   */
  const rowSelection: TableRowSelection<LabelListTableType> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: LabelListTableType[]) => {
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: LabelListTableType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  /**
   * 获取标签列表, 不分页
   */
  const initLabelList = async (req: LabelPageReq) => {
    const values = form.getFieldsValue()
    const labelPageList = await retrieveLabelPageList({ ...values, ...req })
    const labelTableList = labelTransformToTable(labelPageList)
    setLabelPageList(labelTableList)
  }

  /**
   * 分页查询-标签列表
   * @param req
   * @returns
   */
  const retrieveLabelPageList = async (req: LabelPageReq): Promise<LabelTableResq[]> => {
    const res = await labelApi.retrieveLabelPageList(req)
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    setTablePageInfo({
      ...tablePageInfo,
      totalSize: data.total,
      pageSize: req.pageSize,
      currentPageNum: req.currentPageNum
    })
    return data.list
  }

  /**
   * 翻页
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    initLabelList({ ...values, pageSize, currentPageNum })
  }

  return (
    <div className='blog-label-warpper'>
      <Flex gap='middle' vertical={true}>
        <Form form={form}>
          <Flex gap='small'>
            <Form.Item name={'keyWord'} label='搜索关键字'>
              <Input size={inputSize} placeholder='搜索关键字' />
            </Form.Item>
            <Form.Item>
              <Button size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
            </Form.Item>
          </Flex>
        </Form>
        <div className='operation-btn'>
          <Flex gap='small'>
            <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createLabel}>
              {'新增'}
            </Button>
            <Button size={btnSize} type='primary' icon={<DeleteOutlined />} danger onClick={deleteBatch}>
              {'删除'}
            </Button>
          </Flex>
        </div>
        <Flex className='list' gap='middle' vertical={true}>
          <Table
            key={1}
            size={tableSize}
            bordered={true}
            rowSelection={{
              type: rowSelectType,
              ...rowSelection
            }}
            // loading={tableLoading}
            columns={columnsLable}
            dataSource={labelPageList}
            pagination={{
              position: ['bottomLeft'],
              hideOnSinglePage: false, // only one pageSize then hidden Paginator
              pageSizeOptions: [10, 20, 50], // specify how many items can be displayed on each page
              onChange: onChangePageInfo, // just use this pagination function
              showSizeChanger: true,
              pageSize: tablePageInfo.pageSize,
              total: tablePageInfo.totalSize
            }}
          />
        </Flex>
      </Flex>
      <LabelModal
        update={() => {
          initLabelList({
            keyWords: '',
            pageSize: tablePageInfo.pageSize,
            currentPageNum: tablePageInfo.currentPageNum
          })
        }}
      />
    </div>
  )
}

export default BlogLabel
