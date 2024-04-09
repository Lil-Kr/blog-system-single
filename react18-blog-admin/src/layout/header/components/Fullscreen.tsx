import React, { useState } from 'react'
import screenfull from 'screenfull'

import Screen from '@/assets/images/svg/fullscreen.svg'
import { message } from 'antd'

const Fullscreen = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏 ❌')
    screenfull.toggle()
  }
  return (
    <>
      <i
        className={['icon-style iconfont', fullScreen ? 'icon-suoxiao' : 'icon-fangda'].join(' ')}
        onClick={handleFullScreen}
      ></i>
    </>
  )
}

export default Fullscreen
