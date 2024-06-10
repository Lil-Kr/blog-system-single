import { defineConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'

// 引入三个环境配置文件
import ViteBaseConfig from './environment/vite.base.config'
import ViteDevConfig from './environment/vite.dev.config'
import ViteProdConfig from './environment/vite.prod.config'

const envResolver = {
  serve: () => {
    return { ...ViteBaseConfig, ...ViteDevConfig }
  },
  build: () => {
    return { ...ViteBaseConfig, ...ViteProdConfig }
  }
}

export default defineConfig(({ command }: ConfigEnv) => {
  console.log('command : ', command)
  return envResolver[command]()
})
