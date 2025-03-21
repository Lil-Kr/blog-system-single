import { baseRouterConfig } from '@/router/baseRouterConfig'
import { RouterItemType } from '@/types/router/routeType'
import Router from 'oh-router'
import { create } from 'zustand'

type RouterAction = {
  setRootConfig: (rootConfig: RouterItemType[]) => void
  setRootRouterConfig: (rootRouterConfig: Router<{}>) => void
  clearRootRouterConfig: () => void
}

type RouterState = {
  rootConfig: RouterItemType[]
  rootRouterConfig: Router<{}>
}

const initRouterConfig = {
  rootConfig: baseRouterConfig,
  rootRouterConfig: new Router({ routes: baseRouterConfig })
}

const useRouterStore = create<RouterAction & RouterState>()(set => ({
  ...initRouterConfig,
  setRootConfig: (rootConfig: RouterItemType[]) =>
    set(state => ({
      ...state,
      rootConfig
    })),
  setRootRouterConfig: (rootRouterConfig: Router<{}>) =>
    set(state => {
      return {
        ...state,
        rootRouterConfig
      }
    }),
  clearRootRouterConfig: () =>
    set(state => {
      return {
        ...state,
        ...initRouterConfig
      }
    })
}))

export { useRouterStore }
