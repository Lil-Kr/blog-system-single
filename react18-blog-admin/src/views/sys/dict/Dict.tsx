import React, { useEffect, useRef, useState } from 'react'
import { TablePageInfoType } from '@/types/base'
import { AlignLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Drawer, Flex, Form, Input, PaginationProps, Popconfirm, Tag } from 'antd/lib'
import Table, { ColumnsType } from 'antd/lib/table'
import { useForm } from 'antd/lib/form/Form'
import { TableRowSelection } from 'antd/es/table/interface'
import DictModal from '@/components/modal/DictModal'
import { IModalRequestAction, IModalParams, IAction, IModalStyle } from '@/types/component/modal'
import { dictApi } from '@/apis/sys/dictApi'
import {
  DictPageListReq,
  DictPageListResp,
  PageDictDetailReq,
  PageDictDetailResp,
  TableDictDetailType,
  TableDictType
} from '@/types/apis/sys/dict/dictType'
import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { useMessage } from '@/components/message/MessageProvider'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import {
  _ADD_DICT_DETAIL_ACL,
  _QUERY_DICT_ACL,
  AddDictBtnAcl,
  DelDetailBtnAcl,
  DelDictBtnAcl,
  EditDetailBtnAcl,
  EditDictBtnAcl,
  QueryDictBtnAcl,
  QueryDictDetailBtnAcl
} from './auth/authDictButton'
import { usePermissionsStore } from '@/store/sys/authStore'

