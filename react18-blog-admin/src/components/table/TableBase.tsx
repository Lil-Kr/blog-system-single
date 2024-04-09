import { TableBaseParames } from '@/types/component/table'
import { PaginationProps, Table } from 'antd'
import React, { useState } from 'react'

const TableBase = (props: TableBaseParames) => {
  const { tableId, style, rowSelection, loading, columns, dataSource, pagination } = props

  const [pageSize, setPageSize] = useState<number>(5)

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
  }

  /**
   * change pageSize
   * pageSize 变化的回调
   * @param current
   * @param pageSize
   */
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageSize(pageSize)
  }

  return (
    <div className='table-base-component-customize'>
      <Table
        key={tableId}
        style={style}
        rowSelection={rowSelection}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        // pagination={{ pageSize: pageSize, total: totalSize }} // 分页使用
        // pagination={{
        //   hideOnSinglePage: false, // only one pageSize then hidden Paginator
        //   pageSizeOptions: [10, 20, 50], // specify how many items can be displayed on each page
        //   onChange: onChange,
        //   onShowSizeChange: onShowSizeChange,
        //   showSizeChanger: true,
        //   pageSize: pageSize,
        //   total: totalSize
        // }}
        pagination={pagination}
        // scroll={{ y: 1000 }}
      />
    </div>
  )
}

export default TableBase
