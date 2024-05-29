import { Card, List } from 'antd'
import React from 'react'
import { CardAction } from '../card'
import { CardActionProps } from '@/types/component/card'

const ListCard = (props: { component: React.ReactNode; data: any }) => {
  const { component } = props
  const data: CardActionProps[] = [
    {
      title: 'Title 1',
      imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      imageName: 'abc',
      actions: []
    },
    {
      title: 'Title 2',
      imageUrl: 'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg',
      imageName: 'abc',
      actions: []
    },
    {
      title: 'Title 3',
      imageUrl: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg',
      imageName: 'abc',
      actions: []
    },
    {
      title: 'Title 4',
      imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      imageName: 'abc',
      actions: []
    },
    {
      title: 'Title 5',
      imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      imageName: 'abc',
      actions: []
    },
    {
      title: 'Title 6',
      imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      imageName: 'abc',
      actions: []
    },
    {
      title: 'Title 6',
      imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      imageName: 'abc',
      actions: []
    }
  ]
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          // column: 6,
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
            {/* <Card title={`item.title`}>Card content</Card> */}
            {/* <CardAction cardItem={item} /> */}
            {component}
          </List.Item>
        )}
      />
    </div>
  )
}

export default ListCard