const Dict = () => {
  const messageApi = useMessage()
  const { btnSize, tableSize, inputSize } = useGlobalStyleStore()
  const [form] = useForm()
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [dictPageList, setDictPageList] = useState<TableDictType[]>([] as TableDictType[])
  const [dict, setDict] = useState<TableDictType>({} as TableDictType)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const { btnSignSet } = usePermissionsStore()

  /**
   * 处理字典明细的状态
   */
  const [dictDetailDataSource, setDictDetailDataSource] = useState<readonly TableDictDetailType[]>([])

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })
  const [tableDetailPageInfo, setTableDetailPageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })

  // 字典主信息 table
  const columnsDict: ColumnsType<TableDictType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '字典类型',
      width: '20%',
      render: (_: object, record: TableDictType) => <Tag color='blue'>{record.name}</Tag>
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
      width: '15%'
    },
    {
      key: 'updateTime',
      dataIndex: 'updateTime',
      title: '修改时间',
      width: '15%'
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      render: (_: object, record: TableDictType) => (
        <Flex key={`edit-${record.key}`} vertical={false} gap={2}>
          <QueryDictDetailBtnAcl
            name='detail'
            type='link'
            shape='circle'
            icon={<AlignLeftOutlined />}
            onClick={() => dictDetial(record)}
          />

          <EditDictBtnAcl
            size={btnSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => editDict(record.key ?? '', record)}
          />

          <Popconfirm
            title='删除字典'
            description={`确定要删除 [${record.name}] 这个字典吗?`}
            onConfirm={() => deleteDict(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <DelDictBtnAcl size={btnSize} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Flex>
      )
    }
  ]

  // 字典明细 table
  const columnsDetail: ProColumns<TableDictDetailType>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '字典名称',
      width: '20%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      }),
      render: (text, record) => <Tag color='geekblue'>{record.name}</Tag>
    },
    {
      key: 'type',
      title: '类型值',
      dataIndex: 'type',
      width: '10%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      })
    },
    {
      key: 'remark',
      title: '备注',
      dataIndex: 'remark',
      width: '50%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      })
    },
    {
      key: 'oparet',
      title: '操作',
      dataIndex: 'oparet',
      valueType: 'option',
      width: '20%',
      render: (text, record, _, action) => [
        <Flex key={`edit-${record.key}`} vertical={false} gap={4}>
          <EditDetailBtnAcl
            size={tableSize}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => {
              action?.startEditable?.(record.key)
            }}
          />
          <Popconfirm
            key={`delete-${record.key}`} // 添加唯一的 key
            title='删除明细'
            description={`确定要删除 [${record.name}] 这个明细吗?`}
            onConfirm={() => deleteDetailConfirm(record.key)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <DelDetailBtnAcl size={'small'} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Flex>
      ]
    }
  ]

  const dictRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      data?: any
    ) => void
  }>()

  useEffect(() => {
    initInfo()
  }, [])

  /**
   * 初始化数据
   */
  const initInfo = async () => {
    setTableLoading(true)

    // 加载字典列表
    retrieveDictList({ keyWords: '', currentPageNum: tablePageInfo.currentPageNum, pageSize: tablePageInfo.pageSize })

    setTableLoading(false)
  }

  /**
   * 加载字典列表
   * @param dictPageReq
   * @returns
   */
  const retrieveDictList = async (dictPageReq: DictPageListReq) => {
    try {
      const dictList = retrieveDictPageList({ ...dictPageReq })
      const res = transformDictList(await dictList)
      setDictPageList(res)
    } catch (error) {}
  }

  const retrieveDictPageList = async (req: DictPageListReq): Promise<DictPageListResp[]> => {
    const dictPageList = await dictApi.retrieveDictPageList({ ...req })
    const { code, data, msg } = dictPageList
    if (code !== 200) {
      return []
    }
    setTablePageInfo(prevState => ({
      ...prevState,
      totalSize: data.total
    }))
    return data.list
  }

  const transformDictList = (data: DictPageListResp[]): TableDictType[] => {
    const list: TableDictType[] = data.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId,
      ...rest
    }))
    return list
  }

  /**
   * 查询字典
   */
  const searchDict = async () => {
    let req = form.getFieldsValue()
    const searchParam = { ...req, currentPageNum: 1, pageSize: tablePageInfo.pageSize }
    const dictList = retrieveDictPageList({ ...searchParam })
    const res = transformDictList(await dictList)
    setDictPageList(res)
    setTablePageInfo(prevState => ({
      ...prevState,
      totalSize: tablePageInfo.totalSize
    }))
  }

  /**
   * 置空
   * @returns
   */
  const resetDict = async () => {
    form.resetFields()
    const dictPageList = await dictApi.retrieveDictPageList({
      keyWords: '',
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
    const { code, data } = dictPageList
    if (code !== 200) {
      return
    }
    const list: TableDictType[] = data.list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId,
      ...rest
    }))
    setDictPageList(list)
    setTablePageInfo(prevState => ({
      ...prevState,
      totalSize: data.total
    }))
  }

  /**
   * 添加字典
   */
  const addDict = () => {
    dictRef.current?.open(
      { api: dictApi },
      { title: '添加' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } }
    )
  }

  /**
   * 编辑字典
   * @param key
   * @param record
   */
  const editDict = (key: string, record: TableDictType) => {
    const req: TableDictType = {
      key,
      ...record
    }
    dictRef.current?.open(
      { api: dictApi },
      { title: '编辑' },
      { action: 'edit', open: true }, // create | edit | look
      { style: { maxWidth: '40vw' } },
      { ...req }
    )
  }

  /**
   * 删除字典主信息
   * @param record
   * @returns
   */
  const deleteDict = async (record: TableDictType) => {
    const res = await dictApi.delete({ surrogateId: record.key ?? '' })
    const { code, msg } = res
    if (code !== 200) {
      return
    }

    retrieveDictList({
      currentPageNum: 1,
      pageSize: tablePageInfo.pageSize
    })
  }

  /**
   * dict page component
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = async (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    const searchParam = { ...values, currentPageNum: currentPageNum, pageSize }

    const dictList = retrieveDictPageList({ ...searchParam })
    const res = transformDictList(await dictList)
    setDictPageList(res)
  }
  /**
   * dict page component
   * @param currentPageNum
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  const rowSelection: TableRowSelection<TableDictType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  /** ================ detail ==================== */

  /**
   * 查看字典明细
   * @param record
   */
  const dictDetial = async (record: TableDictType) => {
    setEditableRowKeys([])
    const dictDetailList = await retrieveDictDetailPageList({
      dictId: record.key ?? '',
      currentPageNum: 1,
      pageSize: tableDetailPageInfo.pageSize
    })
    const list = transformDictDetalPageList(dictDetailList)
    setDictDetailDataSource(list)
    setDict(record)
    setOpenDrawer(true)
  }

  /**
   * 分页查询字典明细
   */
  const initDetailData = async () => {
    try {
      /**
       * 分页查询字典明细列表
       */
      const dictDetailList = await retrieveDictDetailPageList({
        dictId: dict.surrogateId,
        currentPageNum: 1,
        pageSize: tablePageInfo.pageSize
      })
      const list = transformDictDetalPageList(dictDetailList)
      setDictDetailDataSource(list)
    } catch (error) {
      console.error('Failed to retrieve role list:', error)
    }
  }

  /**
   * 刷新字典明细列表
   */
  const refreshDictDetail = async () => {
    setEditableRowKeys([])
    // 刷新字典明细列表
    const dictDetailList = await retrieveDictDetailPageList({
      dictId: dict.surrogateId,
      currentPageNum: 1,
      pageSize: tableDetailPageInfo.pageSize
    })
    const list = transformDictDetalPageList(dictDetailList)
    setDictDetailDataSource(list)
  }

  /**
   * 打开或关闭抽屉
   */
  const onDrawerClose = () => {
    setOpenDrawer(false)
    setEditableRowKeys([])
  }

  /**
   * 分页查询字典明细列表
   * @param req
   */
  const retrieveDictDetailPageList = async (req: PageDictDetailReq): Promise<PageDictDetailResp[]> => {
    const res = await dictApi.retrievePageDictDetailList({ ...req })
    const { code, data } = res
    if (code !== 200) {
      return []
    }
    setTableDetailPageInfo(prevState => ({
      ...prevState,
      totalSize: data.total
    }))
    return data.list
  }

  /**
   * 转换明细table
   * @param list
   * @returns
   */
  const transformDictDetalPageList = (list: PageDictDetailResp[]): TableDictDetailType[] => {
    const res = list.map(({ surrogateId, ...rest }) => ({
      key: surrogateId,
      surrogateId,
      ...rest
    }))
    return res
  }

  /**
   * 删除字典明细确认弹窗
   * @param id
   * @returns
   */
  const deleteDetailConfirm = async (id: string) => {
    const res = await dictApi.deleteDictDetail({ surrogateId: id })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    initDetailData()
  }

  /**
   * 修改完明细之后刷新
   */
  const refreash = () => {
    initDetailData()
  }

  /**
   * dict page component
   * @param currentPageNum
   * @param pageSize
   */
  const onChangeDetailPageInfo: PaginationProps['onChange'] = async (currentPageNum, pageSize) => {
    const detailList = retrieveDictDetailPageList({ dictId: dict.surrogateId, currentPageNum, pageSize })
    const details = transformDictDetalPageList(await detailList)
    setDictDetailDataSource(details)
    setTableDetailPageInfo(prevState => ({
      ...prevState,
      currentPageNum,
      pageSize
    }))
  }
  /**
   * dict page component
   * @param currentPageNum
   * @param pageSize
   */
  const onShowDetailSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTableDetailPageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  return (
    <div className='sys-dict-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        {btnSignSet.has(_QUERY_DICT_ACL) ? (
          <Form className='operation-btn' form={form}>
            <Flex gap='small'>
              <Form.Item name={'keyWords'} label={'关键字'}>
                <Input size={inputSize} placeholder={'搜索关键字'} />
              </Form.Item>
              <Form.Item>
                <QueryDictBtnAcl size={btnSize} icon={<SearchOutlined />} type='primary' onClick={searchDict} />
              </Form.Item>
              <Form.Item>
                <QueryDictBtnAcl text='重置' size={btnSize} type='primary' onClick={resetDict} />
              </Form.Item>
            </Flex>
          </Form>
        ) : (
          <></>
        )}
        <Flex gap='small'>
          <AddDictBtnAcl text='添加' size={btnSize} type='primary' icon={<PlusOutlined />} onClick={addDict} />
        </Flex>
        <div className='list'>
          <Table
            key={1}
            bordered={true}
            size={tableSize}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            loading={tableLoading}
            columns={columnsDict}
            dataSource={dictPageList}
            pagination={{
              size: 'small',
              position: ['bottomLeft'],
              showQuickJumper: false, // 跳转指定页面
              showSizeChanger: true,
              hideOnSinglePage: false,
              pageSizeOptions: [10, 20, 50],
              onChange: onChangePageInfo,
              onShowSizeChange: onShowSizeChange,
              pageSize: tablePageInfo.pageSize, // 每页条数
              total: tablePageInfo.totalSize // 总条数
            }}
          />
        </div>
        <div className='dict-detail-warpper'>
          <Drawer
            title={'[' + dict.name + '] 明细'}
            placement={'right'}
            width={'50%'} // 设置宽度
            size={'large'}
            closable={true}
            onClose={onDrawerClose}
            open={openDrawer}
            getContainer={false}
            destroyOnClose={true} // 关闭时销毁子元素
          >
            <EditableProTable<TableDictDetailType>
              rowKey='key'
              bordered={true}
              loading={tableLoading}
              size={tableSize}
              recordCreatorProps={
                btnSignSet.has(_ADD_DICT_DETAIL_ACL)
                  ? {
                      position: 'bottom',
                      creatorButtonText: '新增字典明细',
                      record: () => ({
                        key: Date.now().toString(), // 生成唯一的 key, 默认 create
                        surrogateId: null,
                        parentId: dict.surrogateId,
                        name: '',
                        type: 0,
                        remark: ''
                      })
                    }
                  : false
              }
              columns={columnsDetail}
              value={dictDetailDataSource}
              onChange={refreash}
              editable={{
                type: 'single',
                editableKeys: editableKeys, // 控制数据行是否可编辑的函数
                onSave: async (rowKey, rowData, row) => {
                  // 保存字典明细
                  let res
                  if (!rowData.surrogateId) {
                    res = await dictApi.addDictDetail({
                      parentId: dict.surrogateId,
                      type: rowData.type,
                      name: rowData.name,
                      remark: rowData.remark
                    })
                  } else {
                    res = await dictApi.editDictDetail({
                      surrogateId: rowData.key,
                      parentId: dict.surrogateId,
                      type: rowData.type,
                      name: rowData.name,
                      remark: rowData.remark
                    })
                  }

                  const { code, msg } = res
                  if (code !== 200) {
                    return
                  }
                  messageApi?.success(msg)
                  // 刷新字典明细列表
                  refreshDictDetail()
                },
                onChange: setEditableRowKeys // 更新可编辑行的函数
                // onCancel: handleCancel // 点击 [取消] 触发
              }}
              pagination={{
                size: 'small',
                position: ['bottomLeft'],
                showQuickJumper: false, // 跳转指定页面
                showSizeChanger: true,
                hideOnSinglePage: false,
                pageSizeOptions: [10, 20, 50],
                onChange: onChangeDetailPageInfo,
                onShowSizeChange: onShowDetailSizeChange,
                pageSize: tableDetailPageInfo.pageSize, // 每页条数
                total: tableDetailPageInfo.totalSize // 总条数
              }}
            />
          </Drawer>
        </div>
        <DictModal
          mRef={dictRef}
          update={() => {
            retrieveDictList({
              currentPageNum: 1,
              pageSize: tablePageInfo.pageSize
            })
          }}
        />
      </Flex>
    </div>
  )
}

export default Dict
