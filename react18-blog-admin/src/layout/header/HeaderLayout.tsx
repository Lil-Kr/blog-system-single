import { Layout, Flex } from 'antd'
import BreadcrumbNav from './components/BreadcrumbNav'
import CollapsIcon from './components/CollapsIcon'
import LanguageChange from './components/LanguageChange'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import AvatarIcon from './components/AvatarIcon'

// css
import styles from './index.module.scss'

const { Header } = Layout

const HeaderLayout = () => {
  return (
    <Header className={styles.layoutHeader}>
      <Flex justify='space-between' align='center' className={styles.headerContent}>
        <Flex className='header-lf' align='center'>
          <CollapsIcon />
          <BreadcrumbNav />
        </Flex>
        <Flex className='header-ri' align='center'>
          <LanguageChange />
          <Theme />
          <Fullscreen />
          <AvatarIcon />
        </Flex>
      </Flex>
    </Header>
  )
}

export default HeaderLayout
