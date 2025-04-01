import React, { useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { Modal, Form, Input } from 'antd/lib'
const { TextArea } = Input
import { UserTableType } from '@/types/apis/sys/user/userType'
import { useMessage } from '@/components/message/MessageProvider'

const DictDetailModal = (props: ModalType.CustomModal) => {
  const messageApi = useMessage()
  const { mRef, update } = props
  const [modalForm] = Form.useForm()
  const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)
  const [modalStyle, setmdalStyle] = useState<IModalStyle>()
  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })

  useImperativeHandle(mRef, () => ({
    form: modalForm,
    open
  }))

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    modalStyle: IModalStyle,
    data?: UserTableType
  ) => {
    const { action, open } = type
    const { title } = params

    if (action === 'create') {
      modalForm.resetFields()
    } else if (action === 'edit') {
      modalForm.setFieldsValue(data)
    } else {
      modalForm.setFieldsValue(data)
      setInputDisabled(true)
    }

    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
    setmdalStyle(modalStyle)
  }

  const handleOk = async () => {
    const valid = await modalForm.validateFields()
    const { api } = requestParams
    const params = modalForm.getFieldsValue()
    if (!valid) {
      return
    }

    if (action === 'create') {
      const res = await api.add!(params)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else if (action === 'edit') {
      const req = {
        surrogateId: params.key,
        ...params
      }
      const res = await api.edit!(req)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else {
      return
    }

    handleCancel()
    update()
  }

  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    modalForm.resetFields()
  }

  const handleChange = (value: string) => {}

  return (
    <div className='dict-detail-modal'>
      <Modal
        style={{ maxWidth: '30vw' }}
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
        <Form form={modalForm} disabled={inputDisabled} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item key={1} name={'name'} label={'字典名'} rules={[{ required: true, message: '字典名不能为空' }]}>
            <Input placeholder={'字典名必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            key={2}
            name={'remark'}
            label={'备注'}
            rules={[{ required: false, message: '备注不超过200个字符' }]}
          >
            <TextArea rows={4} placeholder='备注不超过200个字符' style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DictDetailModal
