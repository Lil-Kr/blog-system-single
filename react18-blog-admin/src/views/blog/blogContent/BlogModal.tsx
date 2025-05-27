import { useEffect, useRef } from 'react'
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
import blogContentApi, { BlogContentAddReq, BlogContentEditeReq } from '@/apis/blog/content/blogContentApi'
import { useMessage } from '@/components/message/MessageProvider'
import ImageSelectModal from './ImageSelectModal'
import { useImageManageStore } from '@/store/blog/imageStore'

const env = import.meta.env
const modalStyles = {
  body: {
    height: 'calc(100vh - 120px)',
    overflowy: 'auto'
  }
}

const BlogModal = () => {
  const editorRef = useRef<EditorInstance>()
  const messageApi = useMessage()
  const [blogForm] = Form.useForm()
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
    setOpenImageModal,
    clearSaveReq
  } = useBlogModalStore()
  const { imageUrl, setImageUrl, clearImageData } = useImageManageStore()

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
      console.log('--> modalReq:', modalReq?.blogLabelList ?? '')
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
        contentText: modalReq?.contentText ?? ''
      }
      setSaveReq(saveReq)
      setImageUrl(modalReq?.imgUrl ?? '')
    } else {
      messageApi?.error('operation error!')
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
    let contentText = saveReq?.contentText ?? ''
    /**
     * 处理锚点
     */
    const parser = new DOMParser()
    const doc = parser.parseFromString(contentText, 'text/html')
    const headers = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    const toc = headers
      .filter(header => header.id)
      .map(header => ({
        id: header.id,
        text: '#' + ' ' + header.textContent?.replace(/^#+/, '').trim() || '',
        level: parseInt(header.tagName[1], 10)
      }))

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
        contentText: contentText,
        imgUrl: imageUrl,
        paragraph: JSON.stringify(toc)
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
        contentText: contentText,
        imgUrl: imageUrl,
        paragraph: JSON.stringify(toc)
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
  }

  /**
   * 关闭-Modal
   */
  const handleBlogCancel = () => {
    setOpenModal(false)
    clearSaveReq()
    clearImageData()
    editorRef.current?.setContent('')
    blogForm.resetFields()
    update()
  }

  /**
   * 移除图片
   */
  const handleRemoveImage = () => {
    setImageUrl('')
  }

  /**
   * 选择图片时打开
   */
  const openImageListModal = () => {
    setOpenImageModal(true)
  }

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

  /**
   *
   * @param event
   */
  const onChangeRecommend = (event: RadioChangeEvent) => {
    setSaveReq({ ...saveReq, recommend: event.target.value })
  }

  /**
   * 博客发布状态
   */
  const onChangePublishStatue = (event: RadioChangeEvent) => {
    setSaveReq({ ...saveReq, status: event.target.value })
  }

  /**
   * 扩展设置事件
   * @param editor
   */
  const handleSetup = (editor: any) => {
    /**
     * 粘贴方式: 图片时触发上传事件
     */
    editor.on('Paste', async (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData
      if (!clipboardData?.items) return

      const items = clipboardData.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (!item.type.startsWith('image')) continue

        const file = item.getAsFile()
        if (!file) continue

        // 阻止默认插入 base64
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', file)

        try {
          const { code, data } = await blogContentApi.upload({
            data: formData,
            config: {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          })

          if (code !== 200 || !data?.url) {
            throw new Error('上传失败')
          }
          // 上传成功后插入 image-block
          const finalImg = `<img src='${env.VITE_BACKEND_IMAGE_BASE_API}${data.url}' />`
          editor.insertContent(finalImg)
        } catch (err) {
          editor.notificationManager.open({
            text: '图片上传失败, 请稍后再试',
            type: 'error'
          })
        }
        // 只处理一张图片
        break
      }
    })

    /**
     * 添加结构处理 用于替换 <p><img>、<p><a>
     * 替换 <p><img /></p> 为 <div><img /></div>
     */
    editor.on('PreProcess', (e: any) => {
      const doc = e.node as HTMLElement

      doc.querySelectorAll('img').forEach(img => {
        const parent = img.parentElement

        // 如果父节点已经是 image-block 就跳过，避免重复包裹
        if (parent?.classList.contains('image-block')) return

        // 创建新的 div 包裹 img
        const wrapper = document.createElement('div')
        wrapper.className = 'image-block'

        // 替换 img -> wrapper(img)
        parent?.replaceChild(wrapper, img)
        wrapper.appendChild(img)
      })

      /**
       * 处理锚点链接
       * <h3 id="create-thread-4-way"></h3>
       */
      doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(header => {
        const anchor = header.querySelector('a[id]')
        if (anchor && anchor.id && header.childNodes.length === 2) {
          header.id = anchor.id
          anchor.remove()
        }

        // 2. 获取纯文本内容
        const text = header.textContent?.trim() || ''

        // 3. 判断是否以 # 开头
        const match = text.match(/^(#+)\s*(.*)$/)
        if (match) {
          const hashes = match[1] // # 或 ## ...
          const titleText = match[2]

          // 构造 span
          const span = document.createElement('span')
          span.className = 'heading-hash'
          span.textContent = hashes

          // 重置 header 内容
          header.textContent = ''
          header.appendChild(span)
          header.append(' ' + titleText)
        }
      })
    })
  }

  return (
    <div className='save-blog-modal'>
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
          cancelText={'关闭'}
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
                  {imageUrl !== '' ? (
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
                                style={{ fontSize: '1.5rem' }}
                                onClick={e => {
                                  e.stopPropagation() // 防止触发预览
                                  handleRemoveImage()
                                }}
                              />
                            </Flex>
                          )
                        }}
                        src={`${env.VITE_BACKEND_IMAGE_BASE_API}${imageUrl}`}
                      />
                    </div>
                  ) : (
                    <Button type='dashed' onClick={openImageListModal}>
                      {'+'}
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
                  tinymceScriptSrc={env.BASE_URL + 'tinymce/tinymce.min.js'}
                  onInit={(_evt, editor) => {
                    editorRef.current = editor
                  }}
                  init={{
                    height: '60vh',
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
                      'anchor',
                      'indent2em'
                    ],
                    toolbar:
                      'undo redo |' +
                      'styleselect |' +
                      'indent2em bold italic underline strikethrough forecolor backcolor |' +
                      'alignleft aligncenter alignright alignjustify |' +
                      'bullist numlist outdent indent |' +
                      'code preview  codesample |' +
                      'link image imagetools |' +
                      'searchreplace fullscreen |' +
                      'emoticons anchor insertdatetime |' +
                      'removeformat ',
                    codesample_languages: [
                      { text: 'Java', value: 'java' },
                      { text: 'JavaScript', value: 'javascript' },
                      { text: 'TypeScript', value: 'typescript' },
                      { text: 'JSON', value: 'json' },
                      { text: 'SQL', value: 'sql' },
                      { text: 'Bash', value: 'bash' },
                      { text: 'Shell', value: 'shell' },
                      { text: 'YAML', value: 'yaml' },
                      { text: 'HTML/XML', value: 'markup' },
                      { text: 'CSS', value: 'css' },
                      { text: 'JSX', value: 'jsx' },
                      { text: 'TSX', value: 'tsx' },
                      { text: 'Properties', value: 'properties' },
                      { text: 'Python', value: 'python' },
                      { text: 'Scala', value: 'scala' },
                      { text: 'C', value: 'c' },
                      { text: 'C++', value: 'cpp' },
                      { text: 'C#', value: 'csharp' },
                      { text: 'Rust', value: 'rust' },
                      { text: 'Ruby', value: 'ruby' }
                    ],
                    advlist_bullet_styles: 'square',
                    image_advtab: true, // add advanced image tab
                    image_title: true,
                    image_caption: false, // image caption
                    paste_data_images: true, // paste image data
                    automatic_uploads: true,
                    setup: (editor: any) => {
                      handleSetup(editor)
                    },
                    file_picker_callback: (callback, value, meta) => {
                      // Provide image and alt text for the image dialog
                      if (meta.filetype !== 'image') {
                        return
                      }

                      /**
                       * 创建上传按钮, 并实现上传逻辑
                       * 只接受图片文件
                       */
                      const input = document.createElement('input')
                      input.setAttribute('type', 'file')
                      input.setAttribute('accpet', 'image/*')

                      input.addEventListener('change', async (e: Event) => {
                        const target = e.target as HTMLInputElement
                        const files = target.files
                        if (!files || files.length === 0) {
                          return
                        }

                        const file = files[0]
                        // 判断图片大小, 2MB
                        const maxSize = 1024 * 1024 * 2
                        if (file.size > maxSize) {
                          messageApi?.warning('文件大小不能超过 2MB')
                          return
                        }
                        // 在这里可以对选中的文件进行处理, 例如上传到服务器等操作
                        if (!file.type.startsWith('image/')) {
                          return
                        }

                        // 上传图片
                        const formData = new FormData()
                        formData.append('image', file)

                        const { code, data } = await blogContentApi.upload({
                          data: formData,
                          config: {
                            headers: { 'Content-Type': 'multipart/form-data' }
                          }
                        })
                        if (code !== 200 || !data?.url) {
                          messageApi?.error('上传失败')
                          throw new Error('上传失败')
                        }

                        const imageUrl: string = env.VITE_BACKEND_IMAGE_BASE_API + data?.url

                        callback(imageUrl, { title: file.name })
                      })
                      input.click()
                    },
                    // language: 'zh_CN',
                    // language_url: import.meta.env.BASE_URL + 'tinymce/langs/zh_CN.js',
                    insertdatetime_formats: ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d', '%Y/%m/%d', '%H:%M:%S', '%D'],
                    insertdatetime_element: true // insert time/date plugin
                    // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px } h2 { font-size:24px; font-weight:bold; margin:20px 0; }'
                    // skin: 'oxide-dark',
                    // content_css: 'dark'
                  }}
                  initialValue={modalReq?.contentText || ''}
                  // 失焦时触发
                  onBlur={(e, editor) => {
                    setSaveReq({ ...saveReq, contentText: editor.getContent() })
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Modal>
        <ImageSelectModal />
      </ConfigProvider>
    </div>
  )
}

export default BlogModal
