import { BaseApi } from '@/types/apis'
import { IAction, IModalParams, IModalRequestAction, ModalType } from '@/types/modal'
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

  const [requestParams, setRequestParams] = useState<IModalRequestAction<BaseApi>>({
    api: {}
  })

  useImperativeHandle(mRef, () => ({
    form: fullScreenModalForm,
    open
  }))

  const open = (requestParams: IModalRequestAction<any>, params: IModalParams, type: IAction, data?: any) => {
    console.log('--> 进入open方法, data: ', data)
    const { action, open } = type
    const { title } = params
    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
  }

  const handleCancel = () => {
    console.log('--> 关闭了')
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
          <Form form={fullScreenModalForm}>
            <Form.Item name={'number'} label='编号'>
              <Input placeholder='编号, 选填' style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={'number'} label='编号'>
              <Input placeholder='编号, 选填' style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={'number'} label='编号'>
              <Input placeholder='编号, 选填' style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={'number'} label='编号'>
              <Input placeholder='编号, 选填' style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default FullScreenModal
