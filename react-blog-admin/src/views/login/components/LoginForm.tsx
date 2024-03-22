import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import md5 from 'js-md5'
import { Login } from '@/types/login'
import { Response } from '@/types/http/respType'
import type { SizeType } from 'antd/es/config-provider/SizeContext'
import { USER_TOKEN_KEY } from '@/utils/constant/constant'

// cookie
import cookie, { useCookies } from 'react-cookies'

// redux
import { useAppDispatch } from '@/redux'
import { useLoginMutation, useLogoutMutation } from '@/redux/apis/login/loginApi'
// stlyes
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
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
			// todo: 修改 local storge 为 home
      if (res.data.code == 200) {
        /**
         * set cookie value
         */
        cookie.save(USER_TOKEN_KEY, res.data.data)
        navigateTo('/main/home')
      } else {
        console.log('--> 用户名或密码错误')
      }
		})
	}

  /**
   * login fail
   * @param errorInfo 
   */
  const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
		// console.log('--> form:', form)
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
