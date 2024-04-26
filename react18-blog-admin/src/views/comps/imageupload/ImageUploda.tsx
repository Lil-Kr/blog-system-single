import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, GetProp, Upload, Image as ImageUpload, UploadFile, UploadProps, message } from 'antd'
import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const fileMaxSize = 1024 * 1024 * 2 // 2M

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

const ImageUploda = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [fileList1, setFileList1] = useState<UploadFile[]>([])
  const [previewImage1, setPreviewImage1] = useState('')
  const [previewOpen1, setPreviewOpen1] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ])

  const checkImage = (file: FileType | UploadFile<any>): boolean | string => {
    const { size, type } = file
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg'

    if (!isJpgOrPng) {
      message.error('you can only upload JPG/PNG file!')
      return Upload.LIST_IGNORE
    }

    if (size! > fileMaxSize) {
      message.error('Image must smaller than 2MB!')
      return Upload.LIST_IGNORE
    }

    return true
  }

  /** ===================== blunt upload to server ===================== **/
  /**
   * upload image before handle
   * @param file
   * @param fileList
   * @returns
   */
  const beforeUpload = async (file: FileType, fileList: FileType[]) => {
    return checkImage(file)
  }

  const handleChange: UploadProps['onChange'] = info => {
    const { file, fileList, event } = info

    // if (!checkImage(file)) return

    setFileList1([...fileList])
    console.log('--> handleChange fileList: ', fileList)

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
        // const newFileList = reSetFileList(file, fileList)
        setFileList1(newFileList)
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

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>upload image</div>
    </button>
  )

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage1(file.url || (file.preview as string))
    setPreviewOpen1(true)
  }

  /** ===================== change image before then upload to server ===================== **/

  /**
   *
   * @param param
   */
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  /**
   * 点击图片预览的回调
   * @param file
   */
  const onPreview = async (file: UploadFile) => {
    console.log('--> onPreview')
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

  return (
    <div>
      <Flex gap='middle' wrap='wrap'>
        <h2>直接上传到服务器</h2>
        <Upload
          id='image-upload-1'
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          // showUploadList={true}
          fileList={fileList1}
          action={'http://localhost:7010/api/image/upload'}
          maxCount={2} // 单次上传的数量, 也是展示的数量
          multiple
          onPreview={handlePreview}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
        </Upload>

        {previewImage1 && (
          <ImageUpload
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen1,
              onVisibleChange: visible => setPreviewOpen1(visible),
              afterOpenChange: visible => !visible && setPreviewImage1('')
            }}
            src={previewImage1}
          />
        )}
        <Divider />
        <h2>调整/裁剪图片后上传, 达到数量后移除上传按钮</h2>
        <ImgCrop rotationSlider>
          <Upload
            name='avatar'
            className='avatar-uploader'
            action={'http://localhost:7010/api/image/upload'}
            listType='picture-card'
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 3 && '+ Upload'}
          </Upload>
        </ImgCrop>

        <Divider />
        <h2></h2>
      </Flex>
    </div>
  )
}

export default ImageUploda
