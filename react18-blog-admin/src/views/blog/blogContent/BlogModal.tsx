import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  SelectProps,
  Space,
  Tag
} from 'antd/lib'
import { BlogModalType } from '@/types/blog/BlogType'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance } from 'node_modules/tinymce/tinymce'
import { useTinymceStore } from '@/store/richTextEditor/richTextEditorStore'
import { useDictDetailStore } from '@/store/sys/dictStore'
import { BlogContentAddReq } from '@/apis/blog/content/blogContentApi'
import { useBlogStore } from '@/store/blog/blogStore'

const env = import.meta.env
const modalStyles = {
  body: {
    height: 'calc(100vh - 120px)',
    overflowy: 'auto'
  }
}

const BlogModal = (props: BlogModalType) => {
  // const [selectedLabelValues, setSelectedLabelValues] = useState<SelectProps['options']>([])
  // const [selectCategory, setSelectCategory] = useState<SelectProps['options']>([])
  // const [selectTopic, setSelectTopic] = useState<SelectProps['options']>([])
  // const {blogPublish, setBlogPublish} = useState()
  const { openModal, api, title, inputDisabled, action, data, update } = props
  const [blogForm] = Form.useForm()
  const [radioValue, setRadioValue] = useState<string>('')
  const editorRef = useRef<EditorInstance | null>(null)
  // const { tinyMceContents, setTinyMCEContents, setTinymecStatus } = useTinymceStore()
  const { blogTypes, blogTopics, blogPublisStatue, switchStatue } = useDictDetailStore()
  const { blogModalData, setBlogModalData } = useBlogStore()

  useEffect(() => {
    if (openModal) {
      initData()
    }
  }, [openModal])

  const initData = () => {
    blogForm.resetFields()
    if (action === 'create') {
      const initModalData = {
        categoryInfo: data?.categoryInfo,
        publishStatue: data?.blogPublisStatue,
        original: data?.original,
        recommend: data?.recommend
      }
      blogForm.setFieldsValue({ ...initModalData })

      setBlogModalData({
        ...blogModalData,
        original: data?.original ?? '',
        recommend: data?.recommend ?? '',
        status: data?.blogPublisStatue ?? '',
        categoryId: data?.categoryInfo.value ?? ''
      })
    } else if (action === 'edit') {
      const initModalData = {
        categoryInfo: data?.categoryInfo,
        publishStatue: data?.blogPublisStatue,
        original: data?.original,
        recommend: data?.recommend
      }
      blogForm.setFieldsValue({  ...data })

      setBlogModalData({
        ...blogModalData,
        original: data?.original ?? '',
        recommend: data?.recommend ?? '',
        status: data?.blogPublisStatue ?? '',
        categoryId: data?.categoryInfo.value ?? ''
      })
    } else {
    }
  }

  type TagRender = SelectProps['tagRender']
  const tagRender: TagRender = props => {
    const { label, value, closable, onClose } = props
    const option = data?.blogLabelList?.find(opt => opt.value === value)
    return (
      <Tag color={option?.color} closable={closable} onClose={onClose}>
        {label}
      </Tag>
    )
  }

  const handleBlogCancel = () => {
    update()
  }

  const handleRemoveImage = () => {
    setRadioValue('')
  }

  const handleBlogOk = async () => {
    const valid = await blogForm.validateFields()
    const params = blogForm.getFieldsValue()
    if (!valid) {
      return
    }

    if (action === 'create') {
      const req: BlogContentAddReq = {
        ...blogModalData,
        ...params
      }

      console.log('--> req:', { ...req })
      api.add({ ...req })
    } else if (action === 'edit') {
    } else {
    }
  }

  /**
   * 选择图片时打开
   */
  const openImageListModal = () => {}

  /**
   * 选择分类
   * @param value
   */
  const handleChangeCategory = (value: string) => {
    setBlogModalData({
      ...blogModalData,
      categoryId: value
    })
  }

  /**
   * 选择标签
   */
  const handleChangeLabels = (value: SelectProps['options']) => {
    setBlogModalData({
      ...blogModalData,
      labelIds: value?.map(({ key }) => key) ?? []
    })
  }

  /**
   * 选择专题
   * @param value
   */
  const handleChangeTopic = (value: string) => {
    setBlogModalData({
      ...blogModalData,
      topicId: value
    })
  }

  const onChangeOriginal = (event: RadioChangeEvent) => {
    setBlogModalData({
      ...blogModalData,
      original: event.target.value
    })
  }

  const onChangeRecommend = (event: RadioChangeEvent) => {
    setBlogModalData({
      ...blogModalData,
      recommend: event.target.value
    })
  }

  const onChangePublishStatue = (event: RadioChangeEvent) => {
    setBlogModalData({
      ...blogModalData,
      status: event.target.value
    })
  }

  return (
    <div className='saveBlogModal'>
      <ConfigProvider
        modal={{
          styles: modalStyles
        }}
      >
        <Modal
          className='blog-modal-warpper'
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh',
            top: 0,
            paddingBottom: 0
          }}
          title={title}
          open={openModal}
          width={'100vw'}
          okText={'确定'}
          cancelText={'取消'}
          onOk={handleBlogOk}
          onCancel={handleBlogCancel}
          getContainer={false} // 让 Modal 渲染在当前 DOM 结构
          maskClosable={false} // 禁止点击遮罩层关闭
        >
          <Form form={blogForm} disabled={inputDisabled} preserve={false}>
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
                            <Flex vertical={false} gap={8}>
                              <EyeOutlined style={{ color: 'white', fontSize: '20px' }} />
                              <DeleteOutlined
                                style={{ fontSize: '20px' }}
                                onClick={e => {
                                  e.stopPropagation() // 防止触发预览
                                  handleRemoveImage()
                                }}
                              />
                            </Flex>
                          )
                        }}
                        src={`${env.VITE_BACKEND_IMAGE_BASE_API}${radioValue}`}
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
                    options={data?.blogLabelList}
                    maxCount={4}
                    onChange={value => handleChangeLabels(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={'categoryInfo'} label={'分类'} rules={[{ required: true, message: '分类不能为空' }]}>
                  <Select
                    key={1}
                    showSearch
                    placeholder='select category'
                    optionFilterProp='children'
                    options={blogTypes}
                    onChange={value => handleChangeCategory(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={'topicInfo'} label={'所属专题'}>
                  <Select
                    key={2}
                    showSearch
                    placeholder='select category'
                    optionFilterProp='children'
                    options={blogTopics}
                    onChange={value => handleChangeTopic(value)}
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
                  <Radio.Group onChange={onChangeOriginal}>
                    {switchStatue.length &&
                      switchStatue.map(item => {
                        return (
                          <Radio key={item.value} value={item.value}>
                            {item.label}
                          </Radio>
                        )
                      })}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'recommend'}
                  label={'是否推荐'}
                  rules={[{ required: true, message: '是否推荐不能为空' }]}
                >
                  <Radio.Group onChange={onChangeRecommend}>
                    {switchStatue.length &&
                      switchStatue.map(item => {
                        return (
                          <Radio key={item.value} value={item.value}>
                            {item.label}
                          </Radio>
                        )
                      })}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={'publishStatue'}
                  label={'发布状态'}
                  rules={[{ required: true, message: '发布状态不能为空' }]}
                >
                  <Radio.Group onChange={onChangePublishStatue}>
                    {blogPublisStatue.length &&
                      blogPublisStatue.map(item => {
                        return (
                          <Radio key={item.value} value={item.value}>
                            {item.label}
                          </Radio>
                        )
                      })}
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
                    tinymceScriptSrc={import.meta.env.BASE_URL + 'tinymce/tinymce.min.js'}
                    onInit={(_evt, editor) => {
                      editorRef.current = editor
                    }}
                    init={{
                      height: '50vh',
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
                      insertdatetime_element: true // insert time/date plugin
                      // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px } h2 { font-size:24px; font-weight:bold; margin:20px 0; }'
                      // skin: 'oxide-dark',
                      // content_css: 'dark'
                    }}
                    onEditorChange={(newValue, editor) => {
                      setBlogModalData({ ...blogModalData, contentText: editor.getContent() })
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default BlogModal
