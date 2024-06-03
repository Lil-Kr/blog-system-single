import { TinymceLocal } from '@/components/tinymce'
import { useTinymceStore } from '@/store/richTextEditor/richTextEditorStore'
import { IAction, IModalParams, IModalRequestAction, ModalType } from '@/types/component/modal'
import { DeleteOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons'
import {
  Col,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  SelectProps,
  Tag,
  Upload,
  message,
  Image,
  UploadFile,
  Button,
  Checkbox,
  GetProp,
  Card,
  Flex,
  List,
  CheckboxProps,
  RadioChangeEvent,
  Space
} from 'antd'
const { confirm } = Modal
import blogContentApi, { MappedBlogContentDTO } from '@/apis/blog/content'
import { createStyles } from 'antd-style'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { LabelVO } from '@/types/apis/blog/label'
import { BlogCategoryVO } from '@/types/apis/blog/category'
import { BlogTopicVO } from '@/types/apis/blog/topic'
import labelApi from '@/apis/blog/label'
import blogTopicApi from '@/apis/blog/topic'
import blogCategoryApi from '@/apis/blog/category'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance } from 'node_modules/tinymce/tinymce'
import { Result } from '@/types/base/response'
import { imageInfoApi } from '@/apis/image/imageInfo'

const env = import.meta.env
const useStyle = createStyles(({ token }) => ({
  'blog-modal-body': {}
}))

/**
 * change image function
 */
type ImageInfoType = {
  key: string
  value: string
  name: string
  imgUrl: string
}

