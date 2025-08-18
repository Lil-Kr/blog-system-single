import React from 'react'
import { useSystemConfigStore } from '@/store/system/systemStore'
import ChineseVersion from './ChineseVersion'
import EnVersion from './EnVersion'

const About = () => {
  const { language } = useSystemConfigStore()
  return (
    <>
      {/* 右侧主体内容 响应式布局配合上面的样式 */}
      <div className='col-span-12 bg-background 2xl:col-span-8'>
        {language === 'zh' ? <ChineseVersion /> : <EnVersion />}
      </div>
    </>
  )
}

export default About
