import { useMessage } from '@/components/message/MessageProvider'
import { useDiaryModalStore } from '@/store/blog/diaryStore'
import { Modal, Form, Input, Select } from 'antd/lib'
import React from 'react'

const DiaryModal = () => {
  const messageApi = useMessage()
  const [form] = Form.useForm()
  const { openModal, setOpenModal, action, inputDisabled, api, title, update } = useDiaryModalStore()

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (!valid) {
      return
    }
    const req = form.getFieldsValue()
    if (action === 'create') {
      const { code, msg } = await api.add(req)
      if (code !== 200) {
        return
      }

      messageApi?.success(msg)
    } else if (action === 'edit') {
      const { code, msg } = await api.edit({ ...req, id: req.id })
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    }
    update()
    handleCancel()
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  return (
    <div className='diray-modal'>
      <Modal
        title={title}
        width={'40vw'}
        okText={'确定'}
        cancelText={'取消'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={false}
        maskClosable={false}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
      >
        <Form form={form} preserve={false} disabled={inputDisabled} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item name={'id'} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={'title'} label='标题'>
            <Input placeholder='标题必填' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={'content'} label='内容'>
            <Input.TextArea rows={10} placeholder='内容, 字数在400字以内' maxLength={400} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DiaryModal
