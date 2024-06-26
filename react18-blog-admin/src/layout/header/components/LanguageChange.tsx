import { Dropdown, MenuProps } from 'antd'
import { useSystemStore } from '@/store/global'

const LanguageChange = () => {
  const { language, setLanguage } = useSystemStore()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>简体中文</span>,
      onClick: () => setLanguage('zh'),
      disabled: language === 'zh'
    },
    {
      key: '2',
      label: <span>English</span>,
      onClick: () => setLanguage('zh'),
      disabled: language === 'en'
    }
  ]

  const handleMenuClick: MenuProps['onClick'] = event => {}

  const menuProps = {
    items,
    onClick: handleMenuClick
  }

  // const handleMenuClick = () => {}

  return (
    <>
      <Dropdown menu={menuProps} placement='bottom' trigger={['click']} arrow={true}>
        <i className='icon-style iconfont icon-zhongyingwen'></i>
      </Dropdown>
    </>
  )
}

export default LanguageChange
