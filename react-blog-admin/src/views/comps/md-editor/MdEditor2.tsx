import React from 'react'
import MDEditor from '@uiw/react-md-editor'

const MdEditor2 = () => {
  const [value, setValue] = React.useState("**Hello world!!!**")

  return (
    <>
      <div className="container">
        <MDEditor
          value={value}
          onChange={setValue}
        />
        {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
      </div>
    </>
  )
}

export default MdEditor2