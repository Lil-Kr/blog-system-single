import { Card, List } from 'antd'
import React from 'react'
import { CardAction } from '../card'
import { CardActionProps } from '@/types/component/card'

const ListCardPage = (props: { data: CardActionProps[] }) => {
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
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <CardAction cardItem={item as CardActionProps} />
          </List.Item>
        )}
        pagination={{
          size: 'small',
          position: 'bottom',
          align: 'start',
          pageSize: 10,
          showQuickJumper: true,
          showTotal: (total, range) => `共 ${total} 条数据`,
        }}
      />
    </div>
  )
}

export default ListCardPage
