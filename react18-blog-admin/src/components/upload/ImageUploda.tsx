import { Button, Flex, Form, GetProp, Modal, Progress, Upload, UploadFile, UploadProps } from 'antd/lib'
import ImgCrop from 'antd-img-crop'
import { useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, ModalType } from '@/types/component/modal'
import { ImageInfoUploadReq } from '@/apis/image/imageInfoApi'
import { RcFile, UploadRequestOption } from 'rc-upload/lib/interface'
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios'
import { FileImageOutlined } from '@ant-design/icons'
import { useMessage } from '@/components/message/MessageProvider'
import { Image } from 'antd/lib'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const fileMaxSize = 1024 * 1024 * 2 // 2M

type UploadImageType = {
  uid: string
  name: string
  progress: number
}

const ImageUploda = () => {
  const messageApi = useMessage()
  const [imageUploadForm] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ])
  const [uploadFiles, setUploadFiles] = useState<UploadImageType[]>([])
  const [imageInfo, setImageInfo] = useState<ImageInfoUploadReq>({ imageCategoryId: '' })
  const [uploadPercent, setUploadPercent] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const open = (requestParams: IModalRequestAction, params: IModalParams, type: IAction, data?: any) => {
    setOpenModal(true)
    const imageInfo = data as ImageInfoUploadReq
    setImageInfo(imageInfo)
  }

  const handleCancel = () => {
    setFileList([])
    setUploading(false)
    setOpenModal(false)
  }

  const handleOk = async () => {
    setFileList([])
    setOpenModal(false)
    setUploading(false)
  }

  /**
   * 上传图片时的回调
   * @param info
   */
  const handleChange: UploadProps['onChange'] = info => {
    const { file, fileList, event } = info
    const newFileList: UploadFile[] = fileList.map(file => {
      return { ...file, status: 'done' }
    })
    // const newFile: UploadFile = { ...fileList[0], status: 'done' }
    setFileList([...newFileList])
    if (file.status === 'done') {
      const { code, msg } = file.response
      /**
       * handle error case by server return
       * then re-set fileList
       */
      if (code !== 200) {
        messageApi?.error(msg)
        // filter success image
        const newFileList = fileList.filter(item => item.response.code === 200)

        setFileList(newFileList)
      }
    }

    if (file.status === 'uploading') {
      console.log('--> handleChange uploading: ', fileList, { ...event })
    }

    if (file.status === 'error') {
      console.log('--> handleChange error: ', fileList)
    }

    /**
     * remove can trigger this method
     * or call back-end delete api
     */
    if (file.status === 'removed') {
      const removeFileList = fileList.filter(item => item.uid !== file.uid)
      setFileList([...removeFileList])
    }
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
    // let src = file.url as string
    // if (!src) {
    //   src = await new Promise(resolve => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file.originFileObj as FileType)
    //     reader.onload = () => resolve(reader.result as string)
    //   })
    // }
    // const image = new Image()
    // image.src = src
    // const imgWindow = window.open(src)
    // imgWindow?.document.write(image.outerHTML)
  }

  /**
   * 自定义上传图片
   * @param options
   * @param params
   * @returns
   */
  const handleCustomRequest = async (options: UploadRequestOption<any>, params: ImageInfoUploadReq) => {
    const { onSuccess, onError, file, filename, onProgress } = options

    const formData = new FormData()
    formData.append('image', file)
    formData.append('imageCategoryId', params.imageCategoryId)

    // 进度条百分比计算逻辑
    const getImageUploadInfo = (progress: number): UploadImageType => {
      return {
        uid: (file as RcFile).uid,
        name: (file as RcFile).name,
        progress: progress
      }
    }

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress(event: AxiosProgressEvent) {
        if (event.total) {
          // 进图条值的计算
          const percentCompleted = Math.floor((event.loaded / event.total) * 100)
          setUploadFiles(prevFiles => [...prevFiles, getImageUploadInfo(percentCompleted)])
        }
      }
    }

    // 开始上传
    // setUploading(true)

    // const resp = await imageInfoApi.imageUpload({
    //   formData,
    //   config
    // })

    // const { code, msg, data } = resp
    // if (code !== 200) {
    //   return
    // }
    // data.url = env.VITE_BACKEND_IMAGE_BASE_API + data.url
    // messageApi?.success(msg)
    // setFileList(prevFiles => [...prevFiles, file as UploadFile])
  }

  return (
    <div className='image-upload-warrper'>
      <Modal
        title={'上传图片'}
        width={'30vw'}
        okText={'确定'}
        cancelText={'取消'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={false}
        maskClosable={false}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
      >
        <Flex vertical={true} gap={16}>
          <ImgCrop quality={0.2} showGrid rotationSlider aspectSlider showReset resetText={'reset'}>
            <Upload
              listType='picture-card'
              fileList={fileList}
              onPreview={onPreview}
              onChange={handleChange}
              // onChange={handleChange}
              showUploadList={true}
              // customRequest={e => handleCustomRequest(e, imageInfo)}
              // {...uploadProps}
              // action={'http://localhost:7010/api/image/info/upload'}
              // customRequest={e => customRequest(e, imageInfo)}
              // beforeUpload={}
            >
              {fileList.length < 2 && '+ Upload'}
            </Upload>
          </ImgCrop>

          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: visible => setPreviewOpen(visible),
                afterOpenChange: visible => !visible && setPreviewImage('')
              }}
              src={previewImage}
            />
          )}
          <Flex vertical={true} gap={14}>
            {uploading &&
              uploadFiles.map((item, index) => (
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

export default ImageUploda
