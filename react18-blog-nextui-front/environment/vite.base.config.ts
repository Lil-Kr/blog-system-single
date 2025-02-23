import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/', // url: https://example.com/blog/
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../'), // root path
      '@': path.resolve(__dirname, '../src') // src path
    }
  }
})
