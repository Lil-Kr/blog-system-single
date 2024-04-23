import React from 'react'
import { FloatingMenu, BubbleMenu, useEditor, EditorProvider, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TiptapMenu from './TiptapMenu'
import { ConfigProvider, Form } from 'antd'

const Tiptap = () => {
  const extensions = [StarterKit, Document, Paragraph, Text]
  const element = document.querySelector('.element')
  const content = `<h2>Welcome to the Editor</h2>`

  return (
    <div className='tiptap-form' style={{ border: '1px solid #1d39c4', borderRadius: '5px' }}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultBorderColor: '#ffffff'
            }
          }
        }}
      >
        <EditorProvider slotBefore={<TiptapMenu />} extensions={extensions} content={content} children={undefined} />
      </ConfigProvider>
    </div>
  )
}

export default Tiptap
