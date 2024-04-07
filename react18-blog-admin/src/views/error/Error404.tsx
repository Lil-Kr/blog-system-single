import React from 'react'
import useLoginAdminStore from '@/store/login'
import { Button, Result } from 'antd'
import { useNavigate } from 'oh-router-react'

const Error404 = () => {
  const { removeToken } = useLoginAdminStore()
  const navigateTo = useNavigate()

  const backLoginPage = () => {
    removeToken()
    navigateTo('/login')
  }

  return (
    <Result
      status='404'
      title='404'
      subTitle='访问无效, 似乎出了点问题'
      extra={
        <Button type='primary' onClick={backLoginPage}>
          回到登录页
        </Button>
      }
    />
  )
}

export default Error404
