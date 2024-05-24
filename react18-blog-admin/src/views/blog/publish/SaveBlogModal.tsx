import { TinymceLocal } from '@/components/tinymce'
import { useTinymceStore } from '@/store/richTextEditor/reactQuillStore'
import { BaseApi } from '@/types/apis'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, ConfigProvider, Form, Input, Modal, Radio, Row, Select, SelectProps, Tag, Upload, message } from 'antd'
import blogContentApi from '@/apis/blog/content'
import { createStyles, useTheme } from 'antd-style'
import { useImperativeHandle, useState } from 'react'

const useStyle = createStyles(({ token }) => ({
  'blog-modal-body': {}
}))

const options: SelectProps['options'] = [
  { value: '100', label: '随笔' },
  { value: '200', label: 'Java后端' },
  { value: '300', label: 'ReactJS' }
]

type TagRender = SelectProps['tagRender']
const tagRender: TagRender = props => {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  )
}

const optionsLabls: SelectProps['options'] = [
  { value: 'gold', label: 'Java' },
  { value: 'lime', label: 'Golang' },
  { value: 'green', label: '算法' },
  { value: 'cyan', label: '操作系统' }
]

const optionsTopic: SelectProps['options'] = [
  { value: '1', label: '默认' },
  { value: '2', label: 'MIT CS.618' },
  { value: '3', label: 'ReactJS' }
]

const SaveBlogModal = (props: ModalType.SaveBlogModal) => {
  const { styles } = useStyle()
  const { contents, setContents } = useTinymceStore()
  const [saveBlogForm] = Form.useForm()
  const [modal, contextHolder] = Modal.useModal()
  const modalStyles = {
    body: {
      height: 'calc(100vh - 120px)',
      overflowy: 'auto'
    }
  }

  const classNames = {
    body: styles['blog-modal-body']
  }

  const { mRef } = props
  // const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  // const [modalStyle, setModalStyle] = useState<IModalStyle>()
  // const [items, setItems] = useState<ModalType.InputType[]>([])
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)

  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })

  useImperativeHandle(mRef, () => ({
    form: saveBlogForm,
    open
  }))

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction
    // items?: ModalType.InputType[],
    // data?: any
  ) => {
    const { action, open } = type
    const { title } = params

    if (action === 'create') {
    } else if (action === 'edit') {
      // saveBlogForm.setFieldsValue(data)
    } else {
      // saveBlogForm.setFieldsValue(data)
      setInputDisabled(true)
    }

    setOpenModal(open)
    // setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
    // setModalStyle(modalStyle)
    // setItems(items)
  }

  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消'
    })
  }

  const handleCancel = () => {
    setOpenModal(false)
    if (contents !== '') {
      // todo: 富文本编辑器中有内容时, 弹出提示是否关闭当前模态框
      // console.log('contents 不为空')
      // confirm()
      // return
    } else {
      // console.log('content 为空')
    }

    // clear data
    saveBlogForm.resetFields()
    setContents('')
  }

  const handleOk = async () => {
    // const { api } = requestParams
    const valid = await saveBlogForm.validateFields()
    if (valid) {
      const params = saveBlogForm.getFieldsValue()
      params.contentText = contents
      console.log({ ...params })
      const res = await blogContentApi.save(params)
      if (res.code === 200) {
        message.success('操作成功')
        handleCancel()
        // props.update()
      } else {
        message.error('操作失败')
        return
      }
    } else {
      message.error('操作失败')
      return
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
                <Form.Item
                  key={1}
                  name={'title'}
                  label={'标题'}
                  rules={[{ required: true, message: '博客标题不能为空' }]}
                >
                  <Input placeholder={'blog title...'} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  key={1}
                  name={'introduction'}
                  label={'简介'}
                  rules={[{ required: true, message: '简介不能为空' }]}
                >
                  <Input placeholder={'blog introduction...'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item key={1} name={'blogImage'} label={'博客封面'}>
                  <Upload action='/upload.do' listType='picture-card'>
                    <button style={{ border: 0, background: 'none' }} type='button'>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify={'start'}>
              <Col span={12}>
                <Form.Item
                  key={1}
                  name={'labelIds'}
                  label={'标签'}
                  rules={[{ required: true, message: '标签不能为空' }]}
                >
                  <Select
                    mode='multiple'
                    tagRender={tagRender}
                    // defaultValue={['gold', 'cyan']}
                    style={{ width: '100%' }}
                    options={optionsLabls}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  key={1}
                  name={'categoryId'}
                  label={'分类'}
                  rules={[{ required: true, message: '分类不能为空' }]}
                >
                  <Select
                    showSearch
                    placeholder='select category'
                    optionFilterProp='children'
                    // defaultValue={options[0]}
                    // onChange={onChange}
                    // onSearch={onSearch}
                    // filterOption={filterOption}
                    options={options} // 请求后端接口获取数据
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item key={1} name={'topicId'} label={'所属专题'}>
                  <Select
                    showSearch
                    placeholder='select category'
                    optionFilterProp='children'
                    // defaultValue={optionsTopic[0]}
                    // onChange={onChange}
                    // onSearch={onSearch}
                    // filterOption={filterOption}
                    options={optionsTopic} // 请求后端接口获取数据
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify={'start'}>
              <Col span={6}>
                <Form.Item
                  key={1}
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
                  key={1}
                  name={'recommend'}
                  label={'是否推荐'}
                  rules={[{ required: true, message: '是否推荐不能为空' }]}
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
                  key={1}
                  name={'status'}
                  label={'发布状态'}
                  rules={[{ required: true, message: '发布状态不能为空' }]}
                >
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
                <Form.Item
                  key={1}
                  name={'contentText'}
                  label={'内容'}
                  // rules={[{ required: true, message: '博客内容不能为空' }]}
                >
                  <TinymceLocal />
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
