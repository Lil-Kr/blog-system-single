import { defineConfig, loadEnv } from 'vite'
import vitePluginImp from 'vite-plugin-imp'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
import path from 'path'
import svgr from 'vite-plugin-svgr'

const isDev = process.env.NODE_ENV === 'development'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // import antd UI
    styleImport({
      resolves: [
        AntdResolve()
      ]
    }),
    // config mock
    viteMockServe({
      mockPath: './public/mock/modules',
      localEnabled: isDev,
      prodEnabled: !isDev,
      supportTs: true,
      watchFiles: true,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      injectFile: path.resolve(process.cwd(), 'src/main.jsx')
    }),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: 'es',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    svgr({
      exportAsDefault: true,
      include: 'src/assets/images/svg/*.svg'
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
        // additionalData:''
        // modifyVars: {
        //   '@primary-color': '#4377FE',//设置antd主题色
        // },
      },
      scss: {
        charset: false,
        javascriptEnabled: true,
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
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // root path
      '@': path.resolve(__dirname, './src'), // src path
    }
  }
})
