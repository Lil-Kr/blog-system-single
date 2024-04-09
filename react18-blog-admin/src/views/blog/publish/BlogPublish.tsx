import React, { useState } from 'react'
import { Button, Form, Input, Select, Space, Tag } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import { EditorProps, MdEditor } from 'md-editor-rt'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

// css
import 'md-editor-rt/lib/style.css'
import 'md-editor-rt/lib/preview.css'

// 博客标签
const blogLableOptions = [
  { label: 'React', value: 'gold' },
  { label: 'VUE', value: 'lime' },
  { label: 'C#', value: 'green' },
  { label: '操作系统', value: 'cyan' },
  { label: 'Java', value: '#A2007C' },
  { label: '生活', value: '#00BFFF' },
  { label: '恋爱', value: '#FFC1C1' }
]

// 博客分类
const blogTypeOpts = [
  {
    id: '1',
    label: '随笔',
    value: '随笔'
  },
  {
    id: '2',
    label: '生活',
    value: '生活'
  },

  {
    label: '大数据',
    value: '大数据'
  },
  {
    label: '底层系统',
    value: '底层系统'
  }
]

// 文章专题
const blogTopicsOpts = [
  {
    id: '1',
    label: '计算机网络',
    value: '计算机网络'
  },
  {
    id: '2',
    label: 'Java性能分析',
    value: 'Java性能分析'
  },
  {
    id: '3',
    label: 'Vim练级攻略',
    value: 'Vim练级攻略'
  },
  {
    id: '4',
    label: '程序员谈恋爱攻略',
    value: '程序员谈恋爱攻略'
  }
]

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

const BlogPublish = () => {
  const [text, setText] = useState('# 请输入标题')
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [btnSize, setBntSize] = useState<SizeType>('middle')
  const [id, setId] = useState('preview-only')

  const [toolbar, setToolbar] = useState<EditorProps>({
    modelValue: '',
    toolbarsExclude: ['save']
  })

  /**
   * 文章分类搜索
   * @param v
   */
  const blogTypeFunc = (v: string) => {
  }

  /**
   * save
   * @param v
   */
  const onFinish = (html: string) => {
  }
  /**
   * onFinishFailed
   */
  const onFinishFailed = (errorInfo: any) => {
  }

  return (
    <div>
      <Form
        className='blog-save-form'
        name='basic'
        labelCol={{ flex: '100px' }}
        // wrapperCol={{ span: 16 }}
        layout='horizontal'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Space direction='vertical' size='small' style={{ display: 'flex' }}>
          <Form.Item label='文章标题: '>
            <Input placeholder='文章标题' style={{ width: '30%' }} />
          </Form.Item>

          <Form.Item label='文章分类: '>
            <Select
              showSearch
              style={{ width: '30%' }}
              placeholder='文章分类'
              optionFilterProp='children'
              // onChange={onChange}
              onSearch={blogTypeFunc}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              defaultValue={blogTypeOpts[0]}
              options={blogTypeOpts}
            />
          </Form.Item>

          <Form.Item label='标签: '>
            <Select
              mode='multiple'
              suffixIcon
              tagRender={tagRender}
              // defaultValue={['gold']}
              style={{ width: '30%' }}
              options={blogLableOptions}
            />
          </Form.Item>

          <Form.Item label='文章专题: '>
            <Select
              showSearch
              style={{ width: '30%' }}
              placeholder='文章专题'
              optionFilterProp='children'
              // onChange={onChange}
              // onSearch={onSearch}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={blogTopicsOpts}
            />
          </Form.Item>

          <Form.Item>
            <MdEditor
              key={1}
              editorId={id}
              // htmlPreview preview={false}
              modelValue={text}
              onChange={v => setText(v)}
              // onSave={saveBlog}
              onHtmlChanged={v => setHtml(v)}
              // toolbars={data.toolbars}
              toolbarsExclude={toolbar.toolbarsExclude}
            />
          </Form.Item>

          <Form.Item>
            <Space direction='horizontal'>
              <Button size={btnSize} loading={loading} type='primary' htmlType='submit'>
                保存
              </Button>
              <Button size={btnSize} loading={loading} type='primary' htmlType='submit'>
                发布
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
}

export default BlogPublish
