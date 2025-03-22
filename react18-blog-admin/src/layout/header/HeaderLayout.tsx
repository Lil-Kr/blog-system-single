import { Layout } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import CollapsIcon from './components/CollapsIcon'
import LanguageChange from './components/LanguageChange'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import AvatarIcon from './components/AvatarIcon'
import { Flex } from 'antd/lib'

// css
import styles from './index.module.scss'

const { Header } = Layout

const HeaderLayout = () => {
  return (
    <Header className={styles.layoutHeader} style={{ padding: 0 }}>
      <div className='header-lf'>
        <CollapsIcon />
        <BreadcrumbNav />
      </div>
      <Flex className='header-ri' vertical={false}>
        <LanguageChange />
        <Theme />
        <Fullscreen />
        <AvatarIcon />
      </Flex>
    </Header>
  )
}

export default HeaderLayout
