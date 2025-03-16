import { useState } from 'react'
import screenfull from 'screenfull'
import { useMessage } from '@/components/message/MessageProvider'

const Fullscreen = () => {
  const messageApi = useMessage()
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) messageApi?.warning('当前您的浏览器不支持全屏 ❌')
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
