import { BaseApi } from '@/types/apis'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { Button, ConfigProvider, Form, Input, Modal, message } from 'antd'
import { createStyles, useTheme } from 'antd-style'
import { useImperativeHandle, useState } from 'react'

const useStyle = createStyles(({ token }) => ({
  'blog-modal-body': {}
}))

const FullScreenModal = (props: ModalType.FullScreenModalType) => {
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

  const { mRef } = props
  const [fullScreenModalForm] = Form.useForm()
  const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  // const [modalStyle, setModalStyle] = useState<IModalStyle>()
  const [items, setItems] = useState<ModalType.InputType[]>([])
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)

  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })

  useImperativeHandle(mRef, () => ({
    form: fullScreenModalForm,
    open
  }))

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    items: ModalType.InputType[],
    data?: any
  ) => {
    const { action, open } = type
    const { title } = params

    if (action === 'create') {
    } else if (action === 'edit') {
      console.log('--> action edit : ', action)
      fullScreenModalForm.setFieldsValue(data)
    } else {
      fullScreenModalForm.setFieldsValue(data)
      setInputDisabled(true)
    }

    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
    // setModalStyle(modalStyle)
    setItems(items)
  }

  const handleCancel = () => {
    setOpenModal(false)
    fullScreenModalForm.resetFields()
  }

  const handleOk = async () => {
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
    <div className='fullScreenModal'>
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
          <Form form={fullScreenModalForm} disabled={inputDisabled} labelCol={{ flex: '100px' }}>
            {items.map((item, index) => (
              <Form.Item key={index} name={item.name} label={item.label} rules={item.rules}>
                <Input placeholder={item.textValue} style={item.style} />
              </Form.Item>
            ))}
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default FullScreenModal
