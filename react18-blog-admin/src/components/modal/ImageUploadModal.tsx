import { Flex, Form, GetProp, Modal, Upload, UploadFile, UploadProps, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { ImageInfoUploadParams } from '@/apis/image/imageInfo'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import imageInfoApi from '@/apis/image/imageInfo'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const fileMaxSize = 1024 * 1024 * 2 // 2M

const ImageUploadModal = (props: ModalType.ImageUploadModal) => {
  const { mRef, update } = props
  const [action, setAction] = useState('create')
  const [imageUploadForm] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [imageInfo, setImageInfo] = useState<ImageInfoUploadParams>({ imageCategoryId: '' })
  const [progress, setProgress] = useState(0)

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
    setOpenModal(false)
  }

  const handleOk = () => {}

  /**
   *
   * @param param
   */
  // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList)
  // }

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

  const customRequest = async (options: UploadRequestOption<any>, param: ImageInfoUploadParams) => {
    // console.log('自定义参数', param)
    const { onSuccess, onError, file, filename, onProgress } = options
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: { loaded: number; total: number }) => {
        const percent = Math.floor((event.loaded / event.total) * 100)
        setProgress(percent)

        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000)
        }
        // onProgress?({ percent: (event.loaded / event.total) * 100 })
        onProgress && onProgress({ percent: (event.loaded / event.total) * 100 })
      }
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('imageCategoryId', param.imageCategoryId)

    //上传
    const resp = await imageInfoApi.imageUpload({
      formData,
      config
    })
    console.log('---> resp: ', resp)
    const { code, msg, data: dataRes } = resp

    if (dataRes.data.code === 200) {
      onSuccess!(dataRes.data)
    } else {
      onError!(dataRes.data.msg)
    }
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
        // confirmLoading={confirmLoading}
        destroyOnClose={false}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
        maskClosable={false}
      >
        <Flex vertical={true}>
          <ImgCrop quality={0.2} showGrid rotationSlider aspectSlider showReset resetText={'reset'}>
            <Upload.Dragger
              // name='image'
              // className='image-uploader'
              // action={'http://localhost:7010/api/image/info/upload'}
              listType='picture-card'
              // fileList={fileList}
              // onChange={handleChange}
              // onPreview={onPreview}
              customRequest={e => customRequest(e, imageInfo)}
            >
              {fileList.length < 3 && '+ Upload'}
            </Upload.Dragger>
          </ImgCrop>
        </Flex>
      </Modal>
    </div>
  )
}

export default ImageUploadModal
