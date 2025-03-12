import React, { useEffect, useState } from 'react'
import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { Button, message, Tag } from 'antd'
import { RoleListPageReq, SysRoleVO, TableRoleType } from '@/types/apis/sys/role/roleType'
import { TablePageInfoType } from '@/types/base'
import { PaginationProps, Popconfirm, Space } from 'antd/lib'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons'
import { TableRowSelection } from 'antd/lib/table/interface'
import { PageDictDetailReq, PageDictDetailResp, TableDictDetailType } from '@/types/apis/sys/dict/dictType'
import { dictApi } from '@/apis/sys/dictApi'

const ProTableDemo = () => {
  const [roleStyle, setRoleStyle] = useState<SizeType>('small')
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dictDetailDataSource, setDictDetailDataSource] = useState<readonly TableDictDetailType[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })

  /**
   * 表格为checkbox时启用
   */
  const rowSelection: TableRowSelection<TableRoleType> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  const columns: ProColumns<TableDictDetailType>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '字典名称',
      width: '40%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      }),
      editable: (text, record, index) => index !== 0
    },
    {
      key: 'type',
      title: '类型值',
      dataIndex: 'type',
      width: '20%',
      formItemProps: (form, { rowIndex }) => ({
        rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
      })
    },
    {
      key: 'remark',
      title: '备注',
      dataIndex: 'remark',
      width: '20%',
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
        <Space key={`edit-${record.key}`} size={roleStyle}>
          <Button
            size={roleStyle}
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
            <Button size={'small'} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ]
    }
  ]

  useEffect(() => {
    // initData()
    setTableLoading(false)
  }, [])

  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    // const values = form.getFieldsValue()
    // retrieveAclPageList({ ...values, currentPageNum, pageSize })
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  /**
   * 初始化数据
   */
  useEffect(() => {
    setTableLoading(true)
    // load org info list
    initData()

    setTableLoading(false)
  }, [])

  const initData = async () => {
    try {
      /**
       * 分页查询字典明细列表
       */
      const dictDetailList = await retrieveDictDetailPageList({
        dictId: '1334038283956654080',
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
   * 分页查询字典明细列表
   * @param req
   */
  const retrieveDictDetailPageList = async (req: PageDictDetailReq): Promise<PageDictDetailResp[]> => {
    const res = await dictApi.retrievePageDictDetailList({ ...req })
    const { code, msg, data } = res
    if (code !== 200) {
      return []
    }
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
      ...rest
    }))
    return res
  }

  const deleteDetailConfirm = async (id: string) => {
    const res = await dictApi.deleteDictDetail({ surrogateId: id })
    const { code, msg, data } = res
    if (code !== 200) {
      return
    }
    message.success(msg)
    initData()
  }

  const abc = () => {
    // message.info('测试')
    initData()
  }

  return (
    <div>
      <EditableProTable
        rowKey='key'
        headerTitle='字典明细'
        bordered={true}
        // maxLength={5} // 最大的行数, 到达最大行数新建按钮会自动消失
        recordCreatorProps={{
          position: 'bottom',
          record: () => ({
            key: (Math.random() * 10).toFixed(0), // 生成唯一的 key
            parentId: '',
            name: '',
            type: -1,
            remark: ''
          })
        }}
        loading={tableLoading}
        size={roleStyle}
        columns={columns}
        value={dictDetailDataSource}
        onChange={abc}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, rowData, row) => {
            console.log('--> data:', { ...rowData })
            // console.log('--> row:', { ...row })
            // 这里可以添加保存逻辑, 例如发送请求到服务器

            if (rowData.key.length < 3) {
              // 新增
              const res = await dictApi.addDictDetail({
                parentId: '1334038283956654080',
                type: rowData.type,
                name: rowData.name,
                remark: rowData.remark
              })
              const { code, msg, data } = res
              if (code !== 200) {
                return
              }
              message.success(msg)
            } else {
              const res = await dictApi.editDictDetail({
                surrogateId: rowData.key,
                parentId: '1334038283956654080',
                type: rowData.type,
                name: rowData.name,
                remark: rowData.remark
              })
              const { code, msg, data } = res
              if (code !== 200) {
                return
              }
              message.success(msg)
            }
          },
          onChange: setEditableRowKeys // 更新可编辑行的函数
        }}
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
  )
}

export default ProTableDemo
