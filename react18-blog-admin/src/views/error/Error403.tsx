import React from 'react'
import useLoginAdminStore from '@/store/login'
import { Button, Result } from 'antd'
import { useNavigate } from 'oh-router-react'
import { HOME_ROUTER_URL } from '@/config'

const Error403 = () => {
  const { removeToken } = useLoginAdminStore()
  const navigateTo = useNavigate()
  const backHomePage = () => {
    removeToken()
    navigateTo(HOME_ROUTER_URL)
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
