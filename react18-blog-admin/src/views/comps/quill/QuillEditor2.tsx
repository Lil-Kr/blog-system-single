import React, { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'
import 'quill/dist/quill.snow.css'

/**
 * it`s test resize image
 */
const QuillEditor2 = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  })

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter)
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents) => {
        console.log('Text change!')
        console.log(delta)

        // console.log(quill.root.innerHTML) // Get innerHTML using quill
        // let currrentContents = quill.getContents()
        // console.log('--> diff', currrentContents.diff(oldContents))
      })
    }
  }, [quill, Quill])

  return (
    <div>
      <div ref={quillRef} />
    </div>
  )
}

export default QuillEditor2
