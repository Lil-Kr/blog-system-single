import React, { act, useEffect } from 'react'
import { useMessage } from '@/components/message/MessageProvider'
import { Form, Input, Modal } from 'antd/lib'
import TextArea from 'antd/lib/input/TextArea'
import { useImageCategoryModalStore } from '@/store/blog/imageStore'
import { ImageCategoryAddReq, ImageCategoryEditReq } from '@/types/apis/image/imageType'

const ImageCategoryModal = () => {
  const [modalForm] = Form.useForm()
  const messageApi = useMessage()
  const { api, title, openModal, inputDisabled, action, modalData, setOpenModal, setInputDisabled, updateCallBack } =
    useImageCategoryModalStore()

  useEffect(() => {
    if (openModal) {
      initOrgData()
    }
  }, [openModal])

  /**
   * 初始化数据
   * @returns
   */
  const initOrgData = () => {
    if (action === 'create') {
    } else if (action === 'edit') {
      modalForm.setFieldsValue(modalData)
    } else {
      return
    }
  }

  const handleOk = async () => {
    const valid = await modalForm.validateFields()
    const params = modalForm.getFieldsValue()
    if (!valid) {
      return
    }

    if (action === 'create') {
      const addReq: ImageCategoryAddReq = { ...params }
      const res = await api.add(addReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else if (action === 'edit') {
      const editReq: ImageCategoryEditReq = { surrogateId: params.key, ...params }
      const res = await api.edit(editReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else {
      return
    }

    updateCallBack()
    handleCancel()
  }

  const handleCancel = () => {
    modalForm.resetFields()
    setInputDisabled(false)
    setOpenModal(false)
  }

  return (
    <div className='image-category-modal'>
      <Modal
        title={title}
        width={'50vw'}
        okText={'保存'}
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
          form={modalForm}
          preserve={false}
          disabled={inputDisabled}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item key={1} name={'name'} label={'类别名称'} rules={[{ required: true, message: '类别名称不能为空' }]}>
            <Input placeholder={'类别名称必填'} style={{ width: '100%' }} />
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

export default ImageCategoryModal
