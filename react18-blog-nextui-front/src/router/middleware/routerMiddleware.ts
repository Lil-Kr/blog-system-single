import { Middleware, MiddlewareContext } from 'oh-router'

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
    /**
     */
    if (ctx.to.pathname === '/') {
      next()
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

export { LoginCheckMiddleware }
