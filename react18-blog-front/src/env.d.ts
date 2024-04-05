interface ImportMetaEnv {
  // 自定义内容...
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_HAHA: string
  readonly VITE_APP_WOCAO: string
  // 自定义内容...

  readonly VITE_NAME: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_PROXY_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
