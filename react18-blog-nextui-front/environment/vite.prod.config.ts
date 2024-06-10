import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

console.log('load prod-config...')
export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
    // svgr({ include: ['src/**/*.svg'] }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true
        // additionalData:''
        // modifyVars: {
        //   '@primary-color': '#4377FE',//设置antd主题色
        // },
      },
      scss: {
        charset: false,
        javascriptEnabled: true
        // 此处修改为要被预处理的scss文件地址
        // additionalData: `@import "@/src/assets/styles/global.scss"`
      }
    }
  },
  server: {
    port: 8020,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://backend:8089',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
