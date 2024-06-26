import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import vitePluginImp from 'vite-plugin-imp'

console.log('load dev-config...')
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: (name: string) => `antd/es/${name}/index`
        },
        {
          libName: 'antd',
          libDirectory: 'lib',
          style: (name: string) => `antd/lib/${name}/index`
        }
      ]
    }),
    checker({ typescript: true })
  ],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true
        // additionalData:''
        // modifyVars: {
        //   '@primary-color': '#4377FE', // 设置antd主题色
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
    port: 7010,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
