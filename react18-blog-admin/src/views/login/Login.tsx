import { LockOutlined, UserOutlined } from '@ant-design/icons'
import md5 from 'js-md5'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import useLoginAdminStore from '@/store/login'
import { LoginTpye } from '@/types/user'
import userApi from '@/apis/user'
import { rootRouterConfig } from '@/router'

import { Form, Input, Button, message } from 'antd'
// scss
import styles from './css/index.module.scss'

const Login = () => {
  const [btnSize, setSize] = useState<SizeType>('large')
  const [loading, setLoading] = useState<boolean>(false)
  const { setToken } = useLoginAdminStore()

  const onFinish = async (loginInfo: LoginTpye.LoginFormType) => {
    let { password } = loginInfo
    loginInfo.password = md5.md5(password)
    const loginRes = await userApi.login(loginInfo)
    const { code, data: token, msg } = loginRes
    if (code === 200) {
      setToken(token)
      // 跳转
      rootRouterConfig.navigate('/main/home')
    } else {
      message.error('登陆失败')
      rootRouterConfig.navigate('/login')
    }
  }

  const onFinishFailed = () => {}

  const handle = () => {
    let token = { token: '卧槽, 还能这么用' }
    setToken('卧槽, 还能这么用')
  }

  return (
    <div className='loginWarpper'>
      {/* <p>token: {token}</p>
      <Button onClick={handle}>zustand</Button> */}
      <Form
        className='loginForm'
        name='basic'
        layout='horizontal'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item name={'account'} rules={[{ required: true, message: '不能为空' }]}>
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder={'用户名'} />
        </Form.Item>

        <Form.Item name={'password'} rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder={'密码'}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' loading={loading} htmlType='submit' className='login-form-button'>
            登陆
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type='link' size={btnSize}>
            注册
          </Button>
          <Button type='link' size={btnSize}>
            忘记密码?
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
