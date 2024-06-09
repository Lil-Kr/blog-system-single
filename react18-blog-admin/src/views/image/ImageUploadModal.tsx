import { Button, Flex, Form, GetProp, Modal, Progress, Upload, UploadFile, UploadProps, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { ImageInfoUploadParams } from '@/apis/image/imageInfo'
import { RcFile, UploadRequestOption } from 'rc-upload/lib/interface'
import { imageInfoApi } from '@/apis/image/imageInfo'
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios'
import { FileImageOutlined } from '@ant-design/icons'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const fileMaxSize = 1024 * 1024 * 2 // 2M

type UploadImageType = {
  uid: string
  name: string
  progress: number
}

const env = import.meta.env

const ImageUploadModal = (props: ModalType.ImageUploadModal) => {
  const { mRef, update } = props
  const [action, setAction] = useState('create')
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
  const [imageInfo, setImageInfo] = useState<ImageInfoUploadParams>({ imageCategoryId: '' })
  const [uploadPercent, setUploadPercent] = useState(0)
  const [uploading, setUploading] = useState(false)

  useImperativeHandle(mRef, () => ({
    form: imageUploadForm,
    open
  }))

  const open = (requestParams: IModalRequestAction, params: IModalParams, type: IAction, data?: any) => {
    setOpenModal(true)
    const imageInfo = data as ImageInfoUploadParams
    setImageInfo(imageInfo)
  }

  const handleCancel = () => {
    setFileList([])
    setUploading(false)
    setOpenModal(false)
  }

  const handleOk = () => {
    setFileList([])
    setOpenModal(false)
    setUploading(false)
    update()
  }

  const handleChange: UploadProps['onChange'] = info => {
    const { file, fileList, event } = info
    setFileList([...fileList])

    if (file.status === 'done') {
      const { code, msg } = file.response
      /**
       * handle error case by server return
       * then re-set fileList
       */
      if (code !== 200) {
        message.error(msg)
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
      console.log('--> handleChange removed: ', fileList)
    }
  }

  /**
   * 点击图片预览的回调
   * @param file
   */
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  /**
   * 自定义上传图片
   * @param options
   * @param params
   * @returns
   */
  const handleCustomRequest = async (options: UploadRequestOption<any>, params: ImageInfoUploadParams) => {
    const { onSuccess, onError, file, filename, onProgress } = options

    const formData = new FormData()
    formData.append('image', file)
    formData.append('imageCategoryId', params.imageCategoryId)

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
    setUploading(true)

    const resp = await imageInfoApi.imageUpload({
      formData,
      config
    })

    const { code, msg, data } = resp
    if (code !== 200) {
      message.error('上传失败')
      return
    }
    data.url = env.VITE_BACKEND_IMAGE_BASE_API + data.url

    console.log('--> 上传成功: ', data)
    setFileList(prevFiles => [...prevFiles, data as UploadFile])
  }

  return (
    <div className='image-upload-warrper'>
      <Modal
        title={'上传图片'}
        width={800}
        okText={'确定'}
        cancelText={'取消'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={false}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
        maskClosable={false}
      >
        <Flex vertical={true} gap={16}>
          <ImgCrop quality={0.2} showGrid rotationSlider aspectSlider showReset resetText={'reset'}>
            <Upload
              // {...uploadProps}
              listType='picture-card'
              // action={'http://localhost:7010/api/image/info/upload'}
              // onChange={handleChange}
              // customRequest={e => customRequest(e, imageInfo)}
              // beforeUpload={}
              fileList={fileList}
              onPreview={onPreview}
              showUploadList={true}
              customRequest={e => handleCustomRequest(e, imageInfo)}
            >
              {/* {fileList.length < 3 && '+ Upload'} */}
              {'+ Upload'}
            </Upload>
          </ImgCrop>

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

export default ImageUploadModal
