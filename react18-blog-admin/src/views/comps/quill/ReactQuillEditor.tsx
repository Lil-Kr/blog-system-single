import { useRef, useState } from 'react'
import ReactQuill, { UnprivilegedEditor, Quill } from 'react-quill'
import BlotFormatter, { AlignAction, DeleteAction, ImageSpec } from 'quill-blot-formatter'
Quill.register('modules/blotFormatter', BlotFormatter)

// import ImageResize from 'quill-image-resize-module-react'
// import { Resize, BaseModule } from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)
// import { ImageResize } from 'quill-image-resize-module'

import { useReactQuillStore } from '@/store/richTextEditor/reactQuillStore'

import { Button, Divider, message } from 'antd'
import 'react-quill/dist/quill.snow.css'

export class CustomImageSpec extends ImageSpec {
  img: HTMLElement | undefined
  deleteIcon

  constructor(formatter: BlotFormatter) {
    super(formatter)
    this.img = undefined
    this.deleteIcon = this.createDeleteIcon()
  }

  createDeleteIcon() {
    const spanElement = document.createElement('span')
    const imgElement = document.createElement('img')
    // imgElement.src = DeleteIcon
    imgElement.alt = 'test image'
    const clsList = ['blot-formatter__toolbar-button', 'blot-delete-icon']
    spanElement.classList.add(...clsList)
    spanElement.appendChild(imgElement)
    spanElement.style.cssText =
      'display: flex; align-items:center; justify-content:center; width: 24px; height: 24px; cursor:pointer; user-select:none; padding: 2px'
    spanElement.addEventListener('click', this.onDeleteIconClick)
    console.log('--> CustomImageSpec createDeleteIcon: ', spanElement.innerHTML)
    return spanElement
  }

  init() {
    console.log('--> CustomImageSpec inti')
    this.formatter.quill.root.addEventListener('click', this.onClick)
    this.formatter.quill.root.addEventListener('scroll', (e: any) => {
      this.formatter.repositionOverlay()
    })
  }

  // getTargetElement() {
  //   return this.img
  // }

  // getTargetElement = () => {

  // }

  onDeleteIconClick = () => {
    // Handle delete icon click
    if (this.img) {
      this.img.remove()
      this.formatter.hide()
    }
  }
}

const ReactQuillEditor = () => {
  const editorRef = useRef<ReactQuill>(null)
  const { contents, setContents } = useReactQuillStore()

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['code-block'],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['link', 'image']
    ],
    blotFormatter: {
      // specs: [CustomImageSpec],
      overlay: {
        style: { border: '1px solid red' }
      },
      resize: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      }
    }
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'code-block',
    'size',
    'link',
    'image'
  ]

  const handleChangeValue = (value: string) => {
    // console.log('--> editor.value: ', value)
    // console.log('--> editor.getEditor(): ', editorRef?.current?.getEditor())
    // console.log('--> editor.getText(): ', editorRef?.current?.getEditor().getText())
    setContents(value)
  }

  const handleGetEditor = () => {
    console.log('--> editor.getEditor(): ', editorRef?.current?.getEditor())
    console.log('--> editor.getText(): ', editorRef?.current?.getEditor().getText())
    console.log('--> editor.getLength(): ', editorRef?.current?.getEditor().getLength())
    console.log('--> editor.getContents(): ', editorRef?.current?.getEditor().getContents())
  }

  const getEditorText = () => {
    const text = editorRef?.current?.getEditor().getText()
    message.info(text)
  }

  const getEditorFormat = () => {
    const format = editorRef?.current?.getEditor().getFormat()
    console.log('--> editor.getFormat(): ', format)
  }

  const getEditorContents = () => {
    const contents = editorRef?.current?.getEditor().getContents()
    console.log('--> editor.getContents(): ', contents)
  }

  const getEditorFocus = () => {
    const editor = editorRef?.current?.getEditor()
    const focus = editor?.focus()
    console.log('--> editor.focus(): ', focus)
  }

  const getEditorHTML = () => {
    const editor = editorRef?.current?.getEditor()
    const html = editorRef?.current?.makeUnprivilegedEditor(editor!).getHTML()
    console.log('--> html: ', html)
  }

  return (
    <div className='text-editor'>
      <ReactQuill
        ref={editorRef}
        tabIndex={1}
        value={contents}
        style={{ height: '50%' }}
        theme='snow'
        modules={modules}
        formats={formats}
        onChange={handleChangeValue}
        // onChangeSelection={range => {
        //   console.log('onChangeSelection--->', range)
        // }}
        // onFocus={range => {
        //   console.log('onFocus--->', range)
        // }}
      ></ReactQuill>

      <Button onClick={getEditorText}>getText</Button>
      <Button onClick={getEditorFormat}>getFormat</Button>
      <Button onClick={getEditorContents}>getContents</Button>
      <Button onClick={getEditorFocus}>focus</Button>
      <Button onClick={getEditorHTML}>getHTML</Button>

      <p dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )
}

export default ReactQuillEditor
