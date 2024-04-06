import React, { useImperativeHandle, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { ConfigProvider, Form, Input } from 'antd'
import { act } from 'react-dom/test-utils'

const BaseModal = (props: ModalType.BaseModalType) => {
  const { mRef } = props
  const [baseModalForm] = Form.useForm()
  const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [modalStyle, setmdalStyle] = useState<IModalStyle>()
  const [items, setItems] = useState<ModalType.InputType[]>([])
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)

  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })

  useImperativeHandle(mRef, () => ({
    form: baseModalForm,
    open
  }))

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    modalStyle: IModalStyle,
    items: ModalType.InputType[],
    data?: any
  ) => {
    const { action, open } = type
    const { title } = params

    if (action === 'create') {
    } else if (action === 'edit') {
      console.log('--> action edit : ', action)
      baseModalForm.setFieldsValue(data)
    } else {
      baseModalForm.setFieldsValue(data)
      setInputDisabled(true)
    }

    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
    setmdalStyle(modalStyle)
    setItems(items)
  }

  const handleCancel = () => {
    setOpenModal(false)
    baseModalForm.resetFields()
  }

  const handleOk = async () => {
    const valid = await baseModalForm.validateFields()
    const { api } = requestParams
    console.log('--> 封装组件Modal: ')
    let param = {
      number: '100',
      name: '分布式系统',
      remard: '分布式系统'
    }
    // await api.save!(param)
  }

  return (
    <div className='baseModal'>
      {/* <ConfigProvider>
      </ConfigProvider> */}
      <Modal
        // style={{
        //   maxWidth: '50vw',
        //   top: 0,
        //   paddingBottom: 0
        // }}
        style={modalStyle?.style}
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
        <Form form={baseModalForm} disabled={inputDisabled} labelCol={{ flex: '100px' }}>
          {items.map((item, index) => (
            <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
              <Input placeholder={item.textValue} style={item.style} />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  )
}

export default BaseModal
