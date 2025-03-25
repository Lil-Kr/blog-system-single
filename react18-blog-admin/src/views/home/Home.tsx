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
    <div className='home-warpper'>
      <Flex vertical={false} gap={16} justify={'flex-start'}>
        <Switch
          checkedChildren='中文'
          unCheckedChildren='英文'
          disabled={false}
          checked={checkedState}
          onChange={handleOnChange}
          onClick={() => {
            i18n.changeLanguage(checkedState ? 'en' : 'zh')
          }}
        />
        <span>{t('home.welcome')}</span>
      </Flex>
    </div>
  )
}

export default Home
