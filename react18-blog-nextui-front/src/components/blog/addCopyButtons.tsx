export const addCopyButtons = () => {
  const pres = document.querySelectorAll('pre[class^="language-"]')

  pres.forEach(pre => {
    if (pre.parentElement?.classList.contains('code-block-wrapper')) return

    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'
    wrapper.style.position = 'relative'
    wrapper.style.marginBottom = '1em'

    pre.parentElement?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const button = document.createElement('button')
    button.className = 'copy-btn'
    button.setAttribute('aria-label', 'Copy code')

    const duplicateIcon = `
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125
          1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125
          1.125-1.125H6.75a9.06 9.06 0 0 1
          1.5.124m7.5 10.376h3.375c.621 0
          1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06
          9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125
          1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12
          6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125
          1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0
          0-3.375-3.375H9.75" />
      </svg>
    `
    const checkIcon = `
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    `

    button.innerHTML = duplicateIcon

    // 独立状态控制
    let restoreTimer: number | null = null
    let isCopied = false

    button.addEventListener('click', async () => {
      if (isCopied) return

      const code = pre.querySelector('code')?.textContent || ''
      /**
       * 复制按钮在 HTTP/HTTPS 下的兼容性问题
       * navigator.clipboard.writeText() 是 现代浏览器提供的剪贴板 API
       * 但浏览器要求:
          必须在 用户触发的事件内（如 click）
          且在受信任环境下，通常是 HTTPS 页面。
          如果是 HTTP 页面（比如你服务器上用 nginx 简单部署的 IP 访问），浏览器可能会禁止直接访问剪贴板，导致复制按钮失效。

          总结: 先用新API，失败时用老办法兜底，保证复制功能在所有环境下正常运行
       * @param text
       */
      const copyText = async (text: string) => {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            throw new Error('Clipboard API not supported')
          }
        } catch (err) {
          // fallback 方式
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.top = '-9999px'
          textarea.style.left = '-9999px'
          document.body.appendChild(textarea)
          textarea.focus()
          textarea.select()
          try {
            // 这里使用 document.execCommand('copy') 来实现复制, 旧的API
            document.execCommand('copy')
          } catch (err) {
            console.error('Fallback: Copy failed', err)
          }
          document.body.removeChild(textarea)
        }
      }

      await copyText(code)

      isCopied = true
      button.innerHTML = checkIcon

      if (restoreTimer) {
        clearTimeout(restoreTimer)
      }
      restoreTimer = window.setTimeout(() => {
        button.innerHTML = duplicateIcon
        isCopied = false
      }, 1500)
      // navigator.clipboard.writeText(code).then(() => {
      //   isCopied = true
      //   button.innerHTML = checkIcon

      //   if (restoreTimer) {
      //     clearTimeout(restoreTimer)
      //   }
      //   restoreTimer = window.setTimeout(() => {
      //     button.innerHTML = duplicateIcon
      //     isCopied = false
      //   }, 1500)
      // })
    })

    wrapper.appendChild(button)
  })
}
