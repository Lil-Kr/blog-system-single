import { List } from 'antd/lib'
import { CardActionProps } from '@/types/component/card'
import { PageData } from '@/types/base/response'
import CardAction from './CardAction'

const ListCardPage = (props: { data: PageData; update: () => void }) => {
  const { data, update } = props
  return (
    <>
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
            <CardAction cardItem={item as CardActionProps} update={update} />
          </List.Item>
        )}
        pagination={{
          size: 'small',
          position: 'bottom',
          align: 'start',
          showQuickJumper: true,
          showTotal: (total, range) => `共 ${data.total} 条数据`,
          pageSize: 20,
          total: data.total
        }}
      />
    </>
  )
}

export default ListCardPage
