import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd'
import md5 from 'js-md5'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import { baseAxiosRequest } from '@/utils/http/request'
import useLoginAdminStore from '@/store/login'
import { LoginTpye } from '@/types/user'
import userApi from '@/apis/user'
import { Result } from '@/types/base/response'
// cookie
import cookie from 'react-cookies'
import { CLT } from '@/constant'
import { rootRouterConfig } from '@/router'

const Login = () => {
  const [btnSize, setSize] = useState<SizeType>('large')
  const [loading, setLoading] = useState<boolean>(false)
  const { loginData, setToken } = useLoginAdminStore()
  const token = useLoginAdminStore(state => state.loginData.token)

  const onFinish = async (loginInfo: LoginTpye.LoginFormType) => {
    let { account, password } = loginInfo
    loginInfo.password = md5.md5(password)
    const loginRes = await userApi.login(loginInfo)
    const expirationDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    cookie.save(CLT, loginRes.data, { path: '/', expires: expirationDate })

    // 跳转
    rootRouterConfig.navigate('/main/blog/label')
  }

  const onFinishFailed = () => {}

  const handle = () => {
    console.log('--> zustand')
    let abc = { token: '卧槽, 还能这么用' }
    setToken(abc)
  }

  return (
    <div className='login-warpper'>
      {/* <p>token: {token}</p>
      <Button onClick={handle}>zustand</Button> */}
      <Form
        className='login-warpper-form'
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
