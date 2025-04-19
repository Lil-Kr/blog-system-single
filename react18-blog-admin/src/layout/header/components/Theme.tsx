import { Button } from 'antd/lib'
import React, { useState } from 'react'

const Theme = () => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <>
      {/* <i
        className='icon-style iconfont icon-zhuti'
        onClick={() => {
          setVisible(true)
        }}
      ></i> */}
      <Button color='default' variant='text'>
        {'主题切换'}
      </Button>
    </>
  )
}

export default Theme
