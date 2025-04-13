import { imageInfoApi } from '@/apis/image/imageInfoApi'
import { CardActionProps } from '@/types/component/card'
import { CopyFilled, CopyOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons'
import { useMessage } from '@/components/message/MessageProvider'
import { Card, Popconfirm } from 'antd/lib'
import { DelImageButtonAcl } from '@/views/image/auth/authImageButton'
const { Meta } = Card

const env = import.meta.env

const CardAction = (props: { cardItem: CardActionProps }) => {
  const messageApi = useMessage()
  const { cardItem } = props

  const copy = () => {
    console.log('copy')
  }

  const del = async (cardItem: CardActionProps) => {
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

        <Popconfirm
          title='删除图片分类'
          description={`确定要删除 [${cardItem.imageName}] 这张图片吗?`}
          onConfirm={() => del(cardItem)}
          okText='确定'
          cancelText='取消'
        >
          <DelImageButtonAcl danger type='link' size={'small'} icon={<DeleteOutlined />} />
        </Popconfirm>
      ]}
    >
      <Meta title={cardItem.imageName} />
    </Card>
  )
}

export default CardAction
