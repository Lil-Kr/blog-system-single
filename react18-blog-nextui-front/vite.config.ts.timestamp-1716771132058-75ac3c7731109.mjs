// vite.config.ts
import { defineConfig } from "file:///D:/project/mine/java-project/blog-system-single/react18-blog-nextui-front/node_modules/vite/dist/node/index.js";
import react from "file:///D:/project/mine/java-project/blog-system-single/react18-blog-nextui-front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import checker from "file:///D:/project/mine/java-project/blog-system-single/react18-blog-nextui-front/node_modules/vite-plugin-checker/dist/esm/main.js";
import { createSvgIconsPlugin } from "file:///D:/project/mine/java-project/blog-system-single/react18-blog-nextui-front/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\project\\mine\\java-project\\blog-system-single\\react18-blog-nextui-front";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
    // svgr({ include: ['src/**/*.svg'] }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
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
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:8089",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      "~": path.resolve(__vite_injected_original_dirname, "./"),
      // root path
      "@": path.resolve(__vite_injected_original_dirname, "./src")
      // src path
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXG1pbmVcXFxcamF2YS1wcm9qZWN0XFxcXGJsb2ctc3lzdGVtLXNpbmdsZVxcXFxyZWFjdDE4LWJsb2ctbmV4dHVpLWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXG1pbmVcXFxcamF2YS1wcm9qZWN0XFxcXGJsb2ctc3lzdGVtLXNpbmdsZVxcXFxyZWFjdDE4LWJsb2ctbmV4dHVpLWZyb250XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L21pbmUvamF2YS1wcm9qZWN0L2Jsb2ctc3lzdGVtLXNpbmdsZS9yZWFjdDE4LWJsb2ctbmV4dHVpLWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY2hlY2tlcih7IHR5cGVzY3JpcHQ6IHRydWUgfSksXG4gICAgLy8gc3Zncih7IGluY2x1ZGU6IFsnc3JjLyoqLyouc3ZnJ10gfSksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmcnKV0sXG4gICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXSdcbiAgICB9KVxuICBdLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBsZXNzOiB7XG4gICAgICAgIGNoYXJzZXQ6IGZhbHNlLFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZVxuICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTonJ1xuICAgICAgICAvLyBtb2RpZnlWYXJzOiB7XG4gICAgICAgIC8vICAgJ0BwcmltYXJ5LWNvbG9yJzogJyM0Mzc3RkUnLC8vXHU4QkJFXHU3RjZFYW50ZFx1NEUzQlx1OTg5OFx1ODI3MlxuICAgICAgICAvLyB9LFxuICAgICAgfSxcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgY2hhcnNldDogZmFsc2UsXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXG4gICAgICAgIC8vIFx1NkI2NFx1NTkwNFx1NEZFRVx1NjUzOVx1NEUzQVx1ODk4MVx1ODhBQlx1OTg4NFx1NTkwNFx1NzQwNlx1NzY4NHNjc3NcdTY1ODdcdTRFRjZcdTU3MzBcdTU3NDBcbiAgICAgICAgLy8gYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zcmMvYXNzZXRzL3N0eWxlcy9nbG9iYWwuc2Nzc1wiYFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogODAyMCxcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODknLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJyksIC8vIHJvb3QgcGF0aFxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSAvLyBzcmMgcGF0aFxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVosU0FBUyxvQkFBb0I7QUFDdGIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUNwQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUSxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUE7QUFBQSxJQUU1QixxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7QUFBQTtBQUFBLE1BRXhELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsUUFDVCxtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS3JCO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsUUFDVCxtQkFBbUI7QUFBQTtBQUFBO0FBQUEsTUFHckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFBQSxVQUFRQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsSUFBSTtBQUFBO0FBQUEsTUFDakMsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
