import { imageInfoApi } from '@/apis/image/imageInfoApi'
import { CardActionProps } from '@/types/component/card'
import { CopyFilled, CopyOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons'
import { useMessage } from '@/components/message/MessageProvider'
import { Card } from 'antd/lib'
const { Meta } = Card

const env = import.meta.env

const CardAction = (props: { cardItem: CardActionProps }) => {
  const messageApi = useMessage()
  const { cardItem } = props

  const copy = () => {
    console.log('copy')
  }

  const del = async () => {
    const res = await imageInfoApi.delete({ surrogateId: cardItem.id })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
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
