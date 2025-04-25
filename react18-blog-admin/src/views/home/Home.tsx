import { useMessage } from '@/components/message/MessageProvider'
import { Flex } from 'antd/lib'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const messageApi = useMessage()
  const { t, i18n } = useTranslation()

  return (
    <Flex className='home-warpper' vertical={false} gap={16} justify={'flex-start'}>
      <div></div>
    </Flex>
  )
}

export default Home
