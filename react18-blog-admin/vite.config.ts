import { defineConfig, ConfigEnv, loadEnv } from 'vite'

// 引入三个环境配置文件
import ViteBaseConfig from './environment/vite.base.config'
import ViteDevConfig from './environment/vite.dev.config'
import ViteTestConfig from './environment/vite.test.config'
import ViteProdConfig from './environment/vite.prod.config'

const envResolver = {
  serve: (env: Record<string, string>) => {
    return { ...ViteBaseConfig, ...ViteDevConfig, base: env.VITE_BASE_URL }
  },
  test: (env: Record<string, string>) => {
    return { ...ViteBaseConfig, ...ViteTestConfig, base: env.VITE_BASE_URL }
  },
  build: (env: Record<string, string>) => {
    return { ...ViteBaseConfig, ...ViteProdConfig, base: env.VITE_BASE_URL }
  }
}

export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return envResolver[command](env)
})
