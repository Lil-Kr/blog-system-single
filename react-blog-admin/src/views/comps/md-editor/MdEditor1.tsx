import React, { useRef, useState } from 'react'
import { MdEditor, ExposeParam,EditorProps } from 'md-editor-rt'
import { Button, Form, Input, Select, message } from 'antd'
import Space, { SpaceSize } from 'antd/lib/space'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

// css
import 'md-editor-rt/lib/style.css'
import 'md-editor-rt/lib/preview.css'


const scrollElement = document.documentElement

const MdEditor1 = () => {

  const [data, setData] = useState<EditorProps>({
    modelValue:'',
    toolbars: [
      'bold',
      'underline',
      'italic',
      '-',
      'strikeThrough',
      'sub',
      'sup',
      'quote',
      'unorderedList',
      'orderedList',
      'task',
      '-',
      'codeRow',
      'code',
      'link',
      'image',
      'table',
      'mermaid',
      'katex',
      '-',
      'revoke',
      'next',
      'save',
      '=',
      'pageFullscreen',
      'fullscreen',
      'preview',
      'htmlPreview',
      'catalog',
      'github'
    ],
    toolbarsExclude: ['github']
  })

  const [text, setText] = useState('# Hello Editor')
  const [html, setHtml] = useState('')

  const [size, setSize] = useState<SpaceSize | [SpaceSize, SpaceSize]>('small')
	const [loading, setLoading] = useState<boolean>(false)
  const [btnSize, setBntSize] = useState<SizeType>('middle')
  const [id, setId] = useState('preview-only')

  const editorRef = useRef<ExposeParam>();

  const changeFunc = (v: string) => {
    setText(v)
  }

  const saveBlog = (v:string, h: Promise<string>) => {
    console.log(v)
  }

  /**
	 * save
	 * @param values
	 */
	const onFinish = (v) => {
    console.log('--> html: ', html)
	}

  /**
   * onFinishFailed
   */
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
          className="md-editor-rt-blog-form"
          name="basic"
          layout="horizontal"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <MdEditor 
          key={1}
          editorId={id} // editorId 当一个page有2个 MdEditor 组件时, 必须设置该属性
          // htmlPreview preview={false}
          modelValue={text} 
          onChange={changeFunc} 
          onSave={saveBlog} // 会触发 ctrl + S
          onHtmlChanged={(v) => setHtml(v)}
          // toolbars={data.toolbars}
          // toolbarsExclude={data.toolbarsExclude} // 不显示工具栏的 某个属性, 配置如上
        />
        <br />
        
			  <Form.Item>
          <Space>
            <Button size={btnSize} loading={loading} type="primary" htmlType="submit">存草稿</Button>
            <Button size={btnSize} loading={loading} type="primary" htmlType="submit">保存</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default MdEditor1