import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons/lib/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  PaginationProps,
  Popconfirm,
  Row,
  Space,
  Splitter,
  Table,
  Tag,
  Tooltip,
  Typography
} from 'antd/lib'
import DirectoryTree from 'antd/lib/tree/DirectoryTree'
import { SelectOptionType, SelectTreeNodeType } from '@/types/apis'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useForm } from 'antd/lib/form/Form'
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface'
import { TablePageInfoType } from '@/types/base'
import { createStyles } from 'antd-style'

// const useStyle = createStyles(({ css, token }) => {
// const { antCls } = token
//   const antCls = token['antCls'] || ''
//   return {
//     customTable: css`
//       ${antCls}-table {
//         ${antCls}-table-container {
//           ${antCls}-table-body,
//           ${antCls}-table-content {
//             scrollbar-width: thin;
//             scrollbar-color: #eaeaea transparent;
//             scrollbar-gutter: stable;
//           }
//         }
//       }
//     `
//   }
// })

const Desc: React.FC<Readonly<{ text?: string | number }>> = props => (
  <Flex justify='center' align='center' style={{ height: '100%' }}>
    <Typography.Title type='secondary' level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
)

type RoleItem = {
  key: string
  aclType: string
  name: string
  status: number
  remark: string
}
const generateAclArray = (count: number): RoleItem[] => {
  return Array.from({ length: count }).reduce<RoleItem[]>((acc, _, i) => {
    acc.push({
      key: (i + 1).toString(),
      name: `Role ${i + 1}`,
      aclType: `User ${i + 1}`,
      status: (i + 1) % 2 === 0 ? 1 : 0,
      remark: `Remark for item ${i + 1}`
    })
    return acc
  }, [])
}

const dataSource: any[] = generateAclArray(40)

const Role = () => {
  const columns: ColumnsType<any> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '角色名',
      width: '40%',
      fixed: 'left'
    },
    {
      key: 'aclType',
      dataIndex: 'aclType',
      title: '权限类型',
      width: '20%',
      render: (_, record: any) => <Tag color='volcano'>{record.aclType}</Tag>
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      width: '10%',
      render: (_, record: any) => {
        let tagColor = 'green' // 默认颜色
        let statusText = '正常' // 默认文本
        // 根据状态设置不同的颜色和文本
        switch (record.status) {
          case 0:
            tagColor = 'green'
            statusText = '正常'
            break
          case 1:
            tagColor = 'red'
            statusText = '冻结'
            break
          default:
            tagColor = 'gray'
            statusText = '未知'
            break
        }
        return (
          <Tag key={record.key} color={tagColor}>
            {statusText}
          </Tag>
        )
      }
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: '10%',
      fixed: 'right',
      render: (_: object, record: any) => (
        <Space size={roleStyle}>
          <Button
            size={roleStyle}
            name='edit'
            type='link'
            shape='circle'
            icon={<EditOutlined />}
            // onClick={() => editItem(record.key ?? '', record)}
          />
          <Popconfirm
            title='删除标签'
            description={`确定要删除 [${record.name}] 这个这个组织吗?`}
            // onConfirm={() => deleteItemConfirm(record)}
            onCancel={() => {}}
            okText='确定'
            cancelText='取消'
          >
            <Button size={'small'} name='delete' type='link' shape='circle' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const MemoTooltip = Tooltip || React.memo(Tooltip)
  const [roleStyle, setRoleStyle] = useState<SizeType>('small')
  const [form] = useForm()
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 10,
    totalSize: 0
  })

  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {}
  }

  const selectTreeNode = async (node: SelectTreeNodeType) => {
    // setSelectedInfo(prevState => ({
    //   value: node.key.toString(),
    //   label: node.name,
    //   selectKeys: [node.key.toString()]
    // }))
    // retrieveAclPageList({
    //   aclModuleId: node.key.toString(),
    //   currentPageNum: 1,
    //   pageSize: tablePageInfo.pageSize
    // })
  }

  /**
   * page component
   * @param currentPageNum
   * @param pageSize
   */
  const onChangePageInfo: PaginationProps['onChange'] = (currentPageNum, pageSize) => {
    const values = form.getFieldsValue()
    // retrieveAclPageList({ ...values, currentPageNum, pageSize })
  }

  /**
   * page component
   * @param currentPageNum
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPageNum, pageSize) => {
    setTablePageInfo(prevState => ({
      ...prevState,
      pageSize
    }))
  }

  return (
    <div className='sys-role-warpper' style={{ height: '100%', width: '100%' }}>
      <Flex gap='middle' vertical={true} style={{ height: '100%', width: '100%' }}>
        {/* <Row gutter={4} style={{ height: '100%' }}>
        </Row> */}

        <Splitter style={{ height: '100%', width: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: 'auto' }}>
          <Splitter.Panel defaultSize='20%' min='20%' max='70%'>
            <Divider orientation='left'>{'角色信息'}</Divider>
            <Table
              key={1}
              bordered={true}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection
              }}
              loading={false}
              columns={columns}
              dataSource={dataSource}
              size={roleStyle}
              pagination={{
                size: 'small',
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
          </Splitter.Panel>
          <Splitter.Panel>
            <Desc text='Second' />
          </Splitter.Panel>
        </Splitter>
        {/* <AclModuleModal
          mRef={aclModuleRef}
          update={() => {
            retrieveAclModuleTreeList()
          }}
        />
        <AclModal
          mRef={aclRef}
          update={() => {
            // 只需要渲染权限点列表即可
            retrieveAclPageList({ currentPageNum: 1, pageSize: tablePageInfo.pageSize })
          }}
        /> */}
      </Flex>
    </div>
  )
}

export default Role
