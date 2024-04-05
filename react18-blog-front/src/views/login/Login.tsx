import { LockOutlined, UserOutlined } from '@ant-design/icons'
import md5 from 'js-md5'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import { rootRouterConfig } from '@/router'

import { Form, Input, Button, message } from 'antd'
// scss
import styles from './css/index.module.scss'

const Login = () => {
  const [btnSize, setSize] = useState<SizeType>('large')
  const [loading, setLoading] = useState<boolean>(false)



  return (
    <div className='loginWarpper'>
      登陆
    </div>
  )
}

export default Login
