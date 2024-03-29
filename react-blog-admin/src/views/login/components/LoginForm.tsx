import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'oh-router-react'
import { useTranslation } from 'react-i18next'
import md5 from 'js-md5'
import { Login } from '@/types/sys'
import { Response } from '@/types/http/respType'
import type { SizeType } from 'antd/es/config-provider/SizeContext'

// redux
import { useAppDispatch } from '@/redux'
import { useLoginMutation } from '@/redux/apis/login/loginApi'
import { setAccessToken, setLoginStatue } from '@/redux/slice'

// stlyes
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import styles from '../index.module.scss'


const LoginForm = () => {
  const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const navigateTo = useNavigate()
  
	const [form] = Form.useForm()
	const [loading, setLoading] = useState<boolean>(false)
  const [btnSize, setSize] = useState<SizeType>('large')

	const [
		loginFn,
		{
			data: loginResp,
			isSuccess: isLoginSuccess,
			isError: isLoginError,
			isUninitialized: isloginUninitialized
		}
	] = useLoginMutation()

	/**
	 * login
	 * @param values
	 */
	const onFinish = (loginInfo: Login.AdminLoginFormType) => {
		let { account, password } = loginInfo
		loginInfo.password = md5(password)
		loginFn(loginInfo).then((res: Response) => {
			console.log('--> 登陆成功返回的参数 res: ', res)
			console.log('--> 登陆成功返回的参数 code: ', res.data.code)
			console.log('--> 登陆成功返回的参数 token: ', res.data.data)
      const {msg, code, data:token} = res.data
      console.log('--> 退出: ', token)
			// todo: 修改 local storge 为 home
      if (code == 200 && token) {
        /**
         * set cookie value
         */
        dispatch(setAccessToken({token}))
        dispatch(setLoginStatue({statue: true}))
        navigateTo('/main/home')
      } else {
        onFinishFailed({})
      }
		})
	}

  /**
   * login fail
   * @param errorInfo 
   */
  const onFinishFailed = (errorInfo: any) => {
		// console.log('login failed:', errorInfo)
    message.error(t('login.login_failed'))
	}

	return (
		<div className={styles.lContainer}>
			<div className={styles.lItem}>
				<div className={styles.loginForm}>
					<div className="login-form-title">{t('login.title')}</div>
					<Form
						className="login-form"
						name="basic"
						layout="horizontal"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							name="account"
							rules={[{ required: true, message: t('login.username_message') }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder={t('login.username_placeholder')}
							/>
						</Form.Item>

						<Form.Item
							name={'password'}
							rules={[{ required: true, message: t('login.password_message') }]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder={t('login.password_placeholder')}
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								loading={loading}
								htmlType="submit"
								className="login-form-button"
							>
								{t('login.btn')}
							</Button>
						</Form.Item>
            
						<Form.Item>
              <Button type="link" size={btnSize}>注册</Button>
              <Button type="link" size={btnSize}>忘记密码?</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
