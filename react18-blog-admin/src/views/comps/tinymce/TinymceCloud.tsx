import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance, EditorEvent } from 'node_modules/tinymce/tinymce'
import { Button } from 'antd'
import { useTinymceStore } from '@/store/richTextEditor/reactQuillStore'

const TinymceCloud = () => {
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

  // const a = 'abc'
  // useEffect(() => {
  //   console.log('--> useEffect editorRef.current not null')
  //   if (editorRef.current !== null) {
  //     editorRef.current?.setContent(a)
  //   }
  // }, [editorRef.current])

  return (
    <div>
      {/* <Editor
        id={'editor-cloud'}
        apiKey='o314r7s4fxi7oxfsyq2rm8yoz5exstotuzvrn2qka59zix5v'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
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
            'code',
            'codesample',
            'fullscreen',
            'insertdatetime',
            'media',
            'save',
            'searchreplace',
            'visualblocks',
            'emoticons',
            // 'autoresize', // 调节文本框 宽高的
            'anchor',
            'accordion',
            'visualchars',
            'quickbars',
            'table'
          ],
          toolbar:
            'undo redo |' +
            'blocks |' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'code codesample |' +
            'link image media quickimage quicktable save |' +
            'searchreplace fullscreen |' +
            'emoticons anchor accordion visualchars visualblocks |' +
            'removeformat',
          quickbars_insert_toolbar: false,
          quickbars_selection_toolbar: false,
          quickbars_image_toolbar: true,
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
                reader.addEventListener('load', () => {
                  const id = 'blobid' + new Date().getTime()
                  const blobCache = editorRef.current?.editorUpload.blobCache
                  // const readerResStr = (reader.result as string).
                  const base64 = (reader.result as string).split(',')[1]
                  const blobInfo = blobCache?.create(id, file, base64)
                  blobCache?.add(blobInfo!)
                  callback(blobInfo?.blobUri()!, { title: file.name })
                })
                // reader.onload = function (event) {
                //   let fileInfo: UploadFileInfo = {
                //     alt: file.name,
                //     title: file.name
                //   }
                //   const image = new Image()
                //   image.onload = () => {
                //     const width = image.width // 获取图片宽度
                //     const height = image.height // 获取图片高度
                //     // console.log('Image Width:', width, 'px')
                //     // console.log('Image Height:', height, 'px')
                //     fileInfo.width = width
                //     fileInfo.height = height
                //   }
                //   image.src = event.target?.result as string // 设置图片 URL(base64)

                //   callback(image.src, { ...fileInfo })
                // }
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
          save_enablewhendirty: false,
          // autoresize_bottom_margin: 50,
          // autoresize_overflow_padding: 50,
          visualchars_default_state: false,
          content_style: 'body { font-family:Helvetica, Arial, sans-serif; font-size: 16px }'
        }}
        onEditorChange={(newValue, editor) => {
          setContents(editor.getContent())
        }}
      /> */}
      <Button onClick={getEditorContent}>获取编辑器内容</Button>
      <Button onClick={onSetContentHandler}>回显数据到编辑框</Button>

      <p dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )
}

export default TinymceCloud
