import { LockOutlined, UserOutlined } from '@ant-design/icons'
import md5 from 'js-md5'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { useState } from 'react'
import useLoginAdminStore from '@/store/login'
import { LoginTpye } from '@/types/user'
import userApi from '@/apis/user'
import { Form, Input, Button, message, Flex } from 'antd'
import { useNavigate } from 'oh-router-react'
import { useTabsStore } from '@/store/global'

import './css/login.css'

const Login = () => {
  const [btnSize, setSize] = useState<SizeType>('large')
  const [loading, setLoading] = useState<boolean>(false)
  const { resetTabs } = useTabsStore()
  // const { setSelectedKeys } = useMenuStore()
  const { setToken } = useLoginAdminStore()
  const navigateTo = useNavigate()

  const onFinish = async (loginInfo: LoginTpye.LoginFormType) => {
    let { password } = loginInfo
    loginInfo.password = md5.md5(password)
    const loginRes = await userApi.login(loginInfo)
    const { code, data: token, msg } = loginRes
    if (code === 200) {
      setToken(token)
      const path = '/admin/home'
      // 跳转
      navigateTo(path)
    } else {
      message.error('登陆失败')
      navigateTo('/admin/login')
      resetTabs()
    }
  }

  const onFinishFailed = () => {}

  return (
    <Flex
      className='login-warrper'
      vertical={true}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      {/*
        <p>token: {token}</p>
        <Button onClick={handle}>zustand</Button>
      */}
      <Form
        className='login-form'
        name='basic'
        layout='horizontal'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Flex vertical={true} gap={4}>
          <div className='login-title'>博客后台管理系统</div>
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
        </Flex>
      </Form>
    </Flex>

    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //   <Form name='login' onFinish={onFinish} onFinishFailed={onFinishFailed}>
    //     <Form.Item name='username' rules={[{ required: true, message: '请输入账号!' }]}>
    //       <Input placeholder='账号' />
    //     </Form.Item>
    //     <Form.Item name='password' rules={[{ required: true, message: '请输入密码!' }]}>
    //       <Input.Password placeholder='密码' />
    //     </Form.Item>
    //     <Form.Item>
    //       <Button type='primary' htmlType='submit'>
    //         登录
    //       </Button>
    //     </Form.Item>
    //     <Form.Item>
    //       <Button type='link' size={btnSize}>
    //         {'注册'}
    //       </Button>
    //       <Button type='link' size={btnSize}>
    //         {'忘记密码'}
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </div>
  )
}

export default Login
