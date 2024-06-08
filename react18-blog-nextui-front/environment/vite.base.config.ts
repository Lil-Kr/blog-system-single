import { defineConfig } from 'vite'
import path from 'path'

console.log('load base-config...')
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../'), // root path
      '@': path.resolve(__dirname, '../src') // src path
    }
  }
})
