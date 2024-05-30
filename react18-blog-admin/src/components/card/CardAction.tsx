import { CardActionProps } from '@/types/component/card'
import { CopyFilled, CopyOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons'
import { Card, Image } from 'antd'
const { Meta } = Card
import React from 'react'

const CardAction = (props: { cardItem: CardActionProps }) => {
  const { cardItem } = props

  const copy = () => {
    console.log('copy')
  }

  const del = () => {
    console.log('del')
  }

  const copyLink = () => {
    console.log('copyLink')
  }

  const setFacePicture = () => {
    console.log('setFacePicture')
  }

  return (
    <Card
      // title={'abc'}
      // style={{ width: 200, height: 230 }}
      cover={<img height={150} style={{ objectFit: 'cover' }} src={cardItem.imageUrl} />}
      actions={[
        <PictureOutlined alt='设为封面' onClick={setFacePicture} />,
        <CopyOutlined onClick={copy} />,
        <CopyFilled onClick={copyLink} />,
        <DeleteOutlined onClick={del} />
      ]}
    >
      <Meta title={cardItem.imageName} />
    </Card>
  )
}

export default CardAction
