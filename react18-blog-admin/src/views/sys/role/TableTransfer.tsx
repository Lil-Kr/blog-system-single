import React, { useEffect, useState } from 'react'
import { Table, Transfer } from 'antd/lib'
import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd/lib'
import { RoleUserTableType, TableRowSelection, TableTransferProps } from '@/types/apis/sys/role/roleType'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { TablePageInfoType } from '@/types/base'
import { PaginationProps } from 'antd/lib'
import { useRoleAclStore } from '@/store/sys/roleStore'
import { useGlobalStyleStore } from '@/store/global/globalStore'

const TableTransfer: React.FC<TableTransferProps> = props => {
  const { leftColumns, rightColumns, dataSource, ...restProps } = props

  const { tableSize } = useGlobalStyleStore()
  const [tablePageInfo, setTablePageInfo] = useState<TablePageInfoType>({
    currentPageNum: 1,
    pageSize: 20,
    totalSize: 0
  })

  return (
    <Transfer {...restProps} style={{ width: '100%' }} dataSource={dataSource}>
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns
        const rowSelection: TableRowSelection<RoleUserTableType> = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, 'replace')
          },
          selectedRowKeys: listSelectedKeys,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
        }

        return (
          <Table
            size={tableSize}
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            bordered={true}
            columns={columns}
            dataSource={filteredItems}
            style={{ pointerEvents: listDisabled ? 'none' : undefined }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) {
                  return
                }
                onItemSelect(key ?? '', !listSelectedKeys.includes(key ?? ''))
              }
            })}
            pagination={{
              size: 'small',
              position: ['bottomLeft'],
              showQuickJumper: false, // 跳转指定页面
              showSizeChanger: true,
              hideOnSinglePage: false,
              pageSizeOptions: [10, 20, 50],
              // onChange: onChangePageInfo,
              // onShowSizeChange: onShowSizeChange,
              pageSize: tablePageInfo.pageSize, // 每页条数
              total: tablePageInfo.totalSize // 总条数
            }}
          />
        )
      }}
    </Transfer>
  )
}
export default TableTransfer
