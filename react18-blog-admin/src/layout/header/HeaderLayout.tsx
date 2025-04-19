import { Layout, Flex } from 'antd/lib'
const { Header } = Layout
import BreadcrumbNav from './components/BreadcrumbNav'
import CollapsIcon from './components/CollapsIcon'
import LanguageChange from './components/LanguageChange'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import AvatarIcon from './components/AvatarIcon'

// css
import './scss/index.scss'

const HeaderLayout = () => {
  return (
    <Header className={'layout-header'}>
      <Flex justify='space-between' align='center' className={'header-content'}>
        {/* 左侧布局 */}
        <Flex gap={10} align='center'>
          <CollapsIcon />
          <BreadcrumbNav />
        </Flex>

        {/* 右侧布局 */}
        <Flex gap={10} align='center'>
          <LanguageChange />
          {/* <Theme /> */}
          {/* <Fullscreen /> */}
          <AvatarIcon />
        </Flex>
      </Flex>
    </Header>
  )
}

export default HeaderLayout
