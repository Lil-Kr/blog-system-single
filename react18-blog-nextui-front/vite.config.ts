import { ConfigEnv, defineConfig } from 'vite'

// 引入三个环境配置文件
import ViteBaseConfig from './environment/vite.base.config'
import ViteDevConfig from './environment/vite.dev.config'
import ViteProdConfig from './environment/vite.prod.config'

// export default defineConfig({
//   plugins: [
//     react(),
//     checker({ typescript: true }),
//     // svgr({ include: ['src/**/*.svg'] }),
//     createSvgIconsPlugin({
//       // 指定需要缓存的图标文件夹
//       iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
//       // 指定symbolId格式
//       symbolId: 'icon-[dir]-[name]'
//     })
//   ],
//   css: {
//     preprocessorOptions: {
//       less: {
//         charset: false,
//         javascriptEnabled: true
//         // additionalData:''
//         // modifyVars: {
//         //   '@primary-color': '#4377FE',//设置antd主题色
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
//     port: 8020,
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
// console.log('--> a', {...a})
// export default a

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
