import React from 'react'
import useLoginAdminStore from '@/store/login'
import { Button, Result } from 'antd'
import { useNavigate } from 'oh-router-react'

const Error403 = () => {
  const { removeToken } = useLoginAdminStore()
  const navigateTo = useNavigate()
  const backHomePage = () => {
    removeToken()
    navigateTo('/main/home')
  }
  return (
    <Result
      status='403'
      title='403'
      subTitle='对不起, 似乎出了点问题....'
      extra={
        <Button type='primary' onClick={backHomePage}>
          返回首页
        </Button>
      }
    />
  )
}

export default Error403
