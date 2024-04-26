import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance, EditorEvent } from 'node_modules/tinymce/tinymce'
import { Button } from 'antd'
import { useTinymceStore } from '@/store/richTextEditor/reactQuillStore'

const TinymceLocal = () => {
  const editorRef = useRef<EditorInstance | null>(null)
  const { contents, setContents } = useTinymceStore()

  const getEditorContent = () => {
    console.log('--> contents: ', contents)
  }

  const onSetContentHandler = () => {
    if (editorRef.current !== null) {
      console.log('--> onSetContentHandler editorRef.current not null')
      editorRef.current?.setContent(contents)
    }
  }

  return (
    <div>
      <Editor
        id={'editor-local'}
        // apiKey='o314r7s4fxi7oxfsyq2rm8yoz5exstotuzvrn2qka59zix5v'
        tinymceScriptSrc={'/public/tinymce/tinymce.min.js'}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
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
            'codesample',
            'imagetools',
            'image',
            'searchreplace',
            'fullscreen',
            'emoticons',
            'anchor',
            'accordion'
          ],
          toolbar:
            'undo redo |' +
            'bold italic underline strikethrough forecolor backcolor |' +
            'alignleft aligncenter alignright alignjustify |' +
            'bullist numlist outdent indent |' +
            'code codesample |' +
            'link image |' +
            'searchreplace fullscreen |' +
            'emoticons anchor accordion |' +
            'removeformat'
          ,
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
                // 在这里可以对选中的文件进行处理，例如上传到服务器等操作
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
          content_style: 'body { font-family:Helvetica, Arial, sans-serif; font-size: 20px }'
        }}
        onEditorChange={(newValue, editor) => {
          setContents(editor.getContent())
        }}
      />
      <Button onClick={getEditorContent}>获取编辑器内容</Button>
      <Button onClick={onSetContentHandler}>回显数据到编辑框</Button>

      <p dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )
}

export default TinymceLocal