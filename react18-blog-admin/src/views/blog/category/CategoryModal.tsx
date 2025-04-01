import { colorsOptions } from '@/components/color/color'
import { useMessage } from '@/components/message/MessageProvider'
import { useCategoryModalStore } from '@/store/blog/categoryStore'
import { CategoryTableType, CreateCategoryReq, EditCategoryReq } from '@/types/apis/blog/category'
import { Form, Input, Modal, Select } from 'antd/lib'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect } from 'react'

const CategoryModal = () => {
  const messageApi = useMessage()
  const [categoryModalForm] = Form.useForm()
  const {
    api,
    title,
    action,
    openModal,
    inputDisabled,
    modalStyle,
    setOpenModal,
    setRequestParams,
    req,
    data,
    update
  } = useCategoryModalStore()

  useEffect(() => {
    if (openModal) {
      initData()
    }
  }, [openModal])

  const initData = () => {
    categoryModalForm.resetFields()
    if (action === 'create') {
    } else if (action === 'edit') {
      categoryModalForm.setFieldsValue(req)
      setRequestParams({ ...req } as CategoryTableType)
    } else {
      categoryModalForm.setFieldsValue(req)
    }
  }

  const handleOk = async () => {
    const valid = await categoryModalForm.validateFields()
    if (!valid) {
      return
    }

    const params = categoryModalForm.getFieldsValue()
    if (action === 'create') {
      const req: CreateCategoryReq = {
        number: params.number,
        name: params.name,
        color: params.color,
        remark: params.remark
      }
      const res = await api.add(req)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else if (action === 'edit') {
      const req: EditCategoryReq = {
        surrogateId: params.key,
        number: params.number,
        name: params.name,
        color: params.color,
        remark: params.remark
      }
      const res = await api.edit(req)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else {
    }

    handleCancel()
  }

  const handleCancel = () => {
    setOpenModal(false)
    update!()
  }

  const handleColorSelectorChange = (value: string) => {
    setRequestParams({ ...data, color: value ?? '' } as CategoryTableType)
  }

  return (
    <div className='category-modal-wrapper'>
      <Modal
        style={modalStyle}
        title={title}
        okText={'确定'}
        cancelText={'取消'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={false}
        maskClosable={false}
        // width={'100vw'}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
      >
        <Form form={categoryModalForm} disabled={inputDisabled} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item key={1} name={'number'} label={'编号'} rules={[{ required: true, message: '编号不能为空' }]}>
            <Input placeholder={'编号必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={2} name={'name'} label={'分类名称'} rules={[{ required: true, message: '分类名称不能为空' }]}>
            <Input placeholder={'分类名称必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            key={5}
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
              onChange={value => handleColorSelectorChange(value)}
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

export default CategoryModal
