import React, { useEffect } from 'react'
import { ModalType } from '@/types/component/modal'
import { colorsOptions } from '@/components/color/color'
import { useMessage } from '@/components/message/MessageProvider'
import { useLabelModalStore } from '@/store/blog/labelStore'
import { Col, Form, Input, Modal, Row, Select } from 'antd/lib'

const LabelDetail = (props: ModalType.CustomModal) => {
  const { update } = props
  const messageApi = useMessage()
  const [labelForm] = Form.useForm()

  const { openModal, setOpenModal, action, inputDisabled, setInputDisabled, api, title, labelData } =
    useLabelModalStore()

  useEffect(() => {
    if (openModal) {
      initData()
    }
  }, [openModal])

  const initData = async () => {
    if (action === 'create') {
      labelForm.resetFields()
    } else if (action === 'edit') {
      labelForm.setFieldsValue({ ...labelData })
    } else {
    }
  }

  /**
   * 提交
   */
  const handleOk = async () => {
    const valid = await labelForm.validateFields()
    if (!valid) {
      return
    }
    const req = labelForm.getFieldsValue()
    if (action === 'create') {
      const res = await api.add(req)
      if (res.code !== 200) {
        messageApi?.error('操作失败')
        return
      }
    } else if (action === 'edit') {
      const res = await api.edit({ ...req, surrogateId: req.key })
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success('操作成功')
    }

    update()
    handleCancel()
  }

  /**
   * 取消
   */
  const handleCancel = () => {
    labelForm.resetFields()
    setOpenModal(false)
    setInputDisabled(false)
  }

  return (
    <div className='label-modal'>
      <Modal
        title={title}
        width={'30vw'}
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
        <Form
          form={labelForm}
          preserve={false}
          disabled={inputDisabled}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={'number'} label='编号'>
            <Input placeholder='编号, 选填' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={'name'} label='标签名' rules={[{ required: true, message: '标签名不能为空' }]}>
            <Input placeholder='标签名' style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name={'color'} label='标签颜色' rules={[{ required: true, message: '标签颜色不能为空' }]}>
            <Select placeholder={'请选择颜色'} style={{ flex: 1 }} options={colorsOptions} />
          </Form.Item>

          <Form.Item name={'colorText'} label='展示颜色' rules={[{ required: true, message: '标签颜色不能为空' }]}>
            <Input placeholder='展示颜色必填' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={'remark'} label='备注'>
            <Input.TextArea rows={4} placeholder='备注, 字数在200字以内' maxLength={200} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default LabelDetail
