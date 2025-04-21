export const addCopyButtons = () => {
  const pres = document.querySelectorAll('pre[class^="language-"]')

  pres.forEach(pre => {
    // 如果已处理，跳过
    if (pre.parentElement?.classList.contains('code-block-wrapper')) return

    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'
    wrapper.style.position = 'relative'
    wrapper.style.marginBottom = '1em'

    // 插入 wrapper 并把 pre 移进去
    pre.parentElement?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    // 创建按钮
    const button = document.createElement('button')
    button.className = 'copy-btn'
    button.setAttribute('aria-label', 'Copy code')
    button.innerHTML = `
      <svg fill="none"
        viewBox="0 0 24 24" stroke-width="1.5"
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
    // 按钮功能
    button.addEventListener('click', () => {
      const code = pre.querySelector('code')?.textContent || ''
      navigator.clipboard.writeText(code).then(() => {
        const original = button.innerHTML
        button.innerHTML = `
          <svg fill="none"
            viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        `
        setTimeout(() => {
          button.innerHTML = original
        }, 1500)
      })
    })

    // 添加按钮到 wrapper 顶部
    wrapper.appendChild(button)
  })
}