const SaveBlogModal = (props: ModalType.SaveBlogModal) => {
  const { styles } = useStyle()
  const modalStyles = {
    body: {
      height: 'calc(100vh - 120px)',
      overflowy: 'auto'
    }
  }
  const classNames = {
    body: styles['blog-modal-body']
  }

  const { mRef, update } = props
  const [saveBlogForm] = Form.useForm()
  const editorRef = useRef<EditorInstance | null>(null)
  const { tinyMceContents, tinymecStatus, setTinyMCEContents, setTinymecStatus, setTinymceEditorReady } =
    useTinymceStore()
  const [title, setTitle] = useState<string>('')
  const [openModal, setOpenModal] = useState(false)
  const [modalAction, setModalAction] = useState<string>('create')
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)
  const [selectedLabelValues, setSelectedLabelValues] = useState<SelectProps['options']>([])
  const [selectCategory, setSelectCategory] = useState<SelectProps['options']>([])
  const [selectTopic, setSelectTopic] = useState<SelectProps['options']>([])
  const [isOpenUploadImage, setIsOpenUploadImage] = useState<boolean>(false)
  const [imageInfoList, setImageInfoList] = useState<ImageInfoType[]>([]) // set image list

  /**
   *
   */
  useImperativeHandle(mRef, () => ({
    form: saveBlogForm,
    open
  }))

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    // items?: ModalType.InputType[],
    data?: { blog: MappedBlogContentDTO }
  ) => {
    const { action, open } = type
    const { title } = params

    setModalAction(action)

    if (action === 'create') {
      setTinymecStatus(0, '') // create blog
    } else if (action === 'edit') {
      const { blog } = data as { blog: MappedBlogContentDTO }

      saveBlogForm.setFieldsValue(blog)
      setTinymecStatus(1, blog.contentText ?? '') // edit blog
      setRadioValue(`${blog.imgUrl}`)
    } else {
      setInputDisabled(true)
    }

    setOpenModal(open)
    setTitle(title)
  }

  useEffect(() => {
    const fetchLabels = async () => {
      const labels = await getLabels()
      const selectLabels = labels.map(({ surrogateId, name, color }, index) => ({
        key: surrogateId,
        value: surrogateId,
        label: name,
        color
      }))
      setSelectedLabelValues(selectLabels)

      const selectBlogCategory = await getCategorys()
      const categorys = selectBlogCategory.map(({ surrogateId, name }, index) => ({
        key: surrogateId,
        value: surrogateId,
        label: name
      }))
      setSelectCategory(categorys)

      const selectBlogTopic = await getTopics()
      const blogTopics = selectBlogTopic.map(({ surrogateId, name }, index) => ({
        key: surrogateId,
        value: surrogateId,
        label: name
      }))
      setSelectTopic(blogTopics)
    }

    fetchLabels()
  }, [])

  const getLabels = async (): Promise<LabelVO[]> => {
    const labels = await labelApi.getLabelList({})
    if (labels.code !== 200) {
      return []
    }
    return labels.data.list
  }

  const getCategorys = async (): Promise<BlogCategoryVO[]> => {
    const blogCategory = await blogCategoryApi.getCategoryList({})
    if (blogCategory.code !== 200) {
      return [] as BlogCategoryVO[]
    }
    return blogCategory.data.list
  }

  const getTopics = async (): Promise<BlogTopicVO[]> => {
    const blogTopics = await blogTopicApi.getTopicList({})

    if (blogTopics.code !== 200) {
      return [] as BlogTopicVO[]
    }
    return blogTopics.data.list
  }

  type TagRender = SelectProps['tagRender']
  const tagRender: TagRender = props => {
    const { label, value, closable, onClose } = props
    const option = selectedLabelValues?.find(opt => opt.value === value)

    return (
      <Tag color={option?.color} closable={closable} onClose={onClose} style={{ marginRight: 1 }}>
        {label}
      </Tag>
    )
  }

  const handleBlogOk = () => {
    if (tinyMceContents !== '' || tinyMceContents.length > 0) {
      showBlogCancelConfirm()
    } else {
      saveBlogForm.resetFields()
      setRadioValue('')
      setOpenModal(false)
    }
  }

  const handleBlogCancel = async () => {
    const valid = await saveBlogForm.validateFields()
    if (valid) {
      const params = saveBlogForm.getFieldsValue()
      params.contentText = tinyMceContents

      params.labelIds = params.blogLabelList.map((item: any, index: any) => item.value)

      let res = {} as Result<string>
      if (modalAction === 'create') {
        res = await blogContentApi.save(params)
      } else {
        params.surrogateId = params.key
        params.imgUrl = radioValue
        res = await blogContentApi.edit(params)
      }

      if (res.code === 200) {
        message.success('操作成功')
        saveBlogForm.resetFields()
        setOpenModal(false)
        update()
      } else {
        message.error('操作失败')
      }
    }
  }

  /**
   * 退出编辑框时的提示
   */
  const showBlogCancelConfirm = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleFilled />,
      content: '是否退出编辑框？',
      onOk() {
        saveBlogForm.resetFields()
        setOpenModal(false)
        setTinyMCEContents('')
        setRadioValue('')
      },
      onCancel() {
        message.warning('取消成功')
      }
    })
  }

  /**
   * open change image list radios
   * @returns
   */
  const openImageListModal = async () => {
    /**
     * hard code
     */
    const imageInfoList = await imageInfoApi.imageInfoList({ imageCategoryId: '1795772207981531136' })
    if (imageInfoList.code !== 200) {
      return
    }
    const imageInfoMapping: ImageInfoType[] = imageInfoList.data.list.map((item, index) => ({
      key: item.surrogateId,
      name: item.name,
      value: item.imageUrl,
      imgUrl: item.imageUrl
    }))
    setIsOpenUploadImage(true) // open modal
    setImageInfoList(imageInfoMapping)
  }

  const cancelImageListModal = () => {
    setIsOpenUploadImage(false)
    setImageInfoList([])
    setRadioValue('')
  }

  /**
   * 选择图片
   */
  const [radioValue, setRadioValue] = useState<string>('')
  const imageRadioOnChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
  }

  const handleUploadImageOK = () => {
    setIsOpenUploadImage(false)
  }

  const handleRemoveImage = () => {
    setRadioValue('')
  }

  return (
    <div className='saveBlogModal'>
      <ConfigProvider
        modal={{
          classNames,
          styles: modalStyles
        }}
      >
        <Modal
          style={{
            maxWidth: '100vw',
            top: 0,
            paddingBottom: 0
          }}
          title={title}
          width={'100vw'}
          okText={'确定'}
          cancelText={'取消'}
          open={openModal}
          onOk={handleBlogOk}
          onCancel={handleBlogCancel}
          destroyOnClose={false}
          // afterClose={resetForm}
          // forceRender={true} // 强制渲染
          // confirmLoading={confirmLoading}
          maskClosable={false}
        >
          <Form form={saveBlogForm} disabled={inputDisabled} labelCol={{ flex: '100px' }} preserve={false}>
            <Row gutter={16} justify={'start'}>
              <Col span={12}>
                <Form.Item name={'key'} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={'title'} label={'标题'} rules={[{ required: true, message: '博客标题不能为空' }]}>
                  <Input placeholder={'blog title...'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name={'introduction'} label={'简介'} rules={[{ required: true, message: '简介不能为空' }]}>
                  <Input placeholder={'blog introduction...'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'imgUrl'} label={'博客封面'}>
                  {radioValue !== '' ? (
                    <div
                      style={{
                        display: 'flex',
                        width: '8rem',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        preview={{
                          mask: (
                            <Space>
                              <EyeOutlined style={{ color: 'white', fontSize: '20px' }} />
                              <DeleteOutlined
                                style={{ fontSize: '20px' }}
                                onClick={e => {
                                  e.stopPropagation() // 防止触发预览
                                  handleRemoveImage()
                                }}
                              />
                            </Space>
                          )
                        }}
                        src={`${env.VITE_BACKEND_BASE_API}${radioValue}`}
                      />
                    </div>
                  ) : (
                    <Button type='dashed' onClick={openImageListModal}>
                      +
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify={'start'}>
              <Col span={12}>
                <Form.Item name={'blogLabelList'} label={'标签'} rules={[{ required: true, message: '标签不能为空' }]}>
                  <Select
                    mode='multiple'
                    labelInValue={true}
                    tagRender={tagRender}
                    options={selectedLabelValues}
                    maxCount={4}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={'categoryId'} label={'分类'} rules={[{ required: true, message: '分类不能为空' }]}>
                  <Select
                    key={1}
                    showSearch
                    placeholder='select category'
                    optionFilterProp='children'
                    options={selectCategory}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={'topicId'} label={'所属专题'}>
                  <Select
                    key={2}
                    showSearch
                    placeholder='select category'
                    optionFilterProp='children'
                    options={selectTopic}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify={'start'}>
              <Col span={6}>
                <Form.Item
                  name={'original'}
                  label={'是否原创'}
                  rules={[{ required: true, message: '原创类型不能为空' }]}
                >
                  {/* <Radio.Group onChange={onChange} value={value}> */}
                  <Radio.Group>
                    <Radio value={0}>否</Radio>
                    <Radio value={1}>是</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'recommend'}
                  label={'是否推荐'}
                  rules={[{ required: true, message: '是否推荐不能为空' }]}
                >
                  <Radio.Group>
                    <Radio value={0}>否</Radio>
                    <Radio value={1}>是</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={'status'} label={'发布状态'} rules={[{ required: true, message: '发布状态不能为空' }]}>
                  <Radio.Group>
                    <Radio value={0}>草稿</Radio>
                    <Radio value={1}>发布</Radio>
                    <Radio value={-1}>下架</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}></Col>
            </Row>
            <Row gutter={16} justify={'start'}></Row>
            <Row gutter={16} justify={'start'}>
              <Col span={24}>
                <Form.Item name={'contentText'} label={'内容'}>
                  <Editor
                    id={'editor-local'}
                    tinymceScriptSrc={'/public/tinymce/tinymce.min.js'}
                    onInit={(_evt, editor) => {
                      editorRef.current = editor
                    }}
                    init={{
                      height: 500,
                      menubar: true, // menu bar
                      statusbar: false, // status bar
                      promotion: false, // upgrade the pro version
                      branding: false, // remove the branding
                      // end_container_on_empty_block: true,
                      plugins: [
                        'lists',
                        'advlist',
                        'link',
                        'code',
                        'preview',
                        'codesample',
                        // 'codemirror',
                        'image',
                        'imagetools',
                        'searchreplace',
                        'fullscreen',
                        'emoticons',
                        'insertdatetime',
                        'anchor'
                      ],
                      toolbar:
                        'undo redo |' +
                        'styleselect |' +
                        // 'blocks |' +
                        'bold italic underline strikethrough forecolor backcolor |' +
                        'alignleft aligncenter alignright alignjustify |' +
                        'bullist numlist outdent indent |' +
                        // 'code codesample |' +
                        'code preview  codesample |' +
                        'link image |' +
                        'searchreplace fullscreen |' +
                        'emoticons anchor insertdatetime |' +
                        'removeformat',
                      advlist_bullet_styles: 'square',
                      paste_data_images: true,
                      image_advtab: true, // add advanced image tab
                      image_title: true,
                      image_caption: true, // image caption
                      file_picker_callback: (callback, value, meta) => {
                        // Provide image and alt text for the image dialog
                        if (meta.filetype == 'image') {
                          const input = document.createElement('input')
                          input.setAttribute('type', 'file')
                          input.setAttribute('accpet', 'image/*') // 只接受图片文件

                          input.addEventListener('change', (e: Event) => {
                            const target = e.target as HTMLInputElement
                            const files = target.files
                            if (!files || files.length === 0) {
                              return
                            }

                            const file = files[0]
                            // 在这里可以对选中的文件进行处理, 例如上传到服务器等操作
                            if (!file.type.startsWith('image/')) {
                              return
                            }

                            const reader = new FileReader()
                            reader.addEventListener('load', () => {
                              const id = 'blobid' + new Date().getTime()
                              const blobCache = editorRef.current?.editorUpload.blobCache
                              const base64 = (reader.result as string).split(',')[1]
                              const blobInfo = blobCache?.create(id, file, base64)
                              blobCache?.add(blobInfo!)
                              callback(blobInfo?.blobUri()!, { title: file.name })
                            })
                            reader.readAsDataURL(file)
                          })
                          input.click()
                        }
                      },
                      insertdatetime_formats: ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d', '%Y/%m/%d', '%H:%M:%S', '%D'],
                      insertdatetime_element: true, // insert time/date plugin
                      content_style: 'body { font-family:Helvetica, Arial, sans-serif; font-size: 16px }'
                      // skin: 'oxide-dark',
                      // content_css: 'dark'
                    }}
                    onEditorChange={(newValue, editor) => {
                      setTinyMCEContents(editor.getContent())
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal
          title={'请选择文章封面图片'}
          style={{ top: 0, paddingBottom: 0 }}
          open={isOpenUploadImage}
          onOk={handleUploadImageOK}
          onCancel={cancelImageListModal}
          width={'90%'}
        >
          <Radio.Group onChange={imageRadioOnChange} value={radioValue}>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 8
              }}
              dataSource={imageInfoList}
              renderItem={item => (
                <List.Item>
                  <Radio key={item.key} value={item.value}>
                    <Image preview={true} src={`${env.VITE_BACKEND_BASE_API}${item.imgUrl}`} />
                  </Radio>
                </List.Item>
              )}
              pagination={{
                size: 'small',
                position: 'bottom',
                align: 'start',
                pageSize: 16,
                total: 12
              }}
            />
          </Radio.Group>
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default SaveBlogModal
