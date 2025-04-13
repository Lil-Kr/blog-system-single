import { UserOutlined } from '@ant-design/icons'
import md5 from 'js-md5'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { useState } from 'react'
import { useTokenStore } from '@/store/login'
import loginApi from '@/apis/sys/loginApi'
import { Form, Input, Button, Flex } from 'antd'
import { useNavigate } from 'oh-router-react'
import { LoginTpye } from '@/types/apis/sys/user/userType'
import { useMessage } from '@/components/message/MessageProvider'
import { resetPermissionRouters } from '@/router/dynamicRoutes'

import './css/login.css'

const Login = () => {
  const messageApi = useMessage()
  const [btnSize] = useState<SizeType>('large')
  const [loading] = useState<boolean>(false)
  const { setToken } = useTokenStore()

  const onFinish = async (loginInfo: LoginTpye.LoginFormType) => {
    let { password } = loginInfo
    loginInfo.password = md5.md5(password)
    const res = await loginApi.login({ ...loginInfo })
    const { code, data, msg } = res
    if (code === 200) {
      const { token } = data
      setToken(token, true)
      messageApi?.success(msg)
    } else {
      resetPermissionRouters('')
    }
  }

  const onFinishFailed = () => {}

  return (
    <Flex
      className='login-warrper'
      vertical={true}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
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
          <div className='login-title'>{'博客后台管理系统'}</div>
          <Form.Item name={'account'} rules={[{ required: true, message: '不能为空' }]}>
            <Input
              autoComplete='username'
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder={'用户名'}
            />
          </Form.Item>

          <Form.Item name={'password'} rules={[{ required: true, message: '密码不能为空' }]}>
            <Input.Password autoComplete='current-password' type='password' placeholder={'密码'} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' loading={loading} htmlType='submit' className='login-form-button'>
              {'登陆'}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type='link' size={btnSize}>
              {'注册'}
            </Button>
            <Button type='link' size={btnSize}>
              {'忘记密码?'}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  )
}

export default Login
