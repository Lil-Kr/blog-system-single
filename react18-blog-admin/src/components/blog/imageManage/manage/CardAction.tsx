import { imageInfoApi } from '@/apis/image/imageInfoApi'
import { CardActionProps } from '@/types/component/card'
import { CopyFilled, CopyOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons'
import { useMessage } from '@/components/message/MessageProvider'
import { Card, Popconfirm, Tooltip } from 'antd/lib'
import { DelImageButtonAcl, _DEL_IMAGE_ACL, _COPY_IMAGE_ACL } from '@/views/image/auth/authImageButton'
import { useImageManageStore } from '@/store/blog/imageStore'
import { useBlogModalStore } from '@/store/blog/blogStore'
import { usePermissionsStore } from '@/store/sys/authStore'

const env = import.meta.env
const CardAction = (props: { cardItem: CardActionProps; update: () => void }) => {
  const { cardItem, update } = props
  const messageApi = useMessage()
  const { setImageUrl, setImageName, setFacePicture, isCopy } = useImageManageStore()
  const { setOpenImageModal } = useBlogModalStore()
  const { btnSignSet } = usePermissionsStore()

  const del = async (cardItem: CardActionProps) => {
    const res = await imageInfoApi.delete({ surrogateId: cardItem.id })
    const { code, msg } = res
    if (code !== 200) {
      return
    }
    messageApi?.success(msg)
    update()
  }

  const copy = (imageName: string) => {
    setImageUrl(imageName)
    messageApi?.success('复制图片名称成功')
  }

  const copyLink = (imageUrl: string) => {
    setImageName(imageUrl)
    messageApi?.success('复制图片url成功')
  }

  /**
   * 设置为封面
   */
  const setBlogFacePicture = (imageUrl: string) => {
    if (!isCopy) {
      return
    }
    setFacePicture(imageUrl)
    setOpenImageModal(false)
    messageApi?.success('已选择博客封面')
  }

  return (
    <Card
      key={cardItem.id}
      hoverable={true}
      cover={
        <img style={{ height: 250, objectFit: 'cover' }} src={env.VITE_BACKEND_IMAGE_BASE_API + cardItem.imageUrl} />
      }
      actions={[
        <Tooltip placement='top' title={'设为博客封面'} arrow={true}>
          <PictureOutlined alt='设为封面' onClick={() => setBlogFacePicture(cardItem.imageUrl)} />
        </Tooltip>,
        btnSignSet.has(_COPY_IMAGE_ACL) ? (
          <Tooltip placement='top' title={'复制图片名称'} arrow={true}>
            <CopyOutlined onClick={() => copy(cardItem.imageName)} />
          </Tooltip>
        ) : null,

        btnSignSet.has(_COPY_IMAGE_ACL) ? (
          <Tooltip placement='top' title={'复制图片url'} arrow={true}>
            <CopyFilled onClick={() => copyLink(cardItem.imageUrl)} />
          </Tooltip>
        ) : null,
        btnSignSet.has(_DEL_IMAGE_ACL) ? (
          <Tooltip placement='top' title={'删除图片'} arrow={true}>
            <Popconfirm
              title='删除图片'
              description={`确定要删除 [${cardItem.imageName}] 这张图片吗?`}
              onConfirm={() => del(cardItem)}
              okText='确定'
              cancelText='取消'
            >
              <DelImageButtonAcl danger type='link' size={'small'} icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        ) : null
      ]}
    >
      {/* <Meta description={cardItem.imageName} /> */}
    </Card>
  )
}

export default CardAction
