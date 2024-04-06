import { TablePaginationConfig } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface'

export interface TableBaseParames<T = any> {
  tableId: string | number | 1
  style: React.CSSProperties
  rowSelection: TableRowSelection<T>
  loading: boolean | false
  columns: ColumnsType<any>
  dataSource: T[] | []
  pagination: false | Pagination
}

export interface Pagination extends TablePaginationConfig {
  hideOnSinglePage: boolean | false
  pageSizeOptions: Array<number>
  pageSize: number | 20
  total: number | 0
}
