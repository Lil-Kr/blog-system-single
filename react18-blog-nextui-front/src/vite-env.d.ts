/// <reference types="vite/client" />
interface ImportMetaEnv {
  // 自定义内容...
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string

  // 自定义内容...
  readonly VITE_BACKEND_BASE_API: string
  readonly APP_PROXY_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
