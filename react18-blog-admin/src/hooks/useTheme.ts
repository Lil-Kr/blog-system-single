import { useSystemStore } from '@/store/global'

/**
 * @description 全局主题设置
 * */
const useTheme = () => {
  const { themeConfig } = useSystemStore()
  const weakOrGray = themeConfig?.weakOrGray

  const initTheme = () => {
    const body = document.documentElement as HTMLElement
    if (!weakOrGray) body.setAttribute('style', '')
    if (weakOrGray === 'weak') body.setAttribute('style', 'filter: invert(80%)')
    if (weakOrGray === 'gray') body.setAttribute('style', 'filter: grayscale(1)')
  }
  initTheme()

  return {
    initTheme
  }
}

export default useTheme
