import React, { useEffect, useState } from 'react'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { usePermissionsStore } from '@/store/sys/authStore'
import { DiaryPageReq, DiaryPageResp, DiaryTableType } from '@/types/apis/blog/diary'
import { Flex, Form, Input, PaginationProps, Popconfirm, Table } from 'antd'
import { _QUERY_DIARY_ACL, AddDiaryBtnAcl, EditDiaryBtnAcl, QueryDiaryBtnAcl } from './auth/authButton'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useDiaryModalStore, useDiaryStore } from '@/store/blog/diaryStore'
import diaryApi from '@/apis/blog/diary/diaryApi'
import DiaryModal from './DiaryModal'
import { useMessage } from '@/components/message/MessageProvider'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'
import { useForm } from 'antd/es/form/Form'

const Diary = () => {
  const messageApi = useMessage()
  const { btnSignSet } = usePermissionsStore()
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const [form] = useForm()
  const [rowSelectType] = useState<'checkbox' | 'radio'>('checkbox')
  const { diaryPageList, setDiaryPageList, setTablePageInfo, tablePageInfo, tableLoading } = useDiaryStore()
  const { openModal, setOpenModal, action, inputDisabled, setInputDisabled, api, title, setDiaryState } =
    useDiaryModalStore()

  const columnsDiary: ColumnsType<DiaryTableType> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: '标题',
      width: '10%'
    },
    {
      key: 'content',
      dataIndex: 'content',
      title: '内容',
      width: '20%'
    },
    {
      key: 'creatorName',
      dataIndex: 'creatorName',
      title: '创建人',
      width: '10%'
    },
    {
      key: 'operatorName',
      dataIndex: 'operatorName',
      title: '修改人',
      width: '10%'
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      width: '15%'
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '修改时间',
      width: '15%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '20%',
      render: (_: object, record) => (
        <Flex vertical={false} gap={8}>
          <EditDiaryBtnAcl
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editItem(record.id, record)}
          />

          <Popconfirm
            title='删除标签'
            description={`确定要删除 [${record.title}] 这篇日记吗?`}
            onConfirm={() => deleteItemConfirm(record.id)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <EditDiaryBtnAcl size={btnSize} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Flex>
      )
    }
  ]

  useEffect(() => {
    initDiaryData()
  }, [])

  const initDiaryData = async () => {
    await retrieveDiaryPageList({ ...tablePageInfo })
  }

  /**
   * query diary list
   * @param req
   * @returns
   */
  const retrieveDiaryPageList = async (req: DiaryPageReq) => {
    const { code, data } = await diaryApi.retrieveDiaryPageList(req)
    if (code !== 200) {
      setDiaryPageList([])
      return
    }

    const diaryList = data.list.map(({ id, ...rest }) => ({
      key: id,
      id,
      ...rest
    }))

    setDiaryPageList(diaryList)
    setTablePageInfo({
      ...tablePageInfo,
      totalSize: data.total,
      pageSize: req.pageSize,
      currentPageNum: req.currentPageNum
    })
  }

  const rowSelection: TableRowSelection<DiaryTableType> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DiaryTableType[]) => {},
    getCheckboxProps: (record: DiaryTableType) => ({})
  }

  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    retrieveDiaryPageList({ ...values, currentPageNum, pageSize })
  }

  const createDiary = () => {
    setDiaryState({
      api: diaryApi,
      title: '新增日记',
      action: 'create',
      openModal: true,
      inputDisabled: false,
      update: () => {
        retrieveDiaryPageList({ ...tablePageInfo })
      }
    })
  }

  const editItem = (id: string, record: DiaryTableType) => {
    setDiaryState({
      api: diaryApi,
      title: '编辑日记',
      action: 'edit',
      openModal: true,
      inputDisabled: false,
      update: () => {
        retrieveDiaryPageList({ ...tablePageInfo })
      }
    })
  }

  const deleteItemConfirm = async (id: string) => {
    const { code, msg } = await diaryApi.delete({ id })
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    retrieveDiaryPageList({ ...tablePageInfo })
  }

  const search = () => {}

  const resetSearch = () => {
    form.resetFields()
    retrieveDiaryPageList({ ...tablePageInfo })
  }

  return (
    <div className='blog-diary-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true}>
        {btnSignSet.has(_QUERY_DIARY_ACL) ? (
          <Form form={form}>
            <Flex gap='small'>
              <Form.Item name={'keyWord'} label='关键字'>
                <Input size={inputSize} placeholder='搜索关键字' />
              </Form.Item>
              <Form.Item>
                <QueryDiaryBtnAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={search} />
              </Form.Item>
              <Form.Item>
                <QueryDiaryBtnAcl text='重置' size={btnSize} type='primary' onClick={resetSearch} />
              </Form.Item>
            </Flex>
          </Form>
        ) : null}
        <div className='operation-btn'>
          <Flex gap='small'>
            <AddDiaryBtnAcl text='新增' size={btnSize} type='primary' icon={<PlusOutlined />} onClick={createDiary} />
          </Flex>
        </div>
        <Flex className='list' gap='middle' vertical={true}>
          <Table
            size={tableSize}
            bordered={true}
            rowSelection={{
              type: rowSelectType,
              ...rowSelection
            }}
            // loading={tableLoading}
            columns={columnsDiary}
            dataSource={diaryPageList}
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
      <DiaryModal />
    </div>
  )
}

export default Diary
