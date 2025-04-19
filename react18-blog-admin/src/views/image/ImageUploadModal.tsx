import { Button, Flex, GetProp, Modal, Progress, Upload, UploadFile, UploadProps } from 'antd/lib'
import { RcFile, UploadRequestOption } from 'rc-upload/lib/interface'
import { imageInfoApi } from '@/apis/image/imageInfoApi'
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios'
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons'
import { useMessage } from '@/components/message/MessageProvider'
import { Image } from 'antd/lib'
import { useUploadImageModalStateStore } from '@/store/blog/imageStore'
import { useTokenStore } from '@/store/login'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const fileMaxSize = 1024 * 1024 * 2 // 2M

type UploadImageType = {
  uid: string
  name: string
  progress: number
}

const env = import.meta.env

const ImageUploadModal = () => {
  // const { mRef, update } = props
  // const [imageUploadForm] = Form.useForm()
  // const [openModal, setOpenModal] = useState(false)
  // const [imageInfo, setImageInfo] = useState<ImageInfoUploadReq>({ imageCategoryId: '' })
  // const [fileList, setFileList] = useState<UploadFile[]>([])
  // const [previewOpen, setPreviewOpen] = useState<boolean>(false)
  // const [previewImage, setPreviewImage] = useState<string>('')
  // const [uploading, setUploading] = useState(false)
  // const [uploadFiles, setUploadFiles] = useState<UploadImageType[]>([])
  const messageApi = useMessage()
  const { token } = useTokenStore()
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

  // useImperativeHandle(mRef, () => ({
  //   form: imageUploadForm,
  //   open
  // }))

  // const open = (requestParams: IModalRequestAction, params: IModalParams, type: IAction, data?: any) => {
  //   setOpenModal(true)
  //   const imageInfo = data as ImageInfoUploadReq
  //   setImageInfo(imageInfo)
  // }

  const handleCancel = () => {
    clearModalData()
  }

  // const handleOk = async () => {
  // const resp = await imageInfoApi.imageUpload({
  //   formData,
  //   config
  // })

  // const { code, msg, data } = resp
  // if (code !== 200) {
  //   return
  // }

  // setFileList([])
  // setOpenModal(false)
  // setUploading(false)
  // update()
  // }

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
   * 自定义上传图片
   * @param options
   * @param params
   * @returns
   */
  const handleCustomRequest = async (options: UploadRequestOption<any>) => {
    const { onSuccess, onError, file, filename, onProgress } = options
    const formData = new FormData()
    formData.append('image', file)
    formData.append('imageCategoryId', modalReq.imageCategoryId ?? '')
    // 进度条百分比计算逻辑
    const getImageUploadInfo = (progress: number): UploadImageType => {
      return {
        uid: (file as RcFile).uid,
        name: (file as RcFile).name,
        progress
      }
    }

    const config: AxiosRequestConfig = {
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      onUploadProgress(event: AxiosProgressEvent) {
        if (event.total) {
          // 进图条值的计算
          const percentCompleted = Math.floor((event.loaded / event.total) * 100)
          setUploadFiles([...(uploadFiles ?? []), getImageUploadInfo(percentCompleted)])
        }
      }
    }

    // 开始上传
    setUploading(true)

    const resp = await imageInfoApi.imageUpload({
      config
    })

    const { code, msg, data } = resp
    if (code !== 200) {
      return
    }
    // data.url = env.VITE_BACKEND_IMAGE_BASE_API + data.url
    messageApi?.success(msg)
    setFileList([...(fileList ?? []), file as UploadFile])
  }

  /**
   * 上传时的回调, 此处只处理显示待上传的图片缩略图
   */
  const handleChange: UploadProps['onChange'] = info => {
    const { file, fileList, event } = info
    // const newFileList: UploadFile[] = fileList.map(file => {
    //   return { ...file, status: 'done' }
    // })
    // setFileList([...newFileList])

    /**
     * remove can trigger this method
     * or call back-end delete api
     */
    if (file.status === 'removed') {
      //
      console.log('--> 删除图片:')
      const removeFileList = fileList.filter(item => item.uid !== file.uid)
      setFileList([...removeFileList])
    }
  }

  const uploadImage = () => {
    console.log('--> fileList:', fileList)
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
        // okText={'确定'}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
      >
        <Flex vertical={true} gap={16}>
          {/* <ImgCrop quality={0.2} showGrid rotationSlider aspectSlider showReset resetText={'reset'}>
          </ImgCrop> */}
          <Upload
            listType='picture'
            fileList={fileList}
            onPreview={onPreview}
            // onChange={handleChange}
            showUploadList={true}
            // maxCount={4}
            // multiple={true}
            customRequest={e => handleCustomRequest(e)}
            // {...uploadProps}
            // beforeUpload={}
          >
            {fileList!.length < 5 && <Button icon={<UploadOutlined />}>{'选择图片'}</Button>}
          </Upload>
          <Button onClick={uploadImage}>{'点击上传'}</Button>
          {/* {previewImage &&
            fileList!.map(file => (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: visible => setPreviewOpen(visible),
                  afterOpenChange: visible => !visible && setPreviewImage('')
                }}
                src={previewImage}
              />
            ))} */}
          <Flex vertical={true} gap={14}>
            {uploading &&
              uploadFiles?.map((item, index) => (
                <div key={item.uid}>
                  <Flex vertical={false} gap={16}>
                    <FileImageOutlined />
                    <div>{item.name}</div>
                  </Flex>
                  <Flex vertical={false}>
                    <Progress percent={item.progress} />
                    <div>{item.progress}%</div>
                  </Flex>
                </div>
              ))}
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}

export default ImageUploadModal
