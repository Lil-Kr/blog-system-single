import { Middleware, MiddlewareContext } from 'oh-router'
import { rootRouterConfig } from '@/router'
import cookie from 'react-cookies'
import { CLT } from '@/config'

class LoginCheckMiddleware extends Middleware {
  async handler(ctx: MiddlewareContext<{}>, next: () => Promise<any>): Promise<void> {
    // const isLogin = store.getState().auth.isLogin
    const token = cookie.load(CLT)
    if (!token || token == '') {
      rootRouterConfig.navigate('/login')
    } else {
      await next()
    }
  }

  /**
   * login page no need token
   * @param param
   * @returns
   */
  register = ({ to }: MiddlewareContext<{}>) => {
    // 如果 path 不是 '/login' 则为当前路由注册该中间件
    return to.pathname !== '/login'
  }
}

export { LoginCheckMiddleware }
