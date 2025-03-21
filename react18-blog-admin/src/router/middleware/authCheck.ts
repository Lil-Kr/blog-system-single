import { Middleware, MiddlewareContext } from 'oh-router'
import { useRouterStore } from '@/store/router/routerStore'
import { useTokenStore } from '@/store/login'

/**
 * 使用全局状态管理
 * @returns
 */
const getAuthData = () => {
  return {
    rootRouterConfig: useRouterStore.getState().rootRouterConfig,
    token: useTokenStore.getState().token
  }
}

/**
 * 登录校验
 */
class LoginCheckMiddleware extends Middleware {
  /**
   * 判断是否登录, 如果没有登录需要带到登录页
   * 在进入登录页时, 这段逻辑是不需要执行的
   * @param ctx
   * @param next
   */
  async handler(ctx: MiddlewareContext<{}>, next: () => Promise<any>): Promise<void> {
    const { token, rootRouterConfig } = getAuthData()
    /**
     * 对未登录时, 访问登录页做处理
     * 如果访问的是登录页, 在token有效时
     */
    if (ctx.to.pathname === '/login') {
      if (token && token !== '') {
        rootRouterConfig.navigate('/')
      } else {
        next()
      }
    }

    /**
     * 如果用户访问的不是登录页
     */
    if (token && token !== '') {
      next()
    } else {
      rootRouterConfig.navigate('/login')
    }
  }

  // /**
  //  * login page no need token 与 上面 handler的配置冲突(一致)
  //  * @param param
  //  * @returns
  //  */
  // register = ({ to }: MiddlewareContext<{}>) => {
  //   // 如果 前往的页面不是 '/login' 则为当前路由注册该中间件
  //   console.log('--> register:', to.pathname)
  //   return to.pathname !== '/login'
  // }
}

const loginCheckMiddleware = new LoginCheckMiddleware()
export { loginCheckMiddleware }
