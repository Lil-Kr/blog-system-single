import { useBlogModalStore } from '@/store/blog/blogStore'
import { ImageManage } from '@/views/image'
import { Modal } from 'antd/lib'

const modalStyles = {
  body: {
    maxHeight: '70vh',
    overflow: 'auto'
  }
}

const ImageSelectModal = () => {
  const { openImageModal, setOpenImageModal, imageModaltitle } = useBlogModalStore()

  const handleImageOk = () => {}

  const handleImageCancel = () => {
    setOpenImageModal(false)
  }

  return (
    <Modal
      className='blog-image-modal'
      width={'80vw'}
      styles={modalStyles}
      title={imageModaltitle}
      open={openImageModal}
      footer={null}
      onOk={handleImageOk}
      onCancel={handleImageCancel}
      maskClosable={false} // 禁止点击遮罩层关闭
    >
      <ImageManage />
    </Modal>
  )
}

export default ImageSelectModal
