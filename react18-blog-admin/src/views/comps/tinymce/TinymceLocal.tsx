import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as EditorInstance } from 'node_modules/tinymce/tinymce'
import { Button } from 'antd'
import { useTinymceStore } from '@/store/richTextEditor/richTextEditorStore'

interface Anchor {
  id: string | null
  text: string
  url?: string
  children: Anchor[]
}

const TinymceLocal = () => {
  const editorRef = useRef<EditorInstance | null>(null)
  const { tinyMceContents, setTinyMCEContents } = useTinymceStore()
  const [anchors, setAnchors] = useState<{ name: string | null; text: string }[]>([])

  const getEditorContent = () => {
    // console.log('--> contents: ', tinyMceContents)
  }

  const onSetContentHandler = () => {
    if (editorRef.current !== null) {
      // console.log('--> onSetContentHandler editorRef.current not null')
      editorRef.current?.setContent(tinyMceContents)
    }
  }

  const buildTree = (elements: Element[]): Anchor[] => {
    const tree: Anchor[] = []
    const stack: Anchor[] = []

    elements.forEach((element, index) => {
      const level = parseInt(element.tagName.charAt(1), 10)
      const id = element.id || `heading-${index}`
      if (!element.id) {
        element.id = id // 如果没有id，分配一个唯一id
      }
      const newNode: Anchor = {
        id,
        text: element.textContent || '',
        children: []
      }

      while (stack.length > 0 && level <= parseInt(stack[stack.length - 1].text.charAt(1), 10)) {
        stack.pop()
      }

      if (stack.length === 0) {
        tree.push(newNode)
      } else {
        stack[stack.length - 1].children.push(newNode)
      }

      stack.push(newNode)
    })

    return tree
  }

  const getAnchorHandler = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(tinyMceContents, 'text/html')
    const headingElements = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    console.log('--> headingElements ', headingElements[0].tagName)
    // const tree = buildTree(headingElements)
    // console.log(JSON.stringify(tree))
  }

  return (
    <div>
      <Editor
        id={'editor-local'}
        tinymceScriptSrc={'/admin/tinymce/tinymce.min.js'}
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
      <Button onClick={getEditorContent}>获取编辑器内容</Button>
      <Button onClick={onSetContentHandler}>回显数据到编辑框</Button>
      <Button onClick={getAnchorHandler}>获取锚点数据</Button>

      <div dangerouslySetInnerHTML={{ __html: tinyMceContents }} />

      <div dangerouslySetInnerHTML={{ __html: anchors }} />
    </div>
  )
}

export default TinymceLocal
