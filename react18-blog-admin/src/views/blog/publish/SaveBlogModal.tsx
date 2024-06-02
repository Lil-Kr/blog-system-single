import { TinymceLocal } from '@/components/tinymce'
import { useTinymceStore } from '@/store/richTextEditor/richTextEditorStore'
import { IAction, IModalParams, IModalRequestAction, ModalType } from '@/types/component/modal'
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons'
import { Col, ConfigProvider, Form, Input, Modal, Radio, Row, Select, SelectProps, Tag, Upload, message } from 'antd'
const { confirm } = Modal
import blogContentApi, { CreateBlogContentReq, MappedBlogContentDTO } from '@/apis/blog/content'
import { createStyles } from 'antd-style'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { LabelVO } from '@/types/apis/blog/label'
import { BlogCategoryVO } from '@/types/apis/blog/category'
import { BlogTopicVO } from '@/types/apis/blog/topic'
import labelApi from '@/apis/blog/label'
import blogTopicApi from '@/apis/blog/topic'
import blogCategoryApi from '@/apis/blog/category'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance, EditorEvent } from 'node_modules/tinymce/tinymce'
import { Result } from '@/types/base/response'

const useStyle = createStyles(({ token }) => ({
  'blog-modal-body': {}
}))

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

      setTinymecStatus(1, blog.contentText ?? '') // edit blog
      saveBlogForm.setFieldsValue(blog)
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
      console.log('--> selectLabels', selectLabels)
      setSelectedLabelValues(selectLabels)

      const selectBlogCategory = await getCategorys()
      const categorys = selectBlogCategory.map(({ surrogateId, name }, index) => ({
        key: surrogateId,
        value: surrogateId,
        label: name
      }))
      console.log('--> categorys', categorys)
      setSelectCategory(categorys)

      const selectBlogTopic = await getTopics()
      const blogTopics = selectBlogTopic.map(({ surrogateId, name }, index) => ({
        key: surrogateId,
        value: surrogateId,
        label: name
      }))
      setSelectTopic(blogTopics)
      console.log('--> blogTopics', blogTopics)
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

  const showConfirm = () => {
    confirm({
      title: '已编辑的文章内容为保存, 确定要退出吗？',
      icon: <ExclamationCircleFilled />,
      content: '文章尚未保存',
      onOk() {
        saveBlogForm.resetFields()
        setOpenModal(false)
        setTinyMCEContents('')
      },
      onCancel() {}
    })
  }

  const handleCancel = () => {
    if (tinyMceContents !== '' || tinyMceContents.length > 0) {
      showConfirm()
    } else {
      saveBlogForm.resetFields()
      setOpenModal(false)
    }
  }

  const handleOk = async () => {
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
        res = await blogContentApi.edit(params)
      }

      if (res.code === 200) {
        message.success('操作成功')
        saveBlogForm.resetFields()
        setOpenModal(false)
        update()
      } else {
        message.error('操作失败')
        return
      }
    }
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
          // style={modalStyle?.style}
          title={title}
          width={'100vw'}
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
                <Form.Item name={'blogImage'} label={'博客封面'}>
                  {modalAction === 'create' ? (
                    <Upload listType='picture-card'>
                      <button style={{ border: 0, background: 'none' }} type='button'>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Choose</div>
                      </button>
                    </Upload>
                  ) : (
                    <img src={``} />
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
                  {/* <BlogTinymce /> */}

                  <Editor
                    id={'editor-local'}
                    tinymceScriptSrc={'/public/tinymce/tinymce.min.js'}
                    onInit={(_evt, editor) => {
                      editorRef.current = editor
                    }}
                    init={{
                      // placeholder: tinymecStatus === 0 ? '写点什么...' : '请点击上面按钮获取内容',
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
      </ConfigProvider>
    </div>
  )
}

export default SaveBlogModal
