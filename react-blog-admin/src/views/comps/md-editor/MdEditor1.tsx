import React, { useState } from 'react'
import { MdEditor, MdCatalog } from 'md-editor-rt'
import { Button, Form, Input, message } from 'antd'

// css
import 'md-editor-rt/lib/style.css'
import 'md-editor-rt/lib/preview.css'

const scrollElement = document.documentElement

const MdEditor1 = () => {
  const [text, setText] = useState('# Hello Editor')
  
  // const [text] = useState('# Hello Editor');
  const [id] = useState('preview-only')

  return (
    <>
      <MdEditor editorId={id} modelValue={text} onChange={setText} />
      
    </>
  )
}

export default MdEditor1