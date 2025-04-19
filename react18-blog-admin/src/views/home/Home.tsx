import { useMessage } from '@/components/message/MessageProvider'
import { Flex, Switch } from 'antd/lib'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const messageApi = useMessage()
  const { t, i18n } = useTranslation()
  const [checkedState, setChecked] = useState<boolean>(true)

  const handleOnChange = (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    messageApi.success('切换语言成功')
    setChecked(checked)
  }

  return (
    <Flex className='home-warpper' vertical={false} gap={16} justify={'flex-start'}>
      <div></div>
    </Flex>
  )
}

export default Home
