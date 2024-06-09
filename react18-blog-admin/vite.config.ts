import { defineConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'


// 引入三个环境配置文件
import ViteBaseConfig from './environment/vite.base.config'
import ViteDevConfig from './environment/vite.dev.config'
import ViteProdConfig from './environment/vite.prod.config'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     vitePluginImp({
//       optimize: true,
//       libList: [
//         {
//           libName: 'antd',
//           libDirectory: 'es',
//           style: name => `antd/es/${name}/style`
//         },
//         {
//           libName: 'antd',
//           libDirectory: 'lib',
//           style: name => `antd/lib/${name}/style`
//         }
//       ]
//     }),
//     checker({ typescript: true })
//   ],
//   css: {
//     preprocessorOptions: {
//       less: {
//         charset: false,
//         javascriptEnabled: true
//         // additionalData:''
//         // modifyVars: {
//         //   '@primary-color': '#4377FE',// 设置antd主题色
//         // },
//       },
//       scss: {
//         charset: false,
//         javascriptEnabled: true
//         // 此处修改为要被预处理的scss文件地址
//         // additionalData: `@import "@/src/assets/styles/global.scss"`
//       }
//     }
//   },
//   server: {
//     port: 7010,
//     host: '0.0.0.0',
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8089',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   resolve: {
//     alias: {
//       '~': path.resolve(__dirname, './'), // root path
//       '@': path.resolve(__dirname, './src') // src path
//     }
//   }
// })

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
