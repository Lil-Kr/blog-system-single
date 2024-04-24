import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from 'antd'
import { useTinymceStore } from '@/store/richTextEditor/reactQuillStore'

type UploadFileInfo = {
  alt?: string
  title?: string
  width?: number
  height?: number
}

const Tinymce = () => {
  const editorRef = useRef<any>(null)
  const { contents, setContents } = useTinymceStore()

  const getEditorContent = () => {
    console.log('--> contents: ', contents)
  }

  return (
    <div>
      <Editor
        id={'myEditor_1'}
        apiKey='o314r7s4fxi7oxfsyq2rm8yoz5exstotuzvrn2qka59zix5v'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          height: 800,
          menubar: false, // menu bar
          statusbar: false, // status bar
          end_container_on_empty_block: true,
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
            'codesample',
            'fullscreen',
            'insertdatetime',
            'media',
            // 'quickbars',
            'markdown',
            'table'
          ],
          toolbar:
            'undo redo | blocks |' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'code codesample |' +
            'link image media |' +
            'fullscreen |' +
            'removeformat',
          paste_data_images: true,
          image_advtab: true, // add advanced image tab
          image_title: true,
          image_caption: true, // image caption
          file_picker_callback: (callback, value, meta) => {
            // Provide image and alt text for the image dialog
            if (meta.filetype == 'image') {
              console.log('--> file_picker_callback, value: ', value)
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
                console.log('Selected File:', file)
                if (!file.type.startsWith('image/')) {
                  return
                }

                const reader = new FileReader()

                reader.onload = function (event) {
                  let fileInfo: UploadFileInfo = {
                    alt: file.name,
                    title: file.name
                  }
                  const image = new Image()
                  image.onload = () => {
                    const width = image.width // 获取图片宽度
                    const height = image.height // 获取图片高度
                    console.log('Image Width:', width, 'px')
                    console.log('Image Height:', height, 'px')
                    fileInfo.width = width
                    fileInfo.height = height
                  }
                  image.src = event.target?.result as string // 设置图片 URL(base64)

                  callback(image.src, { ...fileInfo })
                }
                reader.readAsDataURL(file)
              })
              input.click()
            }

            // Provide alternative source and posted for the media dialog
            if (meta.filetype == 'media') {
              callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' })
            }
          },
          automatic_uploads: true,
          a11y_advanced_options: false,
          file_picker_types: 'image media',
          images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
          content_style: 'body { font-family:Helvetica, Arial, sans-serif; font-size: 16px }'
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
