import { Form, Input, Button, Typography, Flex } from 'antd/lib'
const { Title, Link } = Typography
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import md5 from 'js-md5'
import loginApi from '@/apis/sys/loginApi'
import { useTokenStore } from '@/store/login'
import { resetPermissionRouters } from '@/router/dynamicRoutes'
import { LoginTpye } from '@/types/apis/sys/user/userType'
import { useMessage } from '@/components/message/MessageProvider'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { useTranslation } from 'react-i18next'
import './scss/loginForm.scss'

const LoginForm = () => {
  const messageApi = useMessage()
  const [form] = Form.useForm()
  const { setToken } = useTokenStore()
  const { btnSize, loginFormSize } = useGlobalStyleStore()
  const { t } = useTranslation()

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

  return (
    <Flex justify='center' align='center' className='login-container'>
      <Flex vertical className='login-form'>
        <Title level={2} className='login-title'>
          {t('login.title')}
        </Title>
        <Form form={form} name='login' onFinish={onFinish} autoComplete='off' layout='vertical' size={loginFormSize}>
          <Form.Item
            name='account'
            rules={[
              {
                required: true,
                message: <>{t('login.username_message')}</>
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t('login.username_placeholder')} autoComplete='account' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: <>{t('login.password_message')}</>
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('login.password_placeholder')}
              autoComplete='current-password'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('login.btn')}
            </Button>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Flex justify='space-between' align='center'>
              <Button type='link' size={btnSize}>
                {t('login.registe_account')}
              </Button>
              <Button type='link' size={btnSize}>
                {t('login.forget_pwd')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}

export default LoginForm
