import { CardActionProps } from '@/types/component/card'
import { CopyFilled, CopyOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons'
import { Card, Image } from 'antd'
const { Meta } = Card
import React from 'react'

const env = import.meta.env

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
      cover={
        <img style={{ height: 250, objectFit: 'cover' }} src={env.VITE_BACKEND_IMAGE_BASE_API + cardItem.imageUrl} />
      }
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
