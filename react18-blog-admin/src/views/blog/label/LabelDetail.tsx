import { Form, Input, Modal, message } from 'antd'
import React, { useImperativeHandle, useState } from 'react'
import { LabelDTO } from '@/types/apis/blog/label'
import { IAction, IModalProp } from '@/types/component/modal'
// api
import blogApi from '@/apis/blog/label'

const LabelDetail = (props: IModalProp<LabelDTO>) => {
  const [labelForm] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState('create')
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)

  const { mRef, update } = props

  useImperativeHandle(mRef, () => ({
    form: labelForm,
    open
  }))

  const open = (type: IAction, data?: LabelDTO) => {
    const { action, open } = type
    setOpenModal(open)
    setAction(action)

    if (action == 'edit') {
      labelForm.setFieldsValue(data)
    } else if (action == 'look') {
      labelForm.setFieldsValue(data)
      setInputDisabled(true)
    } else {
      // create
      labelForm.resetFields()
    }
  }

  /**
   * 提交
   */
  const handleOk = async () => {
    const valid = await labelForm.validateFields()
    if (valid) {
      const params = labelForm.getFieldsValue()
      if (action === 'create') {
        const res = await blogApi.save(params)
        if (res.code === 200) {
          message.success('操作成功')
          handleCancel()
          props.update()
        } else {
          message.success('操作失败')
        }
      } else if (action === 'edit') {
        const param = { surrogateId: params.key, ...params }
        const res = await blogApi.edit(param)
        if (res.code === 200) {
          message.success('操作成功')
          handleCancel()
          props.update()
        } else {
          message.success('操作失败')
        }
      }
    } else {
      message.success('操作失败')
    }
  }

  /**
   * 取消
   */
  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    labelForm.resetFields()
  }

  return (
    <div className='label-modal'>
      <Modal
        title={action === 'create' ? '新增标签' : '编辑标签'}
        width={800}
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
        <Form form={labelForm} labelCol={{ flex: '100px' }} preserve={false} disabled={inputDisabled}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={'number'} label='编号'>
            <Input placeholder='编号, 选填' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={'name'} label='标签名' rules={[{ required: true, message: '标签名不能为空' }]}>
            <Input placeholder='标签名' style={{ width: '100%' }} />
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
