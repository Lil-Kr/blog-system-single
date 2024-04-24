import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, GetProp, Upload, UploadFile, UploadProps } from 'antd'
import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const ImageUploda = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ])
  const [fileList1, setFileList1] = useState<UploadFile[]>([])

  const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
    const fileMaxSize = 1024 * 1024 * 2 // 1M
    if (file.size > fileMaxSize) {
      console.log('--> beforeUpload, 图片太大不能上传')
      return false
    } else {
      console.log('--> beforeUpload')
      return true
    }
  }

  const handleChange: UploadProps['onChange'] = info => {
    const { file, fileList } = info
    console.log('--> handleChange start, info ', { ...info })

    if (file.status === 'done') {
      console.log('--> handleChange done: ', fileList)
    }

    if (file.status === 'uploading') {
      console.log('--> handleChange uploading: ', fileList)
    }

    if (file.status === 'error') {
      console.log('--> handleChange error: ', fileList)
    }

    if (file.status === 'removed') {
      console.log('--> handleChange removed: ', fileList)
    }
    console.log('--> handleChange end: ', { ...info })
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </button>
  )

  /**
   *
   * @param param
   */
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  /**
   * 点击文件链接或预览图标时的回调
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

  return (
    <div>
      <Flex gap='middle' wrap='wrap'>
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          // showUploadList={true}
          fileList={fileList1}
          action={'http://localhost:7010/api/image/upload'}
          maxCount={2}
          multiple
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {/* {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton} */}
          <button style={{ border: 0, background: 'none' }} type='button'>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload Image</div>
          </button>
        </Upload>
        <Divider />
        <ImgCrop rotationSlider>
          <Upload
            action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
            listType='picture-card'
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </Flex>
    </div>
  )
}

export default ImageUploda
