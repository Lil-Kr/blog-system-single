import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance, EditorEvent } from 'node_modules/tinymce/tinymce'
import { Button, Flex } from 'antd'
import { useTinymceStore } from '@/store/richTextEditor/richTextEditorStore'

const TinymceLocal = () => {
  // const { contentText, action } = props
  const editorRef = useRef<EditorInstance | null>(null)
  const { tinyMceContents, tinymecStatus, setTinyMCEContents } = useTinymceStore()

  const onSetContentHandler = () => {
    if (editorRef.current !== null) {
      editorRef.current?.setContent(tinyMceContents)
    }
  }
  return (
    <Flex className='text-editor' vertical={true} gap='small'>
      <Button style={{ width: '10%' }} type='primary' onClick={onSetContentHandler}>
        编辑状态下获取内容
      </Button>
      <Editor
        id={'editor-local'}
        tinymceScriptSrc={'/public/tinymce/tinymce.min.js'}
        onInit={(_evt, editor) => {
          editorRef.current = editor
        }}
        init={{
          placeholder: tinymecStatus === 0 ? '写点什么...' : '请点击上面按钮获取内容',
          height: 500,
          menubar: true, // menu bar
          statusbar: false, // status bar
          promotion: false, // upgrade the pro version
          branding: false, // remove the branding
          // end_container_on_empty_block: true,
          plugins: [
            'lists',
            'advlist',
            'link',
            'code',
            'preview',
            'codesample',
            // 'codemirror',
            'image',
            'imagetools',
            'searchreplace',
            'fullscreen',
            'emoticons',
            'insertdatetime',
            'anchor'
          ],
          toolbar:
            'undo redo |' +
            'styleselect |' +
            // 'blocks |' +
            'bold italic underline strikethrough forecolor backcolor |' +
            'alignleft aligncenter alignright alignjustify |' +
            'bullist numlist outdent indent |' +
            // 'code codesample |' +
            'code preview  codesample |' +
            'link image |' +
            'searchreplace fullscreen |' +
            'emoticons anchor insertdatetime |' +
            'removeformat',
          advlist_bullet_styles: 'square',
          paste_data_images: true,
          image_advtab: true, // add advanced image tab
          image_title: true,
          image_caption: true, // image caption
          file_picker_callback: (callback, value, meta) => {
            // Provide image and alt text for the image dialog
            if (meta.filetype == 'image') {
              const input = document.createElement('input')
              input.setAttribute('type', 'file')
              input.setAttribute('accpet', 'image/*') // 只接受图片文件

              input.addEventListener('change', (e: Event) => {
                const target = e.target as HTMLInputElement
                const files = target.files
                if (!files || files.length === 0) {
                  return
                }

                const file = files[0]
                // 在这里可以对选中的文件进行处理, 例如上传到服务器等操作
                if (!file.type.startsWith('image/')) {
                  return
                }

                const reader = new FileReader()
                reader.addEventListener('load', () => {
                  const id = 'blobid' + new Date().getTime()
                  const blobCache = editorRef.current?.editorUpload.blobCache
                  const base64 = (reader.result as string).split(',')[1]
                  const blobInfo = blobCache?.create(id, file, base64)
                  blobCache?.add(blobInfo!)
                  callback(blobInfo?.blobUri()!, { title: file.name })
                })
                reader.readAsDataURL(file)
              })
              input.click()
            }
          },
          insertdatetime_formats: ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d', '%Y/%m/%d', '%H:%M:%S', '%D'],
          insertdatetime_element: true, // insert time/date plugin
          content_style: 'body { font-family:Helvetica, Arial, sans-serif; font-size: 16px }'
          // skin: 'oxide-dark',
          // content_css: 'dark'
        }}
        onEditorChange={(newValue, editor) => {
          setTinyMCEContents(editor.getContent())
        }}
      />
    </Flex>
  )
}

export default TinymceLocal
