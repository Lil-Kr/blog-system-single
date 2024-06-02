import { Button, Flex, Form, Select, SelectProps, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { defineConfig } from 'vite'

type TagRender = SelectProps['tagRender']
const options = [
  { value: '1', color: 'red' },
  { value: '2', color: 'green' },
  { value: '3', color: 'blue' }
]
const tagRender: TagRender = props => {
  const { label, value, closable, onClose } = props
  const option = options.find(opt => opt.value === value)

  return (
    <Tag color={option?.color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}

const SelectDemo = () => {
  const [form] = Form.useForm()
  const [selectedLabelValues, setSelectedLabelValues] = useState<SelectProps['options']>([])

  useEffect(() => {
    form.setFieldsValue({
      blogLabelList: [
        { label: '显示-1', value: '1' },
        { label: '显示-2', value: '2' }
      ]
    })
    setSelectedLabelValues([
      { label: '显示-1', value: '1' },
      { label: '显示-2', value: '2' },
      { label: '显示-3', value: '3' }
    ])
  }, [])

  const getVal = () => {
    const a = form.getFieldsValue()
    console.log('--> a: ', a)
  }

  const onChange = (value: any) => {
    console.log('--> onChange: ', value)
  }

  return (
    <Flex vertical={true}>
      <Form form={form} disabled={false} labelCol={{ flex: '100px' }} preserve={false}>
        <Form.Item name={'blogLabelList'} label={'标签'} rules={[{ required: true, message: '标签不能为空' }]}>
          <Select
            mode='multiple'
            tagRender={tagRender}
            labelInValue={true}
            options={selectedLabelValues}
            onChange={onChange}
            maxCount={4}
          />
        </Form.Item>
      </Form>
      <Button onClick={getVal}>获取下拉框值</Button>
    </Flex>
  )
}

export default SelectDemo
