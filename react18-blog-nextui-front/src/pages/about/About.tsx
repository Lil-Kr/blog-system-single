import React from 'react'
import { useSystemConfigStore } from '@/store/system/systemStore'
import ChineseVersion from './ChineseVersion'
import EnVersion from './EnVersion'

const About = () => {
  const { language } = useSystemConfigStore()
  return (
    <>
      <div className='col-span-2'></div>
      <div className='col-span-8'>{language === 'zh' ? <ChineseVersion /> : <EnVersion />}</div>
    </>
  )
}

export default About
