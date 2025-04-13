import { useEffect, useRef, useState } from 'react'
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
  Tag
} from 'antd/lib'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance } from 'node_modules/tinymce/tinymce'
import { useDictDetailStore } from '@/store/sys/dictStore'
import { BlogContentModalSaveReq, useBlogModalStore } from '@/store/blog/blogStore'
import { useLabelStore } from '@/store/blog/labelStore'
import { BlogContentAddReq, BlogContentEditeReq } from '@/apis/blog/content/blogContentApi'
import { useMessage } from '@/components/message/MessageProvider'

const env = import.meta.env
const modalStyles = {
  body: {
    height: 'calc(100vh - 120px)',
    overflowy: 'auto'
  }
}

const BlogModal = () => {
  const messageApi = useMessage()
  const [blogForm] = Form.useForm()
  const [radioValue, setRadioValue] = useState<string>('')
  const editorRef = useRef<EditorInstance>()
  const { blogTypes, blogTopics, blogPublisStatue, switchStatue } = useDictDetailStore()
  const { labelList } = useLabelStore()
  const {
    api,
    openModal,
    setOpenModal,
    action,
    title,
    inputDisabled,
    modalReq,
    update,
    saveReq,
    setSaveReq,
    clearSaveReq
  } = useBlogModalStore()

  useEffect(() => {
    if (openModal) {
      initData()
    }
  }, [openModal])

  /**
   * 初始化数据
   */
  const initData = () => {
    blogForm.resetFields()
    if (action === 'create') {
      // 设置默认值
      blogForm.setFieldsValue({ ...modalReq })
      editorRef.current?.setContent('')

      // 设置待保存的值
      const saveReq: BlogContentModalSaveReq = {
        categoryId: modalReq?.categoryInfo?.value ?? '',
        original: modalReq?.original ?? '',
        recommend: modalReq?.recommend ?? '',
        status: modalReq?.publishStatue
      }
      setSaveReq(saveReq)
    } else if (action === 'edit') {
      const initModalData = {
        categoryInfo: modalReq?.categoryInfo,
        publishStatue: modalReq?.publishStatue,
        original: modalReq?.original,
        recommend: modalReq?.recommend
      }
      blogForm.setFieldsValue({ ...modalReq, ...initModalData })
      // 绑定富文本编辑器
      editorRef.current?.setContent(modalReq?.contentText ?? '')

      // 设置待保存的值
      const labelIds: string[] = modalReq?.blogLabelList?.map(item => item.value?.toString() ?? '') ?? []
      const saveReq: BlogContentModalSaveReq = {
        surrogateId: modalReq?.key,
        title: modalReq?.title,
        introduction: modalReq?.introduction,
        categoryId: modalReq?.categoryInfo?.value ?? '',
        labelIds: labelIds,
        original: modalReq?.original ?? '',
        recommend: modalReq?.recommend ?? '',
        topicId: modalReq?.topicInfo?.value ?? '',
        status: modalReq?.publishStatue ?? '',
        contentText: modalReq?.contentText ?? '',
        imgUrl: ''
      }
      setSaveReq(saveReq)
    } else {
      messageApi?.error('操作错误')
      return
    }
  }

  type TagRender = SelectProps['tagRender']
  const tagRender: TagRender = props => {
    const { label, value, closable, onClose } = props
    const option = labelList?.find(opt => opt.value === value)
    return (
      <Tag color={option?.color} closable={closable} onClose={onClose}>
        {label}
      </Tag>
    )
  }

  /**
   * 点击保存
   * @returns
   */
  const handleBlogOk = async () => {
    const valid = await blogForm.validateFields()
    const params = blogForm.getFieldsValue()
    if (!valid) {
      return
    }

    if (action === 'create') {
      const req: BlogContentAddReq = {
        title: params.title,
        original: params.original,
        introduction: params.introduction,
        recommend: saveReq?.recommend ?? '',
        status: saveReq?.status ?? '',
        categoryId: saveReq?.categoryId ?? '',
        labelIds: saveReq?.labelIds ?? [],
        topicId: saveReq?.topicId ?? '',
        contentText: saveReq?.contentText ?? '',
        imgUrl: saveReq?.imgUrl ?? ''
      }
      const res = await api.add(req)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else if (action === 'edit') {
      const req: BlogContentEditeReq = {
        surrogateId: params.key,
        title: params.title,
        original: params.original,
        introduction: params.introduction,
        recommend: params.recommend,
        status: params.publishStatue,
        categoryId: saveReq?.categoryId ?? '',
        labelIds: saveReq?.labelIds ?? [],
        topicId: saveReq?.topicId ?? '',
        contentText: saveReq?.contentText ?? '',
        imgUrl: saveReq?.imgUrl ?? ''
      }
      const res = await api.edit(req)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else {
      messageApi?.error('操作异常')
      return
    }
    update()
    handleBlogCancel()
  }

  /**
   * 关门-Modal
   */
  const handleBlogCancel = () => {
    blogForm.resetFields()
    setOpenModal(false)
    clearSaveReq()
    editorRef.current?.setContent('')
  }

  /**
   * 移除图片
   */
  const handleRemoveImage = () => {
    // setRadioValue('')
  }

  /**
   * 选择图片时打开
   */
  const openImageListModal = () => {}

  /**
   * 选择标签
   */
  const handleChangeLabels = (value: SelectProps['options']) => {
    setSaveReq({ ...saveReq, labelIds: value?.map(({ key }) => key) ?? [] })
  }

  /**
   * 选择分类
   * @param value
   */
  const handleChangeCategory = (value: string) => {
    setSaveReq({ ...saveReq, categoryId: value })
  }

  /**
   * 选择专题
   * @param value
   */
  const handleChangeTopic = (value: string) => {
    setSaveReq({ ...saveReq, topicId: value })
  }

  /**
   * 选择原创/转载
   * @param event
   */
  const onChangeOriginal = (event: RadioChangeEvent) => {
    setSaveReq({ ...saveReq, original: event.target.value })
  }

  const onChangeRecommend = (event: RadioChangeEvent) => {
    setSaveReq({ ...saveReq, recommend: event.target.value })
  }

  const onChangePublishStatue = (event: RadioChangeEvent) => {
    setSaveReq({ ...saveReq, status: event.target.value })
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
          okText={'保存'}
          cancelText={'取消'}
          onOk={handleBlogOk}
          onCancel={handleBlogCancel}
          getContainer={false} // 让 Modal 渲染在当前 DOM 结构
          maskClosable={false} // 禁止点击遮罩层关闭
        >
          <Form
            form={blogForm}
            disabled={inputDisabled}
            preserve={false}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
          >
            <Row gutter={16} justify={'start'}>
              <Col span={12}>
                <Form.Item name={'key'} hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  key={1}
                  name={'title'}
                  label={'标题'}
                  rules={[{ required: true, message: '博客标题不能为空' }]}
                >
                  <Input placeholder={'blog title...'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  key={2}
                  name={'introduction'}
                  label={'简介'}
                  rules={[{ required: true, message: '简介不能为空' }]}
                >
                  <Input placeholder={'blog introduction...'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key={3} name={'imgUrl'} label={'博客封面'}>
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
                <Form.Item
                  key={4}
                  name={'blogLabelList'}
                  label={'标签'}
                  rules={[{ required: true, message: '标签不能为空' }]}
                >
                  <Select
                    mode='multiple'
                    labelInValue={true}
                    tagRender={tagRender}
                    options={labelList}
                    maxCount={4}
                    onChange={value => handleChangeLabels(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  key={5}
                  name={'categoryInfo'}
                  label={'分类'}
                  rules={[{ required: true, message: '分类不能为空' }]}
                >
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
                <Form.Item key={6} name={'topicInfo'} label={'所属专题'}>
                  <Select
                    key={2}
                    showSearch
                    placeholder='select topic'
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
                  key={7}
                  name={'original'}
                  label={'是否原创'}
                  rules={[{ required: true, message: '原创类型不能为空' }]}
                >
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
                  key={8}
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
                  key={9}
                  name={'publishStatue'}
                  label={'发布状态'}
                  rules={[{ required: true, message: '发布状态不能为空' }]}
                >
                  <Radio.Group onChange={onChangePublishStatue}>
                    {blogPublisStatue.length &&
                      blogPublisStatue.map(item => {
                        return (
                          <Radio key={item.value} value={item.type}>
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
                  initialValue={modalReq?.contentText || ''}
                  onEditorChange={(newValue, editor) => {
                    setSaveReq({ ...saveReq, contentText: editor.getContent() })
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default BlogModal
