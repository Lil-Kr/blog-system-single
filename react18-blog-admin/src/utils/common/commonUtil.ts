/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
  // let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  let browserLang = ''
  let defaultBrowserLang = ''
  if (
    browserLang.toLowerCase() === 'cn' ||
    browserLang.toLowerCase() === 'zh' ||
    browserLang.toLowerCase() === 'zh-cn'
  ) {
    defaultBrowserLang = 'zh'
  } else {
    defaultBrowserLang = 'en'
  }
  return defaultBrowserLang
}
