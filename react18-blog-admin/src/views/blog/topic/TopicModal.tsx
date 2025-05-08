import { colorsOptions } from '@/components/color/color'
import { useMessage } from '@/components/message/MessageProvider'
import { useBlogTopicModalStore } from '@/store/blog/topicStore'
import { CreateTopicReq, EditTopicReq } from '@/types/apis/blog/topicType'
import { Form, Input, Modal, Select } from 'antd/lib'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect } from 'react'

const TopicModal = () => {
  const messageApi = useMessage()
  const { api, title, openModal, modalStyle, inputDisabled, action, modalReq, setOpenModal, update } =
    useBlogTopicModalStore()
  const [topicModalForm] = Form.useForm()

  useEffect(() => {
    if (openModal) {
      initData()
    }
  }, [openModal])

  const initData = () => {
    topicModalForm.resetFields()
    if (action === 'create') {
    } else if (action === 'edit') {
      topicModalForm.setFieldsValue(modalReq)
    } else {
      topicModalForm.setFieldsValue(modalReq)
    }
  }

  const handleOk = async () => {
    const valid = await topicModalForm.validateFields()
    if (!valid) {
      return
    }

    const params = topicModalForm.getFieldsValue()
    if (action === 'create') {
      const req: CreateTopicReq = {
        ...params
      }
      const res = await api.add(req)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else if (action === 'edit') {
      const req: EditTopicReq = {
        ...params
      }
      const res = await api.edit(req)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    }
    clear()
  }

  const clear = () => {
    topicModalForm.resetFields()
    update!()
    setOpenModal(false)
  }

  const handleCancel = () => {
    topicModalForm.resetFields()
    setOpenModal(false)
  }

  return (
    <div className='topic-modal-warpper'>
      <Modal
        style={modalStyle}
        title={title}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'确定'}
        cancelText={'取消'}
        destroyOnClose={false}
        maskClosable={false}
        width={'30vw'}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
      >
        <Form form={topicModalForm} disabled={inputDisabled} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={'surrogateId'} hidden>
            <Input />
          </Form.Item>
          <Form.Item key={1} name={'number'} label={'编号'} rules={[{ required: true, message: '编号不能为空' }]}>
            <Input placeholder={'编号必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={2} name={'name'} label={'专题名称'} rules={[{ required: true, message: '专题名称不能为空' }]}>
            <Input placeholder={'专题名称必填'} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            key={3}
            name={'color'}
            label={'展示颜色'}
            rules={[{ required: true, message: '展示颜色不能为空' }]}
          >
            <Select
              showSearch={true}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
              placeholder={'请选择颜色'}
              options={colorsOptions}
            />
          </Form.Item>
          <Form.Item
            key={4}
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

export default TopicModal
