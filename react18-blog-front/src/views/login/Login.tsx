import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'

const Login = () => {
  const [btnSize, setSize] = useState<SizeType>('large')
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className='editor'>
    </div>
  )
}

export default Login
