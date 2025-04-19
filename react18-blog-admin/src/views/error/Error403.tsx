import { Button, Result } from 'antd/lib'
import { useNavigate } from 'oh-router-react'
import { resetPermissionRouters } from '@/router/dynamicRoutes'

const Error403 = () => {
  const navigateTo = useNavigate()

  const backHomePage = () => {
    resetPermissionRouters()
    navigateTo('/login')
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
