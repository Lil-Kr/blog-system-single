import { CardActionProps } from '@/types/component/card'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Card, Image } from 'antd'
const { Meta } = Card
import React from 'react'

const CardAction = (props: { cardItem: CardActionProps }) => {
  const { cardItem } = props
  return (
    <Card
      // title={'abc'}
      // style={{ width: 200, height: 230 }}
      cover={<img height={200} style={{ objectFit: 'cover' }} src={cardItem.imageUrl} />}
      actions={[<SettingOutlined key='setting' />, <EditOutlined key='edit' />, <EllipsisOutlined key='ellipsis' />]}
    >
      <Meta title={cardItem.imageName} />
    </Card>
  )
}

export default CardAction
