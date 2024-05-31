import { Card, List } from 'antd'
import React from 'react'
import { CardAction } from '../card'
import { CardActionProps } from '@/types/component/card'
import { PageData } from '@/types/base/response'

const ListCardPage = (props: { data: PageData }) => {
  const { data } = props
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 6
        }}
        dataSource={data.list}
        renderItem={item => (
          <List.Item>
            <CardAction cardItem={item as CardActionProps} />
          </List.Item>
        )}
        pagination={{
          size: 'small',
          position: 'bottom',
          align: 'start',
          // showQuickJumper: true,
          // showTotal: (total, range) => `共 ${data.total} 条数据`,
          pageSize: 5,
          total: data.total
        }}
      />
    </div>
  )
}

export default ListCardPage
