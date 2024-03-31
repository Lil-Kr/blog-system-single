import { Form, FormInstance, Input, Space } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const Label = (props, ref) => {
  const [lableForm] = Form.useForm()

  const {inputDisabled, fomeValues, onDataChange} = props
  useEffect(() => {
    // lableForm && lableForm.current && lableForm.current.resetFields()
    lableForm.resetFields()
  }, [fomeValues, inputDisabled])


  useImperativeHandle(ref, () => ({
    form: lableForm,
    check: checkForm
  }))

  const checkForm = () => {
    lableForm.validateFields()
      .then((value) => {
        onDataChange({state:true,loadingState:false, value})
      })
      .catch((error) => {
        console.error('表单验证失败: ', error)
        onDataChange({state:false, loadingState:false})
      })
  }

  return (
    <>
      <Form
        className="lable-form"
        name="lable-form"
        form={lableForm}
        // ref={lableForm}
        labelCol={{flex: '100px'}}
        layout="horizontal"
        preserve={false}
        initialValues={fomeValues} // 反向绑定值时, 需要用这个, 不能用useState(), 不会触发重新渲染
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        disabled={inputDisabled}
      >
        
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          <Form.Item name={'number'} label='编号'>
            <Input placeholder="编号, 选填" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={'name'} label='标签名' rules={[{required: true}]}>
            <Input placeholder="标签名" style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item name={'remark'} label='备注' >
            <Input.TextArea rows={4} placeholder="备注, 字数在200字以内" maxLength={200} style={{ width: '100%' }}/>
          </Form.Item>
        </Space>
      </Form>
    </>
  )
}

const LabelWrappedForm = forwardRef(Label)

export default LabelWrappedForm
export {Label}