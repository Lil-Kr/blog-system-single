import React from 'react'
import { useSystemConfigStore } from '@/store/system/systemStore'
import ChineseVersion from './ChineseVersion'
import EnVersion from './EnVersion'

const About = () => {
  const { language } = useSystemConfigStore()
  return (
    <>
      {/* 占位 */}
      <div className='hidden col-span-2 2xl:flex 2xl:flex-col'></div>
      {/* 右侧主体内容 响应式布局配合上面的样式 */}
      <div className='col-span-12 bg-background 2xl:col-span-8'>
        {language === 'zh' ? <ChineseVersion /> : <EnVersion />}
      </div>
    </>
  )
}

export default About
