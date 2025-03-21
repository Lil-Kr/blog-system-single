import { useTokenStore } from '@/store/login'
import React, { useEffect } from 'react'
import { useNavigate } from 'oh-router-react'
import { useMenuStore, useTabsStore } from '@/store/global'

/**
 * 全局管理退出登录逻辑, 当间隔指定时间内未触发后端请求时, token自动失效
 * @returns
 */
const LogoutAndRedirect = () => {
  const { clearToken, token } = useTokenStore()
  const { resetTabs } = useTabsStore()
  const { restMenuState } = useMenuStore()
  // useEffect(() => {
  //   console.log('--> 退出执行的是这里:', token)
  //   const handleLogout = () => {
  //     // 移除token
  //     clearToken()
  //     // 移除所有样式
  //     resetTabs()
  //     restMenuState()
  //     // 执行跳转逻辑
  //     window.location.replace('/login')
  //     // navigate('/login')
  //   }
  //   if (token === '') {
  //     handleLogout()
  //   }
  // }, [token])

  return <></>
}

export { LogoutAndRedirect }
