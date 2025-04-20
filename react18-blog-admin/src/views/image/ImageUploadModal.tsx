import { Button, Flex, GetProp, Modal, Progress, Upload, UploadFile, UploadProps } from 'antd/lib'
import { imageInfoApi } from '@/apis/image/imageInfoApi'
import { AxiosRequestConfig } from 'axios'
import { UploadOutlined } from '@ant-design/icons'
import { useMessage } from '@/components/message/MessageProvider'
import { useUploadImageModalStateStore } from '@/store/blog/imageStore'
import { Image } from 'antd/lib'
import { useTokenStore } from '@/store/login'
import { RcFile } from 'antd/lib/upload'
import ImgCrop from 'antd-img-crop'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const fileMaxSize = 1024 * 1024 * 2 // 2M

// type UploadImageType = {
//   uid: string
//   name: string
//   progress: number
// }

const env = import.meta.env

const ImageUploadModal = () => {
  const messageApi = useMessage()
  const {
    title,
    openModal,
    setOpenModal,
    modalReq,
    update,
    fileList,
    setFileList,
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    uploading,
    setUploading,
    uploadFiles,
    setUploadFiles,
    clearModalData
  } = useUploadImageModalStateStore()

  const handleCancel = () => {
    clearModalData()
  }

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })

  /**
   * 点击图片预览的回调
   * @param file
   */
  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  /**
   * 上传时的回调, 此处只处理显示待上传的图片缩略图
   */
  const handleChange: UploadProps['onChange'] = info => {
    const { file, fileList, event } = info
    const newFileList: UploadFile[] = fileList.map(file => {
      return { ...file, status: 'done' }
    })
    setFileList([...newFileList])
    /**
     * remove can trigger this method
     * or call back-end delete api
     */
    if (file.status === 'removed') {
      const removeFileList = fileList.filter(item => item.uid !== file.uid)
      setFileList([...removeFileList])
    }
  }

  /**
   * 上传图片
   */
  const handleUploadImage = async () => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('imageCategoryId', modalReq.imageCategoryId ?? '')
      formData.append('image', uploadFiles[0])
      const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      const resp = await imageInfoApi.imageUpload({
        data: formData,
        config
      })

      const { code, msg } = resp
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } catch (error) {
      return
    } finally {
      setUploading(false)
      clearModalData()
      update?.()
    }
  }

  const props: UploadProps = {
    listType: 'picture',
    onRemove: file => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setUploadFiles(file)
      return false
    },
    onChange: handleChange,
    fileList: fileList,
    showUploadList: true,
    onPreview: onPreview
    // multiple: true,
    // maxCount: 3
  }

  return (
    <div className='image-upload-warrper'>
      <Modal
        title={title}
        width={'20vw'}
        cancelText={'关闭'}
        open={openModal}
        onCancel={handleCancel}
        destroyOnClose={false}
        maskClosable={false}
        footer={null}
      >
        <Flex vertical={true} gap={16}>
          <ImgCrop quality={0.2} showGrid rotationSlider aspectSlider showReset resetText={'reset'}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>{'选择图片'}</Button>
            </Upload>
          </ImgCrop>
          <Button onClick={handleUploadImage} disabled={fileList.length === 0} loading={uploading}>
            {'点击上传'}
          </Button>
        </Flex>
      </Modal>
    </div>
  )
}

export default ImageUploadModal
