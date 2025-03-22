import React from 'react'
import { useTokenStore } from '@/store/login'
import { Button, Result } from 'antd'
import { useNavigate } from 'oh-router-react'
import { useMenuStore, useTabsStore } from '@/store/global'

const Error404 = () => {
  const { clearToken } = useTokenStore()
  const navigateTo = useNavigate()
  const { restMenuState } = useMenuStore()
  const { resetTabs } = useTabsStore()

  const backLoginPage = () => {
    clearToken()
    restMenuState()
    resetTabs()
    navigateTo('/login')
  }

  return (
    <Result
      status='404'
      title='404'
      subTitle='访问无效, 似乎出了点问题'
      extra={
        <Button type='primary' onClick={backLoginPage}>
          {'回到登录页'}
        </Button>
      }
    />
  )
}

export default Error404
