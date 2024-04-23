import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from 'antd'
import { useTinymceStore } from '@/store/richTextEditor/reactQuillStore'

const Tinymce = () => {
  const editorRef = useRef(null)
  const { contents, setContents } = useTinymceStore()

  const getEditorContent = () => {
    console.log('--> contents: ', contents)
  }

  return (
    <div>
      <Editor
        apiKey='your api key'
        // onInit={(_evt, editor) => {}}
        // ref={editorRef}
        initialValue={contents}
        init={{
          height: 500,
          skin: true, // 皮肤
          menubar: false, // 菜单栏
          statusbar: false, // 状态栏
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'editimage',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table'
          ],
          toolbar:
            'undo redo | blocks |' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'code |' +
            'link image |' +
            'fullscreen |' +
            'removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
        }}
        onEditorChange={(newV, editor) => {
          setContents(editor.getContent())
        }}
      />
      <Button onClick={getEditorContent}>获取编辑器内容</Button>

      <p dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )
}

export default Tinymce
