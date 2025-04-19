import { Dropdown, MenuProps } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import { useSystemStore } from '@/store/global'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd/lib'

const LanguageChange = () => {
  const { language, setLanguage } = useSystemStore()
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    lang = lang !== '' ? lang : 'zh'
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: <span>{t('language.zh_CN')}</span>,
      icon: <div>{'CN'}</div>,
      onClick: () => changeLanguage('zh')
    },
    {
      key: 'en',
      label: <span>{t('language.en_US')}</span>,
      icon: <div>{'EN'}</div>,
      onClick: () => changeLanguage('en')
    }
  ]

  const menuProps: MenuProps = {
    items,
    selectable: true
  }
  return (
    <Dropdown menu={menuProps} placement='bottom' trigger={['hover']} arrow={{ pointAtCenter: true }}>
      <Button color='default' variant='text' icon={<TranslationOutlined style={{ fontSize: '1.3rem' }} />}></Button>
    </Dropdown>
  )
}

export default LanguageChange
